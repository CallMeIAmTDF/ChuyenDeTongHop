import { styleForgetPassword } from "@/app/(tabs)/css/cssForgetPassword";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import InputBox from "../other/inputBox";
import ButtonBox from "../other/buttonBox";
import LoginGoogleBtn from "../other/loginGoogleBtn";
import VerifiCode from "./verifiCode";
interface StatusProps {
    funVoid: () => void;
}
const ForgetPassSecond: React.FC<StatusProps> = ({funVoid}) => {
    const [email, setEmail] = useState("");
    const handleAlert = () => {
        alert(email)
    }

    //dong ho dem nguoc
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        if (seconds > 0) {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(interval);
        }
    }, [seconds]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const secs = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSetTime = () => {
        setSeconds(60)
    }
    
    return(
        <View style={styleForgetPassword.forgetPassword}> 
                    <Image style={styleForgetPassword.imgForgetPassword} source={require("@/assets/images/png/veriCode.png")}/>
                    <Text style={styleForgetPassword.title}>VERIFICATION</Text>
                    <View style={styleForgetPassword.detailView}>
                        <Text style={styleForgetPassword.detailText}>Provide your account’s email for which you want</Text>
                        <Text style={styleForgetPassword.detailText}>to reset your password</Text>
                    </View>
                    <Text style={styleForgetPassword.detailVerifi}>Time remaining {formatTime(seconds)}</Text>
                    <VerifiCode funVoid={funVoid}/>
                    <View>
                        <ButtonBox name="Resent OTP" funVoid={handleSetTime} background="white" border={1} colorText="black"/>
                    </View>
        </View>
    )
}
export default ForgetPassSecond;