import { BackHandler, FlatList, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import HeaderApp from "../other/header";
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { ApiQuestions, getLname, getTopics, setQuestions, setTidApi, setTname, Topics } from "@/app/(tabs)/data";
import apiClient from "@/app/(tabs)/bearerToken";

interface StatusProps {
    goVoid: () => void,
    backVoid: () => void,
}

const ListTopics: React.FC<StatusProps>  = ({goVoid, backVoid}) =>{
    const [searchTopic, setSearchTopic] = useState("");
    const [topics,setTopics] = useState<Topics[]>([])
    const [delay,setDelay] = useState(true);
    const [tid,setTid] = useState<number>(-1);
    const [l,setL] = useState<string>("");
    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopics() as { code: number; message: string; data: Topics[] } | null;
            if (data) {
                setTopics(data.data);
                setDelay(false);
            }
        };
        setL(getLname());
        fetchData();
    }, []);

    

    const [resultSearch, setResultSearch] = useState<Topics[]>(topics);
    const handleSearch = () => {
        setResultSearch(topics.filter(stu => stu.tname.includes(searchTopic)));
    }

    useEffect(() => {
        if (topics) {  // Chỉ gọi handleSearch khi dữ liệu đã được tải xong
            handleSearch();
        }
    }, [searchTopic,topics]);

    //get question
    const handleQuestion = async () => {
        try{
            const apiInstance = await apiClient(); 
            const getQues: ApiQuestions = await apiInstance.get(`/words/getQuestion?tid=${tid}`)
            setQuestions(getQues.data);
            setTidApi(tid);
            goVoid();
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        if(tid!=-1){
            handleQuestion();
        }
    },[tid])

    //ham tro lai
    useEffect(()=>{
        const handleBack = () => {
            backVoid();
            return true;
        }
        BackHandler.addEventListener("hardwareBackPress",handleBack);
        return () => {BackHandler.removeEventListener("hardwareBackPress",handleBack)};
    },[])
    
    return(
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
            <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={false} title={l} funVoid={backVoid}/>
            <View style={styleGlobal.viewInsert}>
                <TouchableOpacity onPress={handleSearch}>
                    <FontAwesome style={styleGlobal.searchTopic} name="search" size={24} color="black" />
                </TouchableOpacity>
                <TextInput style={styleGlobal.inputTopic}
                    placeholder="Nhập tên chủ đề muốn tìm"
                    value={searchTopic}
                    onChangeText={setSearchTopic}
                />
            </View>
            <View style={styleGlobal.viewTopic}>
            {!delay && resultSearch.length == 0 ? (<Text style={styleGlobal.textError}>Không tìm thấy chủ đề chứa "{searchTopic}"</Text>):
                (<FlatList 
                    data={resultSearch}
                    showsVerticalScrollIndicator={false} 
                    keyExtractor={(item) => item.tid + ""}
                    renderItem={({item}) => {
                        return(
                            <TouchableOpacity style={styleGlobal.iTopic} onPress={()=>{setTname(item.tname); setTid(item.tid)}}>
                                <Text style={styleGlobal.titleTopic}>Chủ đề: {item.tname}</Text>
                                <View style={styleGlobal.sumPro}>
                                    <View style={[styleGlobal.progress, {width: `${item.progress}%`}]} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />)
            }
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default ListTopics;