import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { styleForgetPassword } from "../css/cssForgetPassword";
import InputBox from "@/components/other/inputBox";
import { useState } from "react";
import ButtonBox from "@/components/other/buttonBox";
import ForgetPassFirst from "@/components/forgetPassword/forgetPassFisrt";
import ForgetPassThird from "@/components/forgetPassword/forgetPassThird";
import ForgetPassSecond from "@/components/forgetPassword/forgetPassSecond";
import { NavigationProp, useNavigation } from "@react-navigation/native";
const ForgetPassword = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [email, setEmail] = useState("");
    // const back = () => {
    //     if(status == 1) navigation.goBack();
    //     if(status == 2){setStatusIndex(1)};
    //     if(status == 3) {setStatusIndex(2)};
    // }

    // const [pass, setPass] = useState("");

    // const [status, setStatusIndex] = useState(1);
    // const statusTo2 = () => {
    //      setStatusIndex(2);
    // }
    // const statusTo3 = () => {
    //     setStatusIndex(3);
    // }
    // const statusTo1 = () => {
    //     setStatusIndex(1);
    // }
    return(
        <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
            <View>
                <TouchableOpacity style={styleForgetPassword.arrowLeft} onPress={()=>navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="#4C4A54" />
                </TouchableOpacity>
                <ForgetPassFirst funVoid={()=>navigation.goBack()} data={email} getData={setEmail} />
                {/* {status == 2 && (<ForgetPassSecond funVoid={statusTo3}/>)}
                {status == 3 && (<ForgetPassThird funVoid={statusTo1} data={pass} getData={setPass}/>)} */}
            </View>
        </TouchableWithoutFeedback>
    )
}
export default ForgetPassword;