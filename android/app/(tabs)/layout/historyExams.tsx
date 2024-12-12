import HeaderApp from "@/components/other/header";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Circle } from "react-native-svg";
import { hisExamsStyles } from "../css/hisExamsStyles";

type HistoryExamsRouteProp = RouteProp<RootStackParamList, "historyExams">;

const HistoryExamLayout = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<HistoryExamsRouteProp>(); // Truy cập tham số từ route
  
  const historyData = route.params?.historyData ?? [];
  // const totalQuestions = 20;
  const radius = 20; // bán kính của vòng tròn
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;

  
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    // Trả về dạng "DD/MM/YYYY HH:mm"
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  const calculatePercentage = (correctAnswers: number, numQuestion: number) => {
    return Math.round((correctAnswers / numQuestion) * 100);
  };

  const calculateStrokeDashoffset = (percentage: number) => {
    return circumference - (percentage / 100) * circumference;
  };

//   const [historyexams, setHistoryexams] = useState<IHistoryExam[]>([
//     { id: 1, date: "20/01/2024", answers: 20 },
//     { id: 2, date: "20/01/2024", answers: 16 },
//     { id: 3, date: "20/01/2024", answers: 15 },
//     { id: 4, date: "20/01/2024", answers: 3 },
//     { id: 5, date: "20/01/2024", answers: 10 },
//     { id: 6, date: "20/01/2024", answers: 20 },
//     { id: 7, date: "20/01/2024", answers: 16 },
//     { id: 8, date: "20/01/2024", answers: 15 },
//     { id: 9, date: "20/01/2024", answers: 3 },
//     { id: 10, date: "20/01/2024", answers: 10 },
//   ]);

  return (
    <View style={hisExamsStyles.container}>
      <View style={hisExamsStyles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={40}
          color="black"
          style={{ zIndex: 10, position: "absolute", paddingLeft: 10 }}
          onPress={() => navigation.navigate("userInfo")}
        />
        <Text style={hisExamsStyles.text_header}>Lịch sử kiểm tra</Text>
      </View>
      <View style={hisExamsStyles.container}>
        <FlatList
          data={[...historyData].reverse()}
          // inverted
          keyExtractor={(item) => item.thid.toString()}
          renderItem={({ item }) => {
            const percentage = calculatePercentage(item.numcorrectques, item.numques);
            const strokeDashoffset = calculateStrokeDashoffset(percentage);

            return (
              <View style={hisExamsStyles.itemHistory}>
                <View style={hisExamsStyles.circleOverlay}>
                  <Svg width={50} height={50}>
                    <Circle
                      cx="25"
                      cy="25"
                      r={radius}
                      stroke="#9e9e9e"
                      strokeWidth={strokeWidth}
                      fill="none"
                    />
                    <Circle
                      cx="25"
                      cy="25"
                      r={radius}
                      stroke="#228B22"
                      strokeWidth={strokeWidth}
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      transform={`rotate(-90 25 25)`}
                    />
                  </Svg>
                  <Text style={hisExamsStyles.percentageText}>
                    {percentage}%
                  </Text>
                </View>
                <View>
                  <Text style={hisExamsStyles.infoHistory}>
                    Thời gian: {formatDate(item.tdate)}
                  </Text>
                  <Text style={hisExamsStyles.infoHistory}>
                    Số câu trả lời đúng : {item.numcorrectques}/{item.numques}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default HistoryExamLayout;
