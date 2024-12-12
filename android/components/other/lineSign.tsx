import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native"

interface StatusProps {
    haveAccount: boolean;
}
const LineSign: React.FC<StatusProps> = ({ haveAccount }) => {
    const [name, setName] = useState("")
    useEffect(() => {
        {haveAccount? setName("Or sign in with") : setName("Or sign up with")}
    }, [haveAccount]);

    return(
        <View style={styleGlobal.lineSign}>
            <View style={styleGlobal.line}/>
            <Text style={styleGlobal.textSign}>{name}</Text>
            <View style={styleGlobal.line}/>
        </View>
    )
}

export default LineSign;