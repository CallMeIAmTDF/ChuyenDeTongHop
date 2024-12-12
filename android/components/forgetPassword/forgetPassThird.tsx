import { styleForgetPassword } from "@/app/(tabs)/css/cssForgetPassword";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import InputBox from "../other/inputBox";
import ButtonBox from "../other/buttonBox";
interface StatusProps {
    funVoid: () => void;
    getData: (value: string) => void;
    data: string;
}
const ForgetPassThird: React.FC<StatusProps> = ({funVoid, data, getData}) => {
    const [errorPass, setErrorPass] = useState<string>("");
    const [errorComPass, setErrorComPass] = useState<string>("");
    const [ePass, setEPass] = useState<boolean>(false);
    const [eComPass, setEComPass] = useState<boolean>(false);

    const [pass, setPass] = useState("");
    const handlePass = (value: string) => {
        setPass(value);
        getData(value);
    }
    const [comfirmPass, setComfirmPass] = useState("");
    
    const checkPass = () => {
        if(pass.length == 0) {setErrorPass("Mat khau khong khong duoc rong"); setEPass(true); setEComPass(false)}
        else {
            if(pass != comfirmPass) {setErrorComPass("Mat khau khong trung khop"); setEComPass(true); setEPass(false)}
            else {funVoid() ; setEPass(false); setEComPass(false)}
        };
    }
    return(
        <View style={styleForgetPassword.forgetPassword}> 
                    <Image style={styleForgetPassword.imgForgetPassword} source={require("@/assets/images/png/forgetPassword.png")}/>
                    <Text style={styleForgetPassword.title}>NEW</Text>
                    <Text style={styleForgetPassword.title}>CREDENTIAL</Text>
                    <View style={styleForgetPassword.detailView}>
                        <Text style={styleForgetPassword.detailText}>Your identify, has been verified!</Text>
                        <Text style={styleForgetPassword.detailText}>Set your new password</Text>
                    </View>
                    <View>
                        <InputBox error={ePass} namePlaceholder="Password" isPass={true} onChangeText={handlePass} variable={pass} errorMess={errorPass}/>
                        <InputBox error={eComPass} namePlaceholder="Confirm Password" isPass={true} onChangeText={setComfirmPass} variable={comfirmPass} errorMess={errorComPass}/>
                    </View>
                    <View>
                        <ButtonBox name="Update" funVoid={checkPass} background="#459DE4" colorText="#FFFDFD" border={0}/>
                    </View>
        </View>
    )
}
export default ForgetPassThird;