import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native"

interface StatusProps {
    haveAccount: boolean;
    funVoid: () => void
}
const  QuizAcc: React.FC<StatusProps> = ({ haveAccount ,funVoid}) => {
    const [name, setName] = useState("")
    const [sign, setSign] = useState("")
    useEffect(() => {
        if (haveAccount) {
            setName("Have an account ? ");
            setSign("Sign in")
        } else {
            setName("Don't have an account ? ");
            setSign("Sign up")
        }
    }, [haveAccount]);

    return(
        <View style={styleGlobal.quizAns}>
            <Text style={styleGlobal.quiz}>{name}</Text>
            <TouchableOpacity onPress={funVoid}><Text style={styleGlobal.ans}>{sign}</Text></TouchableOpacity>
        </View>
    )
}

export default QuizAcc;