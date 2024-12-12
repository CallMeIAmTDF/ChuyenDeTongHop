import { StyleSheet } from "react-native";

export const gameHomeStyles = StyleSheet.create({
    container: {
      flex: 1,
      // borderWidth: 1,
      backgroundColor: "#FFFFFF",
  
    },
    header: {
      height: 65,
      backgroundColor: "#459DE4",
      justifyContent: "center",
      alignItems: "center",
    },
    text_header: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
    },
    vsSection: {
      // borderWidth: 1,
      marginTop: 25,
      alignItems: "center",
    },
  
    vsgame: {
      width: 300,
      height: 300,
    },
    buttonsContainer: {
      // flex: 1,
      // borderWidth: 1,
      // borderColor:"red",
      alignItems: "center",
      marginTop: 50,
    },
    buttonGuide: {
      backgroundColor: "#FFFFFF",
      padding: 10,
      borderRadius: 5,
      width: "70%",
      alignItems: "center",
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#AAAAAA",
      flexDirection: "row",
      elevation: 2,
    },
    buttonRanking: {
      backgroundColor: "#8AD0E7",
      padding: 10,
      borderRadius: 5,
      width: "70%",
      alignItems: "center",
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#AAAAAA",
      flexDirection: "row",
      elevation: 2,
    },
    buttonStart: {
      backgroundColor: "#41669C",
      padding: 10,
      borderRadius: 5,
      width: "70%",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#AAAAAA",
      flexDirection: "row",
      elevation: 2,
    },
    icon: {
      width: 40,
      height: 40,
      // borderWidth:1,
    },
    buttonText: {
      flex: 1,
      fontSize: 20,
      fontWeight: "bold",
      // borderWidth: 1,
      marginEnd: 30,
      textAlign: "center",
    },
  });