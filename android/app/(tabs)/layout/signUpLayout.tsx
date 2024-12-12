import React, { useEffect, useState } from 'react';
import { Animated, Button, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TextInputBase, TextInputComponent, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Status from '@/components/signUp/status';
import { styleGlobal } from '../css/cssGlobal';
import InputBox from '@/components/other/inputBox';
import ButtonBox from '@/components/other/buttonBox';
import LineSign from '@/components/other/lineSign';
import QuizAcc from '@/components/other/quizAccount';
import LoginGoogleBtn from '@/components/other/loginGoogleBtn';
import { styleSignUp } from '../css/cssSignUp';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';
import { getServerIpAddress } from '../data';

interface apiSignin {
    code: number,
    message: string,
};

const SignUpLayout = () => {
    //chuyen sang trang signIn
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const moveSignIn = () => {
        navigation.goBack();
    }

    const alertVar = () => {
        alert("Email: "+ email + ", Name: " +name+", Pass: " + pass+ ", comPass: " +comfirmPass)
    }
    ///
    //Sua giao dien khi keybroad duoc bat
    const [isShowKeyBroad, setIsShowKeyBroad] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsShowKeyBroad(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsShowKeyBroad(false);
        });
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, [isShowKeyBroad]);
      ///////////////////////////////////////////

    const [statusIndex, setStatusIndex] = useState('1'); // Màu nền ban đầu là trắng
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [comfirmPass, setComfirmPass] = useState("")
    const [errorEmail, setErrorEmail] = useState<string>()
    const [errorName, setErrorName] = useState("")
    const [errorPass, setErrorPass] = useState("")
    const [errorComPass, setErrorComPass] = useState("")
    const [eEmail, setEEmail] = useState(false)
    const [eName, setEName] = useState(false)
    const [ePass, setEPass] = useState(false)
    const [eComPass, setEComPass] = useState(false)
    const [iVisible,setIVisible] = useState(false)
    const [loading, setLoading] = useState(false);
    const [existEmail,setExistEmail]=useState<string>();
    // const status31 = () => {
    //     if(pass.length == 0) {setErrorPass("Mat khau khong khong duoc rong"); setEPass(true); setEComPass(false)}
    //     else {
    //         if(pass != comfirmPass) {setErrorComPass("Mat khau khong trung khop"); setEComPass(true); setEPass(false)}
    //         else {setStatusIndex("1"); setEPass(false); setEComPass(false)}
    //     };
    // }
    const status12 = () => {
        if(validateEmail(email)) {setStatusIndex("2"); setEEmail(false)}
        else {setErrorEmail("Nhap sai dinh dang email"); setEEmail(true)};
    }
    const status23 = () => {
        if(name.length == 0) {setErrorName("Ten khong duoc de trong"); setEName(true)}
        else {setStatusIndex("3"); setEName(false)};
    }
    const status21 = () => {
        setStatusIndex("1");
    }
    const status32 = () => {
        setStatusIndex("2");
    }

    //regex email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //dang ki;
    const postLogin = async () => {
        setLoading(true);
        if(pass != comfirmPass) {setErrorComPass("Mat khau khong trung khop"); setEComPass(true); setEPass(false); return;}
        setEPass(false); setEComPass(false)
        const ipAddress = getServerIpAddress();
        try {
            let response = await fetch(`http://${ipAddress}:8080/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: pass,
                }),
            });
            const result: apiSignin = await response.json();
            if(result.code == 409 || result.code == 400){
                setStatusIndex("1");
                setEEmail(true);
                setErrorEmail(result.message);
                setEComPass(false); setEPass(false);
                return;
            }
            if(result.code == 201){
                setIVisible(true);
                setEComPass(false); setEPass(false);
            }
            else {
                setErrorComPass(result.message);
                setEComPass(true); setEPass(false);
            };
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return(
        <TouchableWithoutFeedback onPress={ ()=>Keyboard.dismiss() }>
        <View style={styleSignUp.signUp}>
            {/* title */}
            <View style={styleSignUp.viewTitle}>
                <Text style={styleSignUp.textTitle}>Sign Up</Text>
            </View>
            <View style={styleGlobal.boxInput}>

            {/* Thanh trang thai */}
                <Status index={statusIndex}/>
                <View>
                    {/* inputbox */}
                    {statusIndex == "1" && (
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <InputBox variable={email} namePlaceholder='Email' onChangeText={setEmail} isPass={false} errorMess={errorEmail} error={eEmail}/>
                            <ButtonBox name='Continue' background='#459DE4' funVoid={status12} border={0} colorText="#FFFDFD"/>
                        </View>
                    )}

                    {statusIndex == "2" && (
                        <View>
                            <InputBox error={eName} variable={name} namePlaceholder='Full name' onChangeText={setName} isPass={false} errorMess={errorName}/>
                            <ButtonBox name='Continue' background='#459DE4' funVoid={status23} border={0} colorText="#FFFDFD"/>
                            <ButtonBox name='Back' background='#838383' funVoid={status21} border={0} colorText="#FFFDFD"/>
                        </View>
                    )}

                    {statusIndex == "3" && (
                        <View>
                            <InputBox error={ePass} variable={pass} namePlaceholder='Password' onChangeText={setPass} isPass={true} errorMess={errorPass}/>
                            <InputBox error={eComPass} variable={comfirmPass} namePlaceholder='Comfirm Password' onChangeText={setComfirmPass} isPass={true} errorMess={errorComPass}/>
                            <ButtonBox name='Register' background='#459DE4' funVoid={postLogin} border={0} colorText="#FFFDFD"/>
                            <ButtonBox name='Back' background='#838383' funVoid={status32} border={0} colorText="#FFFDFD"/>
                        </View>
                    )}
                </View>
            </View>
            {!isShowKeyBroad && <LineSign haveAccount={false}/>}
            {!isShowKeyBroad && <LoginGoogleBtn funVoid={alertVar}/>}
            {!isShowKeyBroad && <QuizAcc haveAccount={true} funVoid={moveSignIn}/>}
            <Modal
                visible={iVisible}
                animationType="slide"
                transparent={true}>
                    <View style={[styleGlobal.mainLayout,{justifyContent:"center"}]}>
                        <View style={styleGlobal.comfirmEmailSignin}>
                        <Fontisto name="email" size={50} color="black" />
                        <Text>Vui lòng kiểm tra email</Text>
                        <ButtonBox name="Xác nhận" background='cyan' colorText='white' funVoid={()=>moveSignIn()} border={0} wid={100} />
                        </View> 
                    </View>
            </Modal>
        </View>
        </TouchableWithoutFeedback>
    )
}
 export default SignUpLayout;
