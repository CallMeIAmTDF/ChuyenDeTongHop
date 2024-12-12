import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Image, Text, TouchableOpacity, View } from "react-native";
interface StatusProps {
    funVoid: () => void;
}
const LoginGoogleBtn: React.FC<StatusProps > = ({ funVoid }) =>{
    return(
        <TouchableOpacity style={styleGlobal.viewGoogle}
        onPress={funVoid}>
            <Image style={styleGlobal.logoGoogle} source={require("@/assets/images/png/logoGoogle.png")}/>
            <Text style={styleGlobal.textGoogle}>Google</Text>
        </TouchableOpacity>
    )
}

export default LoginGoogleBtn;
