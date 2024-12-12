import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useRef } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { CompatClient, Stomp, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import apiClient from "../../bearerToken";
import { getServerIpAddress, getTokenAuthor, getUserInfo } from '@/app/(tabs)/data';
import EndGameModal from "./EndGameModal";
import Toast from "react-native-toast-message";
import { captureRef } from 'react-native-view-shot';
import RNFS from "react-native-fs";
import Share from "react-native-share";

export interface PlayerInfo {
  name: String,
  image: string,
  point: number
}
const GamePlayScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [question, setQuestion] = useState<string>(""); // Câu hỏi hiện tại
  const [answers, setAnswers] = useState<string[]>([]); // Các đáp án
  const [score, setScore] = useState<number[]>([0, 0]);
  const [yourInfo, setYourInfo] = useState<PlayerInfo | null>(null);
  const [competitorInfo, setCompetitorInfo] = useState<PlayerInfo | null>(null);
  const [userId, setUserId] = useState<String>("");
  const [roomId, setRoomId] = useState<String>("");
  const [stomp, setStomp] = useState<CompatClient | null>(null);
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const viewRef = useRef<View>(null);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  let stompClient: CompatClient | null = null;
  let socket: any = null;

  const handleSocketMessage = (message: any) => {
    console.log(message.message)
    switch (message.message) {
      case "ROOM_MESSAGE":
        Toast.show({
          type: 'info', // success | error | info
          text1: message.data,
          position: 'bottom', // Hoặc top, center
          visibilityTime: 1000,
        });
        break;
      case "PLAYER_INFO":
        const info = message.data;
        setYourInfo(info["YOU"])
        if (info["COMPETITOR"]) {
          setCompetitorInfo(info["COMPETITOR"])
        }
        break;
      case "WORDS_OF_GAME":
        const words = message.data
        setAnswers(words.slice(0, 8))
        setQuestion(words[words.length - 1])
        break;
      case "END":
        const d = message.data
        setScore([d["YOU"], d["COMPETITOR"]])
        setShowEndGameModal(true);
        break;
      case "QUIT":
        Toast.show({
          type: 'success', // success | error | info
          text1: message.data,
          position: 'bottom', // Hoặc top, center
          visibilityTime: 1500
        });
        setTimeout(() => { navigation.navigate("homegames"); }, 1500)
        break;
      case "COUNTER":
        const s = message.data
        setScore([s["YOU"], s["COMPETITOR"]])
        break;
    }
  }
  const decodeJWT = (token: string) => {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return decodedPayload;
  };
  const fetchGames = async () => {
    try {
      console.warn = () => { }
      const apiInstance = await apiClient();
      const uid = decodeJWT(getTokenAuthor())["uid"];
      setUserId(uid);
      const response = await apiInstance.get("/game/join");
      const room = (response.data.roomId);
      setRoomId(room);
      const SOCKET_URL = `http://${getServerIpAddress()}:8080/chat`
      if (socket == null && stomp == null && stompClient == null) {
        socket = new SockJS(SOCKET_URL);
        stompClient = Stomp.over(socket);
        stompClient.debug = () => { };
        if (!socket.OPEN) {
          stompClient.connect(
            { "token": getTokenAuthor() },
            function (frame: any) {
              setTimeout(function () {
                setStomp(stompClient);
                stompClient!.subscribe(
                  `/topic/game/${room}`,
                  (messageOutput: any) => {
                    handleSocketMessage(decodeBinaryBody(messageOutput["_binaryBody"]))
                  },
                );
                stompClient!.subscribe(
                  `/topic/game/${room}/${uid}`,
                  (messageOutput: any) => {
                    handleSocketMessage(decodeBinaryBody(messageOutput["_binaryBody"]))
                  },
                );
              }, 500);
            }
          );
        }
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
  useEffect(() => {
    fetchGames();
  }, []);

  const handleAnswerPress = async (selectedAnswer: string) => {
    const apiInstance = await apiClient();
    const res = await apiInstance.get(`game/submit?roomId=${roomId}&vie=${selectedAnswer}&en=${question}`)
  };
  const decodeBinaryBody = (binaryBody: number[]): string => {
    const textDecoder = new TextDecoder();
    return JSON.parse(textDecoder.decode(new Uint8Array(binaryBody)));
  };
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  return (
    <View style={styles.container} ref={viewRef}>
      {showHeader && (
        <View style={styles.header}>
          <Ionicons
            name="arrow-back-outline"
            size={40}
            color="#FFFFFF"
            style={{ zIndex: 10, paddingLeft: 10 }}
            onPress={() => navigation.navigate("homegames")}
          />
          <Text style={styles.headerTitle}>PVP</Text>
        </View>
      )}
      {/* Thông tin người chơi */}
      <View style={styles.playerInfo}>
        <View style={styles.avatar} >
          {/* <Image source={competitorInfo?.image ? {uri: competitorInfo?.image} : require('../../../../assets/images/png/rewardBear.png')} /> */}
        </View>
        <View>
          <Text style={styles.playerName}>{competitorInfo && competitorInfo.name ? competitorInfo.name : '????'}</Text>
          <Text style={styles.playerStats}>🏆 {competitorInfo && competitorInfo.point ? competitorInfo.point : '????'}</Text>
          <Text style={styles.playerStats}>✔️ {score[1]}</Text>
        </View>
      </View>

      {/* Câu hỏi */}
      <Text style={styles.question}>{question ? question.toUpperCase() : ""}</Text>

      {/* Các đáp án */}
      <View style={styles.answersGrid}>
        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answerButton}
            onPress={() => handleAnswerPress(answer)}
          >
            <Text style={styles.answerText}>{answer.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Thông tin người chơi cuối màn hình */}
      <View style={styles.footer}>
        <View style={styles.playerInfo}>
          <View style={styles.avatar} >
            {/* <Image source={yourInfo?.image ? {uri: yourInfo?.image} : require('../../../../assets/images/png/rewardBear.png')} /> */}
          </View>
          <View>
            <Text style={styles.playerName}>{yourInfo && yourInfo.name ? yourInfo.name : 'None'}</Text>
            <Text style={styles.playerStats}>🏆 {yourInfo && yourInfo.point ? yourInfo.point : 'None'}</Text>
            <Text style={styles.playerStats}>✔️ {score[0]}</Text>
          </View>
        </View>
      </View>
      <EndGameModal
        visible={showEndGameModal}
        score={score}
        onQuit={() => navigation.navigate("homegames")}
        img1={yourInfo?.image}
        img2={competitorInfo?.image}
      />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    // padding: 10,
  },
  header: {
    height: 65,
    backgroundColor: "#41669C",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // borderWidth: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    // borderWidth: 1,
    marginEnd: 50,
    textAlign: "center",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B3E5FC",
    padding: 10,
    // marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playerStats: {
    fontSize: 14,
    color: "#4CAF50",
  },
  question: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 17,
  },
  answersGrid: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // borderWidth: 1
  },
  answerButton: {
    width: "40%",
    backgroundColor: "#fff",
    paddingVertical: 35,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    // borderWidth:1
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    // backgroundColor: "#B3E5FC",
    // padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default GamePlayScreen
