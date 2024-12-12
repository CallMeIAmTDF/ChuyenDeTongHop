import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { FlatList, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getImageByName } from "../../(tabs)/css/imagesMapping";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface IRewards {
    id: number;
    name: string;
    price: number;
}

const HomeRewardScreen = () => {
    const [searchText, setSearchText] = useState('');
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [hasResults, setHasResults] = useState(true);
    const handleSearch = (text: string) => {
        setSearchText(text);
        // Lọc phần thưởng dựa trên searchText
        const filteredRewards = rewards.filter(reward =>
            reward.name.toLowerCase().includes(text.toLowerCase())
        );
        // Cập nhật trạng thái hasResults
        setHasResults(filteredRewards.length > 0);
    };
    const goToInfoRewardScreen = (name: string, image: string, price: number) => {
        navigation.navigate("inforewards", { name, image, price });
    };
    const [rewards, setRewards] = useState<IRewards[]>([
        { id: 1, name: "Bút thiên long", price: 1000 },
        { id: 2, name: "Vở thiên long", price: 20 },
        { id: 3, name: "Gấu bông", price: 80 },
        { id: 4, name: "Hộp quà", price: 100 },
    ]);

    const filteredRewards = rewards.filter(reward =>
        reward.name.toLowerCase().includes(searchText.toLowerCase())
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Đổi thưởng</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.body}>
                    <View style={styles.searchContainer}>

                        <FontAwesome name="search" size={24} color="#4C4A54" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Nhập tên sản phẩm muốn tìm"
                            value={searchText}
                            onChangeText={handleSearch}
                            onFocus={() => setSearchText('')}
                        />
                    </View>
                    {!hasResults ? ( // Kiểm tra nếu không có phần thưởng nào
                        <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
                    ) : (
                        <FlatList
                            data={filteredRewards}
                            numColumns={2}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => goToInfoRewardScreen(item.name, item.name, item.price)}>
                                        <View style={styles.itemReward}>
                                            <Image style={styles.imageRewards} source={getImageByName(item.name)} />
                                            <Text style={styles.nameRewards}>{item.name}</Text>
                                            <Text style={styles.priceReward}>{item.price} dats</Text>
                                        </View>
                                    </TouchableOpacity>

                                );
                            }}
                            columnWrapperStyle={styles.columnWrapper}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 65,
        backgroundColor: '#459DE4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
    },
    body: {
        flex: 1,
        paddingHorizontal: 10,
        // paddingTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 45,
        marginHorizontal: 25,
        gap: 15
        // marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    // listReward :{
    //     borderWidth:1,
    // },
    itemReward: {
        flex: 1,
        backgroundColor: "#AEDEF4",
        padding: 20,
        marginHorizontal: 25,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageRewards: {
        height: 100,
        width: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    nameRewards: {
        fontSize: 16,
        fontWeight: '500',
        color: "#4C4A54",
    },
    priceReward: {
        fontSize: 16,
        fontWeight: '500',
        color: "#459DE4"
    },
    noResultsText: {
        fontSize: 18,
        fontWeight: '500',
        color: "#888888",
        textAlign: 'center',
        marginTop: 20,
    }
});

export default HomeRewardScreen;
