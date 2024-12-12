import { Image, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import headerInfo from "../../../assets/images/png/headerInfo.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import userInforIcon2 from "../../../assets/images/png/imageInfo2.png";
import userInforIcon1 from "../../../assets/images/png/imageInfo1.png";
import userInforIcon3 from "../../../assets/images/png/imageInfo3.png";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { ApiHistoryexams, ApiUser, getLogout, getOut, Historyexams, User } from "../data";
import { userInfoStyles } from "../css/userInfoStyles";
import React, { useEffect, useState } from "react";
import initializeApiClient from "../bearerToken";
import ChatScreen from '@/components/other/chat';

const UserInfoScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [userInfo, setUserInfo] = useState<User>();
  const [point, setPoint] = useState<number>(0);
  const [progressHistory, setProgressHistory] = useState<number>(0);
  const [progressAll, setProgressAll] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const fetchHistory = async () => {
    try {
      const apiInstance = await initializeApiClient();
      const response = await apiInstance.get<ApiHistoryexams>("/words/getTestHistory");
      console.log(response.data.data)
      if (response.data.data) {
        navigation.navigate("historyExams", { historyData: response.data.data })
      } else {
        console.log("Không có lịch sử kiểm tra.");
      }
    } catch (error) {
      console.error("API error:", error);
      console.log("Đã xảy ra lỗi khi tải dữ liệu.");
    }
  };
  const fetchInfo = async () => {
    try {
      const apiInstance = await initializeApiClient();
      const response = await apiInstance.get<ApiUser>("/users/my-info");
      console.log(response.data)
      if (response.data.data) {
        setUserInfo(response.data.data)
      } else {
        console.log("Không có dữ liệu.");
      }
    } catch (error) {
      console.error("API error:", error);
      console.log("Đã xảy ra lỗi khi tải dữ liệu.");
    }
  };
  interface ApiOtherInfo {
    message: string,
    code: string,
    data: {
      points: number,
      progress_history: number,
      progress_all: number
    }
  }
  const fetchOtherInfo = async () => {
    try {
      const apiInstance = await initializeApiClient();
      const response = await apiInstance.get<ApiOtherInfo>("/users/my-info/other-data");
      console.log(response.data)
      if (response.data.data) {
        const data = response.data.data
        setPoint(data.points);
        setProgressHistory(data.progress_history);
        setProgressAll(data.progress_all);
      } else {
        console.log("Không có dữ liệu.");
      }
    } catch (error) {
      console.error("API error:", error);
      console.log("Đã xảy ra lỗi khi tải dữ liệu.");
    }
  };
  useEffect(() => {
    fetchInfo();
    fetchOtherInfo();
  }, [])

  if (!userInfo) {
    return (<></>)
  }
  return (
    <View style={userInfoStyles.container}>
      {/* Header */}
      <View style={userInfoStyles.headerContainer}>
        <Image style={userInfoStyles.headerImage} source={headerInfo} />
        <View style={userInfoStyles.circleOverlay}>
          <Image
            style={{
              height: 35,
              width: 30,
              marginTop: 25,
            }}
            source={userInfo.image ? userInfo.image : userInforIcon1}
          />
        </View>
        <View style={userInfoStyles.textContainer}>
          <Text style={userInfoStyles.userName}>{userInfo.name}</Text>
          <Text style={userInfoStyles.userEmail}>{userInfo.email}</Text>
        </View>
        <View style={userInfoStyles.rectangleContainer}>
          <View style={userInfoStyles.rectangle}>
            <View>
              <Image
                style={userInfoStyles.userInforIcon1}
                source={userInforIcon2}
              />
            </View>
            <View>
              <Text style={{ color: "#545454" }}>Progress</Text>
              <Text>{progressHistory}/{progressAll}</Text>
            </View>
          </View>
          <View style={userInfoStyles.rectangle}>
            <View>
              <Image
                style={userInfoStyles.userInforIcon1}
                source={userInforIcon3}
              />
            </View>
            <View>
              <Text style={{ color: "#545454" }}>Point</Text>
              <Text>{point}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Body */}
      <View style={userInfoStyles.bodyInfo}>
        <TouchableOpacity
          style={userInfoStyles.itemBody}
          onPress={fetchHistory}
        >
          <FontAwesome6 name="list-check" size={24} color="black" />
          <Text style={userInfoStyles.itemText}>Lịch sử kiểm tra</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={userInfoStyles.itemBody}
          onPress={() => setIsVisible(true)}
        >
          <MaterialIcons name="report-problem" size={30} color="black" />
          <Text style={userInfoStyles.itemText}>Phản hồi Quản Trị Viên</Text>
          <Modal
            visible={isVisible}
            animationType="slide"
            onRequestClose={() => setIsVisible(false)}
            transparent={true}>
            <ChatScreen onBack={() => {
              setIsVisible(false);
            }} />
          </Modal>
        </TouchableOpacity>

        <TouchableOpacity
          style={userInfoStyles.itemBody}
          onPress={() => {
            getOut();
            getLogout();
          }}
        >
          <MaterialCommunityIcons name="logout" size={24} color="red" />
          <Text style={userInfoStyles.itemText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfoScreen;
