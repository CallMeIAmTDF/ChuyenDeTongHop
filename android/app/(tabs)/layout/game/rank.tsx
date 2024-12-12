import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import { rankStyles } from "../../css/rankStyles";
import { captureRef } from 'react-native-view-shot';
import RNFS from "react-native-fs";
import Share from "react-native-share";
import apiClient from "../../bearerToken";

export interface User {
  name: string,
  image: string,
  point: string
}

export interface UserWithId extends User {
  id: number
}

const RankSceen = () => {
  const viewRef = useRef<View>(null);
  console.warn = () => { }
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [learderboard, setLeaderboard] = useState<UserWithId[]>([]);
  const [yourInfo, setYourInfo] = useState<User>();
  const [showView, setShowView] = useState<Boolean>(true);
  const fetchUser = async () => {
    const apiInstance = await apiClient();
    const response = await apiInstance.get("/game/leaderboard");
    const users: User[] = response.data;
    console.log({ "users": users })
    setYourInfo(users.pop());
    setLeaderboard(users.map((user, index) => ({
      id: index + 1,
      ...user
    })));
  }
  useEffect(() => {
    fetchUser();
  }, [])
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  const handleShare = async () => {
    setShowView(false);
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      const tempPath = `${RNFS.CachesDirectoryPath}/RANK.jpg`;
      await RNFS.copyFile(uri, tempPath);
      setShowView(true);
      await Share.open({
        url: `file://${tempPath}`,
        message: "Truy cập DATLearn để học ngay với mình!!!",
      });
    } catch (error) {
    } finally {
      setShowView(true);
    }
  }

  const getSubArray = (users: UserWithId[]) => {
    const order = [1, 0, 2];
    const limit = Math.min(users.length, order.length);
    const res = Array.from({ length: limit }, (_, i) => users[order[i]]);
    return res;
  }
  return (
    <View style={rankStyles.container} ref={viewRef}>
      {showView && (
        <View style={rankStyles.header}>
          <Ionicons
            name="arrow-back-outline"
            size={40}
            color="#FFFFFF"
            style={{ zIndex: 10, paddingLeft: 10 }}
            onPress={() => navigation.navigate("homegames")}
          />
          <Text style={rankStyles.headerTitle}>Bảng xếp hạng</Text>
          <Ionicons
            name="share-outline"
            size={40}
            color="#FFFFFF"
            style={{ zIndex: 10, paddingLeft: 10 }}
            onPress={() => { handleShare() }}
          />
        </View>
      )}
      <View style={rankStyles.topContainer}>
        <View style={rankStyles.mainCardContainer}>
          {getSubArray(learderboard).map((item, index) => {
            return (
              <View
                key={index}
                style={[rankStyles.mainCard, item.id !== 1 && { marginTop: 20 }]}
              >
                <Image
                  source={item?.image ? { uri: item?.image } : require('../../../../assets/images/png/rewardBear.png')}
                  style={rankStyles.mainCardImage}
                  resizeMode="cover"
                />
                <Text style={rankStyles.mainCardTitle}>{item.name}</Text>
                {/* <View style={style.mainCardRankContainer}> */}
                {/* <Text style={style.mainCardRankContainerText}>{item}</Text> */}
                {/* Thay đổi thành ảnh tương ứng */}
                {item.id === 1 ? (
                  <Image
                    source={require("../../../../assets/images/png/game/vang.png")} // Thay bằng ảnh huy chương vàng
                    style={rankStyles.mainCardRankContainer}
                  />
                ) : item.id === 2 ? (
                  <Image
                    source={require("../../../../assets/images/png/game/bac.png")} // Thay bằng ảnh huy chương bạc
                    style={rankStyles.mainCardRankContainer}
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/images/png/game/dong.png")} // Thay bằng ảnh huy chương đồng
                    style={rankStyles.mainCardRankContainer}
                  />
                )}
              </View>
              // </View>
            );
          })}
        </View>
      </View>

      <FlatList
        data={learderboard}
        renderItem={({ item, index }) => {
          return (
            <View style={rankStyles.card}>
              <View style={rankStyles.cardDataContainer}>
                <Text style={rankStyles.cardIndex}>{index + 1}</Text>
                <Image
                  source={item?.image ? { uri: item?.image } : require('../../../../assets/images/png/rewardBear.png')}
                  style={rankStyles.cardImage}
                  resizeMode="cover"
                />
                <Text style={rankStyles.cardTitle}>{item.name}</Text>
              </View>
              <View style={rankStyles.cardRankContainer}>
                <Text style={rankStyles.cardRankTitle}>{item.point}</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={rankStyles.cardbyme}>
        <View style={rankStyles.cardDataContainer}>
          <Image
            source={yourInfo?.image ? { uri: yourInfo?.image } : require('../../../../assets/images/png/rewardBear.png')}
            style={rankStyles.cardImage}
            resizeMode="cover"
          />
          <Text style={rankStyles.cardTitleByMe}>{yourInfo?.name} (YOU)</Text>
        </View>
        <View style={rankStyles.cardRankContainer}>
          <Text style={rankStyles.cardRankTitle}>{yourInfo?.point}</Text>
        </View>
      </View>
    </View>
  );
};

export default RankSceen;
