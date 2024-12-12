import { StyleSheet } from "react-native";

export const userInfoStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    headerContainer:{
        // borderWidth: 1,
        flexDirection:"row",
        justifyContent: "center"
        // alignContent: "center"
    },
    headerImage: {
        height: 267,
        width: "100%",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    circleOverlay: {
        position: "absolute",
        marginTop: 25,
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#FFFFFF",
        elevation: 5,
        alignItems: "center",
    },
    textContainer: {
        position: "absolute",
        marginTop: 120,
        width: "100%",
        alignItems: "center",   
    },
        
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    userEmail: {
        fontSize: 18,
        fontStyle: "italic",
        color: "white",
        // fontFamily: "Helvet",
    },
    rectangleContainer: {
        position: "absolute",
        top: "70%",
        left: "50%",
        transform: [{ translateX: -130 }],
        flexDirection: "row",
        gap: 25,
    },
    rectangle: {
        width: 120,
        height: 60,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    userInforIcon1: {
        height: 25,
        width: 25,
        marginStart: 5,
    },
    bodyInfo: {
        marginHorizontal: 40,
        marginTop: 80,
    },
    itemBody: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
        gap: 15,
        // borderWidth: 1,
        // borderColor: "#4C4A54",
        marginBottom: 30,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "white",
    },
    itemText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4C4A54",
    },
});