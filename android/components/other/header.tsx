import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Button, Modal, Text, TouchableOpacity, View, BackHandler } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fontisto } from "@expo/vector-icons";
import ButtonBox from "./buttonBox";
import { useEffect, useState } from "react";
import ChatScreen from "./chat";
import { setCloseChat } from "@/app/(tabs)/data";
interface StatusProps {
    isHome: boolean;
    title: string;
    funVoid: () => void;
}
const HeaderApp: React.FC<StatusProps> = ({ isHome, title, funVoid }) => {
    const [iVisible, setIVisible] = useState(false);
    useEffect(() => {
        setCloseChat(() => setIVisible(false));
    }, [])

    return (
        <View style={styleGlobal.header}>
            <Text style={styleGlobal.textHeader}>{title}</Text>
            {!isHome ? (<TouchableOpacity onPress={funVoid} style={styleGlobal.backHeader}>
                <AntDesign name="arrowleft" size={30} color="white" />
            </TouchableOpacity>) : null}
            <TouchableOpacity style={styleGlobal.chatHeader} onPress={() => setIVisible(true)}>
                <Ionicons name="chatbubble-ellipses-outline" size={40} color="white" />
            </TouchableOpacity>
            <Modal
                visible={iVisible}
                animationType="slide"
                onRequestClose={() => setIVisible(false)}
                transparent={true}>
                <ChatScreen onBack={() => {
                    setIVisible(false);
                }} />
            </Modal>
        </View>
    )
}

export default HeaderApp;