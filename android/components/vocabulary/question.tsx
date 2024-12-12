import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { BackHandler, Text, ToastAndroid, TouchableOpacity, View } from "react-native"
import HeaderApp from "../other/header";
import { useEffect, useState } from "react";
import Answer from "./answer";
import { ApiAnswer, ApiQuestions, getAnswer, getQuestions, getTidApi, getTname, getToLevel, playSound, Questions, setAnswer, setEQues, setQuestions } from "@/app/(tabs)/data";
import apiClient from "@/app/(tabs)/bearerToken";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";
interface StatusProps {
    backVoid: () => void,
}

const Question: React.FC<StatusProps>  = ({backVoid}) => {
    const [question,setQuestion] = useState<Questions>();
    const [uAnswer,setUAnswer] = useState<string>();
    const [t,setT] = useState<string>("");
    useEffect(()=>{
        setEQues(false);
        setT(getTname());
        const handleBack = () => {
            backVoid();
            return true;
        }
        BackHandler.addEventListener("hardwareBackPress",handleBack);
        return () => {BackHandler.removeEventListener("hardwareBackPress",handleBack)};
    },[])
    const [isAnswer, setIsAnswer] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            const data = await getQuestions() as { code: number; message: string; data: Questions } | null;
            if (data) {
                setQuestion(data.data);
            }
        };
        if(!isAnswer) fetchData();
    },[isAnswer])

    // useEffect(()=>{
    //     if(uAnswer){
    //         console.log("data ques:"+JSON.stringify(uAnswer));
    //         const handleAnswer = async () =>{
    //             const getAns = await apiClient.get(`/words/checkAnswer?wid=${question?.wid}&word=${uAnswer}}`)
    //         }
    //     }
    // },[uAnswer])
    //ham phat ra tieng audio
    // const playSound = async (link:string) => {
    //     if(link){
    //         const text = link.split("https");
    //         // Phần văn bản trước URL
    //         // Phần URL
    //         const url = "https" + text[1].trim();
    //         try {
    //         const { sound } = await Audio.Sound.createAsync(
    //             { uri: url }
    //         );
    //         await sound.playAsync();
            
    //         // Giải phóng tài nguyên sau khi âm thanh phát xong
    //         sound.setOnPlaybackStatusUpdate((status) => {
    //             if (status.isLoaded && status.didJustFinish) {
    //                 sound.unloadAsync(); // Giải phóng tài nguyên sau khi phát xong
    //             }
    //         });          
    //         } catch (error) {
    //         console.error('Lỗi khi phát âm thanh:', error);
    //         }
    //     }
    // };
    // next question
    const nextQuestion = async () =>{
        try{
            const apiInstance = await apiClient(); 
            const nextQues: ApiQuestions = await apiInstance.get(`/words/getQuestion?tid=${getTidApi()}&wid=${question?.wid}`)
            const checkAns = await apiInstance<ApiAnswer>(`/words/checkAnswer?wid=${question?.wid}&word=${uAnswer?.trim()}`)
            setQuestions(nextQues.data);
            if (checkAns.data.data){
                setAnswer(checkAns.data.data);
            }
            setIsAnswer(true);
            if(checkAns.data.message!="Incorrect answer"){
                Toast.show({
                    type: 'success', // success | error | info
                    text1: checkAns.data.message,
                    position: 'bottom', // Hoặc top, center
                });
            }else{
                Toast.show({
                    type: 'error', // success | error | info
                    text1: checkAns.data.message,
                    position: 'bottom', // Hoặc top, center
                });
            }
            
        }catch(error){
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                setEQues(true);
                setIsAnswer(true);
              } else {
                console.log("Lỗi khác:", error);
              }
        }
    }
    return(
        <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={false} title={t} funVoid={backVoid}/>    
            <View style={styleGlobal.viewBodyQues} >
                <View style={styleGlobal.viewHeaderQues}>
                    {question?.question.includes('https') ? 
                                <View style={styleGlobal.viewQuesUrl}>
                                    <Text style={styleGlobal.titleQuesUrl}>Hãy chọn từ được nói trong: </Text>
                                    <TouchableOpacity onPress={() => playSound(question?.question)}>
                                    <Text style={styleGlobal.titleQuesUrl}>Nhấn vào đây để nghe</Text>
                                </TouchableOpacity> 
                                </View>
                                : 
                            <Text style={styleGlobal.titleQues}>{question?.question}</Text>}
                    {/* <Text style={styleGlobal.titleQues}>Từ nào có nghĩa: {question?.question} </Text> */}
                </View>
                <View style={styleGlobal.mainLayout}>
                    {question?.answers.map((answer,index)=>(
                        <TouchableOpacity 
                        style={[
                            styleGlobal.viewAnswerQues,
                            { backgroundColor: answer === uAnswer ? "#D3F9D8" : "#FFFFFF" } // Đổi màu nền
                        ]}
                        onPress={()=>setUAnswer(answer)} key={index}>
                            <Text style={styleGlobal.textAnsQues}>{answer}</Text>
                        </TouchableOpacity>))}
                    {/* nut sang cau tiep */}
                    <TouchableOpacity style={styleGlobal.buttonQues} onPress={() => nextQuestion()}>
                        <Text style={styleGlobal.textButQues}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Answer iVisiable={isAnswer} setIVisiable={setIsAnswer} />
            <Toast/>
        </View>
    )
}
export default Question;