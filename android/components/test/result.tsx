import { BackHandler, FlatList, Text, TouchableOpacity, View } from "react-native"
import HeaderApp from "../other/header"
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import Vocabulary from "@/app/(tabs)/layout/vocabularyLayout";
import Svg, { Circle } from 'react-native-svg';
import { getResultTest, playSound } from "@/app/(tabs)/data";
import { Audio } from "expo-av";

interface StatusProps {
    goVoid: () => void,
    backVoid: () => void,
}
interface Vocabulary {
    id: number;
    word: string;
    meaning: string;
    transcription: string;
    type: string;
    used_en: string;
    used_vi: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_correct: string;
}

const Result: React.FC<StatusProps> = ({ goVoid, backVoid }) => {
    const result = getResultTest();
    const [progress, setProgress] = useState<number>(0);
    //nut quay lai tren may
    useEffect(() => {
        if (result?.data.numCorrectques && result?.data.numQues) {
            setProgress(Math.floor(result?.data.numCorrectques / result?.data.numQues * 100));
        }
        const handleBack = () => {
            backVoid();
            return true;
        }
        BackHandler.addEventListener("hardwareBackPress", handleBack);
        return () => { BackHandler.removeEventListener("hardwareBackPress", handleBack) };
    }, [])

    if (!result) {
        return (<></>);
    }
    return (
        <View style={styleGlobal.mainLayout} >
            <HeaderApp isHome={false} title="Kết quả" funVoid={backVoid} />
            <Text style={styleGlobal.evaluateResult}>Chăm chỉ hơn nhé</Text>
            <View style={styleGlobal.viewProcessResult}>
                <Text style={[styleGlobal.textAnsResult, { color: "#0EB1FC" }]}>{progress}%</Text>
            </View>
            <Text style={styleGlobal.correctResult}>Bạn đã trả lời đúng {result?.data.numCorrectques}/{result?.data.numQues}</Text>
            {result?.data.numForget && (
                <Text style={styleGlobal.correctResult}>Bạn đã quên đi {result?.data.numForget} từ cũ</Text>
            )}
            {result?.data.numNewWord && (
                <Text style={styleGlobal.correctResult}>Bạn đã nhớ thêm {result?.data.numNewWord} từ mới</Text>
            )}
            <TouchableOpacity style={styleGlobal.butonResult}
                onPress={goVoid}>
                <Text style={[styleGlobal.textAnsResult, { color: "white" }]}>Kết thúc</Text>
            </TouchableOpacity>
            <View style={styleGlobal.viewAnsResult}>
                <Text style={styleGlobal.titleAnsResult}>Đáp án chi tiết</Text>

                <FlatList data={result?.data.testDetail}
                    keyExtractor={(item) => item.wid + ""}
                    showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ backgroundColor: item.correct ? "#00ff031a" : "#ff00001c" }}>
                                <View style={styleGlobal.eachAnsResult}>
                                    <Text style={styleGlobal.textAnsResult}>{index + 1}.</Text>
                                    <View style={styleGlobal.textQuesResult}>
                                        {item.question.includes('https') ?
                                            <View>
                                                <Text style={styleGlobal.textAnsResult}>Question: Hãy chọn từ được nói trong: </Text>
                                                <TouchableOpacity onPress={() => playSound(item.question)}>
                                                    <Text style={styleGlobal.textAnsResult}>Nhấn vào đây để nghe</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Text style={styleGlobal.textAnsResult}>Question: {item.question} </Text>}
                                        <Text style={[styleGlobal.textAnsResult, { color: "#0545a2" }]}
                                        >Đáp án đúng: {item.systemAnswer} </Text>
                                        <Text style={[styleGlobal.textAnsResult, { color: "#9422bd" }]}
                                        >Đáp án của bạn: {item.userAnswer}</Text>
                                    </View>
                                </View>
                                <View style={styleGlobal.lineResult} />
                            </View>
                        )
                    }}
                />

            </View>
        </View>
    )
}
export default Result