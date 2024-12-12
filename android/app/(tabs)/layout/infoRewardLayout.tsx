import { Button, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import whileBack from "../../../assets/images/png/while_back.png"
import { useEffect, useState } from "react";
import { getImageByName } from "../css/imagesMapping";

const InfoRewardScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route: RouteProp<RootStackParamList, 'inforewards'> = useRoute();
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(route.params?.price);
    useEffect(() => {
        // Ẩn tabBar khi vào trang HistoryExamScreen
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        // Hiện lại tabBar khi rời khỏi trang
        return () => navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    }, [navigation]);

    useEffect(() => {
        if (route.params?.price) {
            setPrice(route.params.price * quantity);
        }
    }, [quantity, route.params?.price]);


    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };
    const handleDecrease = () => {
        setQuantity(quantity > 1 ? quantity - 1 : 1);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ backgroundColor: "white", flex: 1 }}>
                {/* header  */}
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity style={styles.imgBack}
                            onPress={() => navigation.navigate("homerewards")} >
                            <Image style={{ height: 30, width: 30 }}
                                source={whileBack}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.text_header}>Thông tin đổi thưởng</Text>
                    </View>

                </View>

                {/* body */}

                {/* rewards information */}
                <View style={styles.rewardContainer}>
                    <View style={styles.imageRewards}>
                        <Image style={{
                            height: 80,
                            width: 100,
                        }} source={getImageByName(route.params?.image)} />
                    </View>
                    <View style={styles.rewardInfoContainer}>
                        <Text style={styles.rewardTitle}>{route.params?.name}</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.rewardPrice}>{price} dats</Text>
                    </View>
                </View>

                {/* recipient information */}
                <View>
                    <Text style={styles.textInfo}>Thông tin người nhận</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Địa chỉ</Text>
                        <TextInput
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate("homerewards")}>
                        <Text style={styles.buttonText}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 65,
        backgroundColor: "#459DE4",
        flexDirection: "row",
        alignItems: "center",
    },
    imgBack: {
        padding: 10,
    },
    text_header: {
        fontSize: 25,
        marginTop: 5,
        marginEnd: 40,
        color: "white",
        fontWeight: "500",
        textAlign: "center",
    },
    rewardContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        // justifyContent: "center",
        height: 150,
        marginTop: 60,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#B3B3B3",
        borderRadius: 10,
        elevation: 10,

    },
    imageRewards: {
        // borderWidth: 1,
        // borderColor: "red",
        backgroundColor: "white",
        marginHorizontal: 30,
        marginVertical: 30,
        borderRadius: 5,
        elevation: 0
    },

    rewardInfoContainer: {
        flex: 1,
        // borderWidth: 1,
        alignItems: "center",
        paddingVertical: 10
        // paddingStart: 40
    },

    rewardTitle: {
        fontSize: 25,
        fontWeight: "500",
        color: "#4C4A54",
        // borderWidth: 1,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        // borderWidth: 1
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: "#ececec",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        // borderWidth: 1,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 18,
        // borderWidth: 1
    },
    rewardPrice: {
        fontSize: 20,
        // borderWidth: 1
        // marginEnd: 0,
        // color: "#888",
        // paddingVertical?
    },
    textInfo: {
        // borderWidth: 1,
        fontSize: 20,
        fontWeight: "500",
        marginHorizontal: 20,
        marginTop: 20,

    },
    inputContainer: {
        // marginBottom: 15,  
        marginHorizontal: 20,
        marginVertical: 15,
        // borderWidth: 1
    },
    inputLabel: {
        // backgroundColor: "#fff",
        paddingHorizontal: 5,
        fontSize: 18,
        fontWeight: "500",
        color: "#888888",
    },
    input: {
        height: 50,
        borderColor: "#6F6F6F",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#565CCE",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
        marginHorizontal: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default InfoRewardScreen;