import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"
interface StatusProps {
    //title ma button se hien thi
    name: string;
    //background cua button
    background: string;
    //ham ma button se thuc hien
    funVoid: () => void;
    border: number;
    colorText: string;
    wid?: number ;
}
//: React.FC<StatusProps >
const ButtonBox: React.FC<StatusProps> = ({ name, background, funVoid , border, colorText,wid}) => {
    const [widB,setWidB] = useState<number>(271);
    useEffect(()=>{
        if(wid) setWidB(wid);
    },[wid])
    return(
        <TouchableOpacity 
            style={[styleGlobal.button, {backgroundColor: background, borderWidth: border, width:widB}]}
            onPress={funVoid}>
            <Text style={[styleGlobal.textButton, { color: colorText }]}>{name}</Text>
        </TouchableOpacity>
    )
}

export default ButtonBox;