import { styleForgetPassword } from "@/app/(tabs)/css/cssForgetPassword";
import { useState } from "react";
import { Alert, Image, Keyboard, Modal, Text, View } from "react-native";
import InputBox from "../other/inputBox";
import ButtonBox from "../other/buttonBox";
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Fontisto } from "@expo/vector-icons";
import { ApiForget, getServerIpAddress } from "@/app/(tabs)/data";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface StatusProps {
    funVoid: () => void;
    getData: (value: string) => void;
    data: string;
}
const ForgetPassFirst: React.FC<StatusProps> = ({funVoid , data, getData}) => {
    //lay error mess cua nguoi dung
    const [errorMess, setErrorMess] = useState<string>("");
    const [eEmail, setEEmail] = useState<boolean>(false);
    const [iVisible,setIVisible] = useState(false);
    const [code,setCode] = useState<number>();
    const [mess,setMess] = useState<string>();
    //kiem tra dinh dang mail
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //day du lieu vao trong component de lay du lieu ra ngoai
    const [email, setEmail] = useState(data)
    const handleChangeText = (value: string) => {
        setEmail(value);
        getData(value);
    }

    //kiem tra dinh dang Email 
    // const handleSecond = () => {
    //     if(validateEmail(data)) {postForget(); setEEmail(false)}
    //     else {setErrorMess("hay nhap dung dinh dang Email"); setEEmail(true)};
    // }
    const postForget =async ()=>{
        try {
            Keyboard.dismiss();
            const ipAddress = getServerIpAddress();
            const response = await fetch(`http://${ipAddress}:8080/users/forgotPassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });
            const result: ApiForget = await response.json();
            setCode(result.code);
            setMess(result.message);
            if(result.code==200) {setIVisible(true); setEEmail(false);}
            else{
                setEEmail(true);
                setErrorMess(result.message);
            };
        } catch (error) {
            console.error("Error:", error); // Ghi lại lỗi (nếu có)
        }
    }

    const submit = ()=>{
        if(code==200){
            funVoid();
        }
        setIVisible(false)
    }
    return(
        <View style={styleForgetPassword.forgetPassword}> 
                    <Image style={styleForgetPassword.imgForgetPassword} source={require("@/assets/images/png/forgetPassword.png")}/>
                    <Text style={styleForgetPassword.title}>FORGET</Text>
                    <Text style={styleForgetPassword.title}>PASSWORD</Text>
                    <View style={styleForgetPassword.detailView}>
                        <Text style={styleForgetPassword.detailText}>Provide your account’s email for which you want</Text>
                        <Text style={styleForgetPassword.detailText}>to reset your password</Text>
                    </View>
                    <View>
                        <InputBox error={eEmail} namePlaceholder="Email" isPass={false} 
                            onChangeText={handleChangeText} variable={email} errorMess={errorMess}/>
                    </View>
                    <View>
                        <ButtonBox name="Xác nhận" funVoid={postForget} background="#459DE4" border={0} colorText="#FFFDFD"/>
                    </View>
                    <Modal
                        visible={iVisible}
                        animationType="slide"
                        transparent={true}>
                            <View style={[styleGlobal.mainLayout,{justifyContent:"center"}]}>
                                <View style={styleGlobal.comfirmEmailSignin}>
                                    <Fontisto name="email" size={50} color="black" />
                                    <Text>{mess}</Text>
                                    <ButtonBox name="Xác nhận" background='cyan' colorText='white' 
                                        funVoid={submit} border={0} wid={100} />
                                </View> 
                            </View>
                    </Modal>
        </View>
    )
}
export default ForgetPassFirst;