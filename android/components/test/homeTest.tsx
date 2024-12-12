import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import HeaderApp from "../other/header"
import { Button, Image, Modal, Text, TouchableOpacity, View } from "react-native"
import { useState } from "react"
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonBox from "../other/buttonBox";
import { ApiTests, getTests, Questions, setTests } from "@/app/(tabs)/data";
import apiClient from "@/app/(tabs)/bearerToken";

interface StatusProps {
    funvoid: () => void
}
const HomeTest: React.FC<StatusProps> = ({funvoid}) => {
    const [iVisible,setIVisible] = useState(false)
    const [mess,setMess] = useState<string>()
    const handleExams = async ()=>{
        const apiInstance = await apiClient(); 
        const dataTest = await apiInstance<ApiTests>("/words/getTest");
        if(dataTest.data.data){
            setTests(dataTest.data.data)
            funvoid();
        }
        else{
            setMess(dataTest.data.message);
            setIVisible(true);
        }
    }
    return(
        <View style={[styleGlobal.mainLayout,{borderBlockColor:"red"}]} >
            <HeaderApp isHome={true} title="Kiểm tra" funVoid={() => null}/>
            <Image style={styleGlobal.imageHomeTest} source={require("@/assets/images/png/study.png")} />
            <Text style={styleGlobal.titleTest}>Quizzy App</Text>
            <TouchableOpacity style={styleGlobal.butHomeTest} onPress={handleExams}>
                <Text style={styleGlobal.textButHomeTest}>Bắt đầu</Text>
            </TouchableOpacity>
            <Modal
                visible={iVisible}
                animationType="slide"
                transparent={true}>
                    <View style={[styleGlobal.mainLayout,{justifyContent:"center"}]}>
                        <View style={styleGlobal.comfirmEmailSignin}>
                        <Ionicons name="warning" size={100} color="red" />
                        <Text>{mess}</Text>
                        <ButtonBox name="Xác nhận" background='cyan' colorText='white' funVoid={()=>setIVisible(false)} border={0} wid={100} />
                        </View>
                    </View>
            </Modal>
        </View>
    )
}
export default HomeTest