
import HomeTest from "@/components/test/homeTest";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { styleGlobal } from "../css/cssGlobal";
import Exams from "@/components/test/exams";
import Result from "@/components/test/result";

interface StatusProps {
    funVoid: (is: boolean) => void;
}

const TestLayout: React.FC<StatusProps> = ({funVoid }) => {
    const [status, setStatus] = useState(1);
    const [data, setData] = useState<string[]>([]);

    useEffect(()=>{
        status == 1 && funVoid(true);
        status == 2 && funVoid(false);
        status == 3 && funVoid(false);
    },[status])

    const toHome = () => {
        setStatus(1);
    }
    const toTest = () => {
        setStatus(2);
    }

    const toResult = () => {
        setStatus(3);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    return(
        <View style={styleGlobal.mainLayout}>
            {status == 1 && <HomeTest funvoid={toTest}/>}
            {status == 2 && <Exams goVoid={toResult} backVoid={toHome}/>}
            {status == 3 && <Result goVoid={toHome} backVoid={toTest}/>}
        </View> 
    )
}
export default TestLayout;