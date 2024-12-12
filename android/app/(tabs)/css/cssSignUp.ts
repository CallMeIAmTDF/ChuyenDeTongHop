import { useState } from "react";
import { StyleSheet } from "react-native";

export const styleSignUp = StyleSheet.create({
    //signUp
    signUp: {
        flex:1,
        flexDirection:"column",
        justifyContent: "space-between",
        alignItems: "center",
    },

    // Title
    textTitle: {
        fontSize: 40,
        fontWeight: "500",
        lineHeight: 48,
        color: "#F39000"
    },
    viewTitle: {
        top: 103,
        position: "absolute",
    },

    // Status
    status:{
        width: 220,
        height: 50,
        marginTop: 234,
    },

    //indexStatus
    viewStatus: {
        flex: 1, 
        marginLeft: 2,
        marginRight: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
    },
    viewIndexStatus: {
        width: 25,
        height: 25,
        borderRadius:100,
        justifyContent: "center",
    },
    textIndexStatus: {
        textAlign: "center",
        textAlignVertical: "auto",
        fontWeight: "500",
        fontSize: 10,
        color:"white",
    },
    lineStatus: {
        width: 55, 
        backgroundColor: "#9AD8FF",
        height:1
    },

    //nameStatus
    viewNameStatus: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    },

    textNameStatus: {
        fontSize: 10,
        fontWeight: "500",
    },
})
