import { styleSignUp } from "@/app/(tabs)/css/cssSignUp"
import { useEffect, useState } from "react";
import { Text, View } from "react-native"

interface StatusProps {
    index: string;
}

const Status: React.FC<StatusProps > = ({ index }) => {
    // bien de thay doi mau cua indexStatus
    const [bgIndexColor2, setBgIndexColor2] = useState("white");
    const [bgIndexColor3, setBgIndexColor3] = useState("white");

    //const [indexColor2, setIndexColor2] = useState("#9AD8FF");
    //const [indexColor3, setIndexColor3] = useState("#9AD8FF");

    // bien de thay doi mau cua nameStatus
    const [nameColor, setNameColor] = useState("white");
    const [passColor, setPassColor] = useState("white");

    // dung effect de chi render lai khi bien thay doi 
    useEffect(() => {
        if(index == "1" ) {
            setBgIndexColor2("#9AD8FF");
            //setIndexColor2("white");

            setBgIndexColor3("#9AD8FF");
            //setIndexColor3("white");

            setNameColor("#9AD8FF");
            setPassColor("#9AD8FF");
        };
        if(index == "2" ) {
            setBgIndexColor2("#459DE4");
            //setIndexColor2("white");

            setBgIndexColor3("#9AD8FF");
            //setIndexColor3("#9AD8FF");

            setNameColor("#459DE4");
            setPassColor("#9AD8FF");
        };
        if(index == "3" ) {
            setBgIndexColor2("#459DE4");
            //setIndexColor2("white");

            setBgIndexColor3("#459DE4");
            //setIndexColor3("white");

            setNameColor("#459DE4");
            setPassColor("#459DE4");
        };
    },[index])

    return(
        <View style={styleSignUp.status}>
            {/* indexStatus */}
            <View style={styleSignUp.viewStatus}>
                <View style={[styleSignUp.viewIndexStatus, {backgroundColor: "#459DE4"}]}>
                    <Text style={styleSignUp.textIndexStatus}>1</Text>
                </View>

                <View style={styleSignUp.lineStatus} />

                <View style={[styleSignUp.viewIndexStatus, {backgroundColor: bgIndexColor2}]}>
                    <Text style={styleSignUp.textIndexStatus}>2</Text>
                </View>

                <View style={styleSignUp.lineStatus} />

                <View style={[styleSignUp.viewIndexStatus, {backgroundColor: bgIndexColor3}]}>
                    <Text style={styleSignUp.textIndexStatus}>3</Text>
                </View>
            </View>

            {/* nameStatus */}
            <View style={styleSignUp.viewNameStatus}>
                <Text style={[styleSignUp.textNameStatus, {color: "#459DE4"}]}>Email</Text>
                <Text style={[styleSignUp.textNameStatus, {color: nameColor}] }>Full Name</Text>
                <Text style={[styleSignUp.textNameStatus, {color: passColor}] }>Password</Text> 
            </View>
        </View>
    )
}

export default Status;

//input dau giu nguyen