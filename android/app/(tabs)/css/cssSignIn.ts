import { StyleSheet } from "react-native";

export const styleSignIn = StyleSheet.create({
    //layout signIn
    signIn: {
        flex:1,
        alignItems: "center",
    },

    //logo app
    logoApp: {
        width: 233,
        height: 163,
        marginTop: 71,
    },

    //khung cac o input
    ViewInput: {
        marginTop: 9
    },

    //khung remember va forget password
    lineOtherChoice: {
        width: 271,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
        justifyContent: "space-between",
    },

    iconToggle: {
        marginHorizontal:6,
    },

    //khung chua remember
    viewRemember: {
        flexDirection:"row",
        alignItems: "center",
    },

    //style cua text trong button sign in
    textSignIn: {
        fontSize: 11,
        fontWeight: "400",
        lineHeight: 13.31,
    },

    //khung cua cac button co trong layout sign in
    viewButton: {
        height: 186,
        justifyContent:"space-between" ,
        alignItems: "center",
    },
    
    //khung chua lua chon chuyen sang sign up
    lineQuiz: {
        marginTop:111,
    },
})