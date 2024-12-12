import ListLevels from "@/components/vocabulary/listLevels"
import ListTopics from "@/components/vocabulary/listTopics";
import Question from "@/components/vocabulary/question";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { setToLevel } from "../data";
interface StatusProps {
    funVoid: (is: boolean) => void;
    // logout: () => void;
}

const Vocabulary: React.FC<StatusProps> = ({funVoid}) => {
    const [status, setStatus] = useState(1);
    const toLevel = () => {
        setStatus(1);
        funVoid(true);
    }
    const toTopic = () => {
        setStatus(2);
        funVoid(false);
    }
    const toQues = () => {
        setStatus(3);
    }
    useEffect(()=>{
        setToLevel(toLevel)
    },[])
    return(
        <View style={{flex: 1}}>
            {status == 1 && <ListLevels funvoid={toTopic}/>}
            {status == 2 && <ListTopics goVoid={toQues} backVoid={toLevel}/>}
            {status == 3 && <Question backVoid={toTopic}/>}
        </View> 
    )
}
export default Vocabulary;