import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import vsgameImg from "../../../../assets/images/png/game/game.png";
import guideIcon from "../../../../assets/images/png/game/guide.png";
import rankIcon from "../../../../assets/images/png/game/rank.png";
import startIcon from "../../../../assets/images/png/game/pvp.png";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import GuideScreen from "./guide";
import { gameHomeStyles } from "../../css/gameHomeStyles";

const GameScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  // Hàm đóng modal
  const closeModal = () => setModalVisible(false);
  return (
    <View style={gameHomeStyles.container}>
      {/* // headerp */}
      <View style={gameHomeStyles.header}>
        <Text style={gameHomeStyles.text_header}>Trò chơi</Text>
      </View>

      {/* // body  */}
      <View style={gameHomeStyles.vsSection}>
        <Image source={vsgameImg} style={gameHomeStyles.vsgame} />
      </View>

      {/* Buttons */}
      <View style={gameHomeStyles.buttonsContainer}>
        {/* Hướng dẫn  */}
        <TouchableOpacity
          style={gameHomeStyles.buttonGuide}
        onPress={() => setModalVisible(true)}
        >
          <Image source={guideIcon} style={gameHomeStyles.icon} />
          <Text style={[gameHomeStyles.buttonText, { color: "black" }]}>Hướng dẫn</Text>
        </TouchableOpacity>

        {/* Bảng xếp hạng  */}
        <TouchableOpacity
          style={gameHomeStyles.buttonRanking}
          onPress={() => navigation.navigate("ranks")}
        >
          <Image source={rankIcon} style={gameHomeStyles.icon} />
          <Text style={[gameHomeStyles.buttonText, { color: "#FFFFFF" }]}>
            Bảng xếp hạng
          </Text>
        </TouchableOpacity>

        {/* Bắt đầu trò chơi  */}
        <TouchableOpacity style={gameHomeStyles.buttonStart}
        onPress={() => navigation.navigate("gameplay")}
        >
          <Image source={startIcon} style={gameHomeStyles.icon} />
          <Text style={[gameHomeStyles.buttonText, { color: "#FFFFFF" }]}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
      {/* Hiển thị GuideScreen khi modalVisible là true */}
      {modalVisible && (
        <GuideScreen visible={modalVisible} onClose={closeModal} />
      )}
    </View>
  );
};

export default GameScreen;
