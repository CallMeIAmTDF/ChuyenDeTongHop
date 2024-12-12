import HeaderApp from "@/components/other/header"
import { BackHandler, Button, FlatList, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styleGlobal } from "../../app/(tabs)/css/cssGlobal"
import React, { useEffect, useState } from "react"
import { useFocusEffect } from "expo-router"
import { ApiTopics, getInfoGoogle, getLevels, getTokenAuthor, setLname, setTopics, Topics } from "@/app/(tabs)/data"
import apiClient, { setAuthToken } from "@/app/(tabs)/bearerToken"
interface StatusProps {
    funvoid: () => void;
    // logout: () => void;
}
interface Levels{
    lid: number,
    lname: string,
    limage: string,
    numTopics: number,
    numWord: number,
    progress: number,
};
const ListLevels: React.FC<StatusProps> = ({funvoid}) => {
    const [isFocus, setIsFocus] = useState(true);
    const [levels, setLevels] = useState<Levels[]>([]);
    const [lids,setLid] = useState<number>();
    useEffect(() => {
        const data = getLevels() as { code: number; message: string; data: Levels[] } | null;
        if (data) {
            setLevels(data.data);
        }
        // console.log("level: "+ JSON.stringify(levels))
    }, []);

    //dang xuat
    //dong app
    const closeApp = () => {
      BackHandler.exitApp();
      return true;
    };
    useFocusEffect(
        React.useCallback(() => {
            // Thêm listener cho sự kiện nhấn nút quay lại
            BackHandler.addEventListener('hardwareBackPress', closeApp);
            // Dọn dẹp listener khi component không còn được hiển thị
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', closeApp);
            };
        }, []) // Mảng phụ thuộc rỗng để chỉ chạy khi component được hiển thị
    );

    //post topic
    const handleTopic = async () =>{
        if (lids !== undefined) {
            try{
                const apiInstance = await apiClient(); 
                const topics: ApiTopics = await apiInstance.get(`/topics/getByLevel?lid=${lids}`)
                setTopics(topics.data);
                funvoid();
            }catch(error){
                console.error(error);
            }
        }
    }

    useEffect(() => {
        if (lids !== undefined) {
            handleTopic();
        }
    }, [lids]);
    if(!levels){
        return(<></>)
    }
    return(
        <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={true} title="Danh sách các cấp độ" funVoid={() => null}/>
            <Image style={styleGlobal.studyImage} source={require("@/assets/images/png/study.png")} />
            <View style={styleGlobal.levels}>
            <FlatList 
                data={levels}
                keyExtractor={(item) => item.lid +""}
                showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={()=>{setLname(item.lname);setLid(item.lid)}} style={styleGlobal.IViewLevels}>
                            <Image style={styleGlobal.imageLevel} source={{uri: item.limage}} />
                            <View style={styleGlobal.viewDetail}>
                                <Text style={styleGlobal.titleLevel}>{item.lname}</Text>
                                <Text style={styleGlobal.detailLevel}>Danh sách từ vựng từ {item.lname} bao gồm {item.numTopics} bài học và {item.numWord} từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF</Text>
                                <View style={styleGlobal.sumPro}>
                                    <View style={[styleGlobal.progress, {width: `${item.progress*100 }%`}]} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            </View>
        </View>
    )
}
export default ListLevels;