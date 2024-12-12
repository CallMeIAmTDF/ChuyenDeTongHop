import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from "react";
import { Answers, getAnswer, getEQues, getToLevel } from "@/app/(tabs)/data";
import { Audio } from 'expo-av';
interface StatusProps{
    iVisiable: boolean;
    setIVisiable: (v: boolean) => void;
}

const Answer:React.FC<StatusProps>  = ({ iVisiable, setIVisiable}) => {
    const [checkAnswer,setCheckAnswer] = useState<Answers>();
    useEffect(()=>{
        if(iVisiable){
            const handleCheckAnswer = async () =>{
                const data = await getAnswer();
                if(data) setCheckAnswer(data);
            }
            handleCheckAnswer();
        }
    },[iVisiable])

    //ham phat ra tieng audio
    const playSound = async () => {
        if(checkAnswer?.voice){
            try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: checkAnswer?.voice }
            );
            await sound.playAsync();
            
            // Giải phóng tài nguyên sau khi âm thanh phát xong
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync(); // Giải phóng tài nguyên sau khi phát xong
                }
            });          
            } catch (error) {
            console.error('Lỗi khi phát âm thanh:', error);
            }
        }
      };

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={iVisiable}
        >
            <View style={styleGlobal.mainLayout}>
                <View style={styleGlobal.answerLayout}>
                    <Image style={styleGlobal.imageAnswer} source={require("@/assets/images/png/answer.png")} />
                    <View style={styleGlobal.viewWordAnswer}> 
                        <View style={styleGlobal.wordAnswer}>
                            <Text style={styleGlobal.textWAnswer}>{checkAnswer?.word}</Text>
                            <TouchableOpacity onPress={playSound}>
                                <FontAwesome6 name="volume-low" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styleGlobal.textWAnswer}>{checkAnswer?.meaning}</Text>
                        <Text style={styleGlobal.textWAnswer}>/{checkAnswer?.pronun}/</Text>
                        <View style={styleGlobal.viewTypeAnswer}>
                            <Text style={styleGlobal.textTAnswer}>{checkAnswer?.entype}</Text>
                        </View>
                        <Text style={styleGlobal.textUAnswer}>{checkAnswer?.endesc}</Text>
                        <Text style={styleGlobal.textUAnswer}>{checkAnswer?.viedesc}</Text>
                    </View>
                    <TouchableOpacity style={styleGlobal.butAnswer} onPress={() =>{setIVisiable(false); getEQues() && getToLevel();}}>
                        <Text style={styleGlobal.textButAnswer}>Tiếp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
export default Answer;