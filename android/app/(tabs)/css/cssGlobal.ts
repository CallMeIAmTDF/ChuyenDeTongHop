import LineSign from "@/components/other/lineSign";
import { StyleSheet } from "react-native";

export const styleGlobal = StyleSheet.create({
    //main
    mainLayout: {
        flex:1,
        alignItems:"center",
        width:"100%",
    },
    //boxInput
    boxInput:{
        alignItems:"center"
    },

    //Input
    container: {
        position: 'relative',
        justifyContent:"center",
        marginTop: 26,
      },
    input: {
        width: 271,
        height: 52,
        borderRadius: 5,
        borderWidth: 1,
        fontSize:  20,
        paddingLeft: 15,
        paddingTop: 10,
        paddingRight: 45,
      },
    placeholderFocus: {
        position: 'absolute',
        left: 15,
        top: 3,
        color: '#A9A9A9', 
        fontSize: 12, 
        fontWeight: "400",
      },
      placeholderBlur: {
        position: 'absolute',
        left: 15,
        top: 10,
        color: '#A9A9A9', 
        fontSize: 23, 
        fontWeight: "400",
      },
    iconEye: {
        position: 'absolute',
        right: 14,
        top: 15,
      },
    errorMess: {
        marginLeft: 15,
        marginTop:5,
        fontSize: 12,
        color: "red",
        width: 251,
    },

    // button
    button: {
        //width: 271,
        height: 52,
        borderRadius: 5,
        backgroundColor: "#459DE4",
        justifyContent:"center",
        alignItems:"center",
        marginTop: 26
      },
    textButton: {
        fontSize: 14,                    
        lineHeight: 16.94,
        fontWeight: "700",
    },

    //lineSign:
    lineSign:{
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        height:2,
        width:62,
        backgroundColor: "#D9D9D9",
    },
    textSign: {
        fontSize:12,
        fontWeight: "700",
        lineHeight: 14.52,
        marginHorizontal: 1,
    },

    //google buttun
    viewGoogle: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:260,
        height:41,
        borderRadius: 10,
        borderWidth: 1,
    },
    logoGoogle: {
        width:18,
        height:18,
    },
    textGoogle: {
        fontSize:14,
        fontWeight: "700",
        lineHeight: 16.94,
        marginLeft: 20,
    },

    //haveAcc
    quizAns: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 30,
        marginBottom:55,
    },
    quiz: {
        fontSize:12,
        fontWeight: "500",
        lineHeight: 14.52,
    },
    ans: {
        fontSize:12,
        fontWeight: "500",
        lineHeight: 14.52,
        color: "#459DE4",
    },

    //header
    header: {
        height: 65,
        width:"100%",
        backgroundColor: "#459DE4",
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"center"
    },
    backHeader: {
        position: "absolute",
        left: 19, 
    },
    textHeader:{
        fontWeight:"700",
        fontSize:20,
        lineHeight:24.2,
        color: "white",
        
    },
    chatHeader: {
        position:"absolute",
        right:10,
    },

    //image Study
    studyImage:{
        width:240,
        height:156.89,
    },

    //bottonTap
    textBottomTap: {
        color: '#0EB1FC', 
        fontSize:10, 
        fontWeight:"400"
    },

    //List Levels
    levels:{
        flex:1,
        marginTop: 19.11,
    },
    IViewLevels: {
        width: 290,
        height: 125,
        borderRadius: 5,
        backgroundColor: "#fff", // Màu nền của View
        paddingLeft: 20, // Khoảng cách padding bên trong
        paddingRight:5,
        marginVertical:11,
        marginHorizontal: 10,
        elevation: 5, // Độ cao của đổ bóng (giá trị cao hơn để đổ bóng rõ hơn)
        flexDirection: "row",
        alignItems: "center",
    },
    imageLevel: {
        width:67,
        height:99,
    },
    viewDetail: {
        marginLeft: 28,
        flex:1,
    },

    titleLevel: {
        fontWeight: "500",
        fontSize:14,
        lineHeight:16.94,
        color: "#4C4A54",
        marginVertical:15,
    },

    detailLevel: {
        fontWeight: "500",
        fontSize:10,
        lineHeight:12.1,
        color: "#4C4A54",
        //textAlign: 'justify',
    },

    progress: {
        backgroundColor:"#919191",
        height: 4,
    },

    sumPro: {
        height: 4,
        width:"100%",
        backgroundColor: "#D9D9D9",
    },

    //listTopics
    //thanh tim kiem
    viewInsert: {
        width:285,
        height:44,
        borderRadius:10,
        borderWidth:1,
        marginTop:33,
        flexDirection: "row",
        alignItems:"center",
        borderColor:"#BBBBBB",
    },
    searchTopic: {
        marginHorizontal: 16,
    },
    inputTopic: {
        flex:1,
        marginRight:5,
    },
    //danh sach cac topics
    viewTopic: {
        flex:1,
        alignItems:"center",
        marginTop:11,
    },
    iTopic: {
        marginVertical:12,
        marginHorizontal:10,
        height:58,
        width:290,
        elevation:5,
        backgroundColor: "#FFFFFF",
        borderRadius:5,
        paddingLeft:14,
        paddingRight:9,
        paddingBottom: 5,
        justifyContent: "space-evenly",
    },
    titleTopic:{
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
    },
    //error 
    textError:{
        color:"red",
    },
    //Question
    viewBodyQues: {
        width:328,
        height:569,
        borderRadius:30,
        margin:20,
        elevation: 5,
        backgroundColor: "#FFFFFF",
    },
    viewHeaderQues: {
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#565CCE",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:32.15,
    },
    titleQues: {
        fontWeight: "500",
        fontSize:20,
        lineHeight:24.2,
        textAlign: "center",
        color:"white",
        margin:20,
        justifyContent:"center",
        alignContent:"center",
    },
    viewQuesUrl:{
        alignItems:"center",
        margin:20,
    },
    titleQuesUrl: {
        fontWeight: "500",
        fontSize:20,
        lineHeight:24.2,
        color:"white",
    },
    viewAnswerQues: {
        width:290,
        height:58,
        borderRadius: 10,
        elevation: 5,
        justifyContent:"center",
        alignItems:"center",
        marginBottom: 20
    },
    textAnsQues:{
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
    },
    buttonQues: {
        right:19,
        bottom:16,
        width:94,
        height:38,
        borderRadius:20,
        backgroundColor: "#674FA3",
        justifyContent:"center",
        alignItems:"center",
        position: "absolute",
    },
    textButQues: {
        fontWeight:"700",
        fontSize:14,
        lineHeight:16.94,
        color:"#FFFFFF",
    },

    //Answer
    answerLayout: {
        width:268,
        borderRadius:16,
        elevation:5,
        backgroundColor:"#FFFFFF",
        position:"absolute",
        top:117,
        alignItems: "center",
        paddingBottom:32,
    },
    //anh 
    imageAnswer: {
        width:194,
        height:171,
        borderRadius:20,
        marginTop:28,
    },
    //khung text
    viewWordAnswer: {
        width: 193,
        marginTop:38,
    },
    //khung chua word va volumn
    wordAnswer: {
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"center",
        alignSelf: "flex-start",
    },
    //kieu chu word, meaning, tran
    textWAnswer:{
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
        marginRight:10,
    },
    //chu type
    viewTypeAnswer:{
        paddingHorizontal:5,
        height: 22,
        borderRadius:10,
        backgroundColor:"#344B5F",
        alignSelf: "flex-start",
        alignItems:"center",
        justifyContent:"center",
        marginTop:7,
    },
    textTAnswer:{
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
        color:"white",
    },
    //chu used
    textUAnswer: {
        fontWeight:"500",
        fontSize:12,
        lineHeight:14.52,
        marginTop:14,
    },
    //nut xac nhan
    butAnswer:{
        width:71,
        height:45,
        borderRadius:30,
        backgroundColor:"#01AAAF",
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
    },
    textButAnswer: {
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
        color:"white",
    },


    //TestLayout
    //HomeTest
    imageHomeTest: {
        width:242,
        height:159,
        marginTop:58,
    },
    titleTest: {
        fontWeight:"700",
        fontSize:30,
        lineHeight:36.31,
        color:"#4C4A54",
        marginTop:42,
    },
    butHomeTest: {
        width:243,
        height:49,
        borderRadius:5,
        elevation:3,
        backgroundColor:"#41669C",
        alignItems  :"center",
        justifyContent:"center",
        marginTop:111,
    },
    textButHomeTest:{
        fontWeight:"700",
        fontSize:20,
        lineHeight:24.2,
        color:"white",
    },
    //exams
    viewTitleExams: {
        flexDirection:"row",
        width:327,
        justifyContent:"space-between",
        paddingLeft:20,
        paddingBottom:9,
        marginTop:25,
    },
    numQuesExams: {
        fontWeight:"700",
        fontSize:16,
        lineHeight:19.36,
        color:"#4C4A54",
    },
    viewTimeExams: {
        flexDirection:"row",
        alignItems:"center",
    },
    textTimeExams: {
        fontWeight:"700",
        fontSize:16,
        lineHeight:19.36,
        color:"#459DE4",
        marginLeft:2,
    },
    lineExams: {
        width:327,
        height:2,
        backgroundColor:"#9C9C9C",
        marginBottom:20,
    },
    //bodyExam
    headerExams: {
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#60BED8",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:32.15,
    },
    butNextExams: {
        right:19,
        bottom:16,
        width:94,
        height:38,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        position: "absolute",
    },
    textExams: {
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
    },

    butPreExams: {
        left:19,
        bottom:16,
        width:94,
        height:38,
        borderRadius:20,
        justifyContent:"center",
        alignItems:"center",
        position: "absolute",
    },

    //result
    evaluateResult: {
        fontWeight:"700",
        fontSize:20,
        lineHeight:24.2,
        color:"#FF4F4F",
        marginTop: 14,
    },
    viewProcessResult: {
        width:70,
        height:70,
        borderWidth:5,
        borderColor:"#0EB1FC",
        borderRadius:70,
        justifyContent:"center",
        alignItems:"center",
        marginTop:25,
    },
    correctResult:{
        marginTop:12,
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
    },
    butonResult:{
        marginTop:19,
        width:91,
        height:42,
        borderRadius:5,
        backgroundColor:"#459DE4",
        justifyContent:"center",
        alignItems:"center",
    },
    viewAnsResult: {
        width:"92%",
        marginTop: 63,
        flex:1,
    },
    eachAnsResult:{
        flexDirection:"row",
        paddingBottom:10,
        marginTop: 12,
        marginLeft:16,
    },
    textAnsResult:{
        fontWeight:"500",
        fontSize:14,
        lineHeight:16.94,
    },
    textQuesResult:{
        flex:1,
    },
    titleAnsResult:{
        fontWeight:"500",
        fontSize:16,
        lineHeight:19.36,
    },
    lineResult: {
        width:"100%",
        height:2,
        backgroundColor:"#000000c7",
        alignContent:"center",
    },
    //signUp
    comfirmEmailSignin: {
        justifyContent:"space-evenly",
        padding:20,
        width:268,
        borderRadius:16,
        elevation:5,
        backgroundColor:"#FFFFFF",
        position:"absolute",
        alignItems: "center",
    },
})