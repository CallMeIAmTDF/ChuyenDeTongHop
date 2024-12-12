import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getImageByName } from "../../(tabs)/css/imagesMapping";
interface IHistoryRewards {
    id: number;
    name: string;
    num: number;
    price: number;
    address: string;
    date: string;
}

const HistoryRewardLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        // Ẩn tabBar khi vào trang HistoryExamScreen
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        // Hiện lại tabBar khi rời khỏi trang
        return () => navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    }, [navigation]);

    const [historyRewards, setHistoryRewards] = useState<IHistoryRewards[]>([
        { id: 1, name: "Gấu bông", num: 1, price: 1, address: "Ha noi", date: "11/01/2003", },
        { id: 3, name: "Bút thiên long", num: 1, price: 1, address: "Ha noi", date: "11/01/2003" },
        { id: 4, name: "Vở thiên long", num: 1, price: 1, address: "Ha noi", date: "11/01/2003" },
        { id: 5, name: "Hộp quà", num: 1, price: 1, address: "Ha noi", date: "11/01/2003" },
        { id: 6, name: "Gấu bông", num: 1, price: 1, address: "Ha noi", date: "11/01/2003" },
        { id: 7, name: "Gấu bông", num: 1, price: 1, address: "Ha noi", date: "11/01/2003" },
    ]);

    return (
        <View style={styles.container}>
            {/* Header  */}
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={40}
                    color="black"
                    style={{ zIndex: 10, position: "absolute", paddingLeft: 10, }}
                    onPress={() => navigation.navigate("userInfo")}
                />
                <Text style={styles.text_header}>Lịch sử đổi thưởng</Text>
            </View>

            {/* body */}
            <View style={styles.container}>
                <FlatList
                    data={historyRewards}
                    keyExtractor={(item) => item.id + ""}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listHisReward}>
                                <Image style={styles.imageReward}
                                    source={getImageByName(item.name)} />
                                <View style={styles.infoReward}>
                                    <Text style={styles.nameReward}>{item.name}</Text>
                                    <View >
                                        <View style={{ flexDirection: "row", gap: 40 }}>
                                            <Text style={styles.textReward}>Số lượng: {item.num}</Text>
                                            <Text style={styles.textReward}>Giá : {item.price} dats</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.textReward}>Địa chỉ: {item.address}</Text>
                                            <Text style={styles.textReward}>Ngày : {item.date}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        backgroundColor: "white",
        paddingBottom: 25,
    },
    text_header: {
        fontSize: 25,
        color: "#4C4A54",
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 20,
    },
    listHisReward: {
        // borderWidth: 1,
        flexDirection: "row",
        margin: 15,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#A3EFA5",
        elevation: 5
    },
    imageReward: {
        height: 120,
        width: 120,
        borderRadius: 10,
        marginStart: 10
    },
    nameReward: {
        fontSize: 25,
        fontWeight: "700",
        color: "#4C4A54",
        marginVertical: 5,
        // borderWidth: 1,
    },
    infoReward: {
        marginStart: 40,
    },
    textReward: {
        // borderWidth: 1,
        fontSize: 16,
        fontWeight: "500",
        color: "#4C4A54",
        paddingBottom: 10
    }

});

export default HistoryRewardLayout;