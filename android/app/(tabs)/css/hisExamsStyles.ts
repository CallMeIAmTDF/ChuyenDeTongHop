import { StyleSheet } from "react-native";

export const hisExamsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
    },
    header: {
        backgroundColor: "white",
        paddingBottom: 25,
        borderBottomColor: "#E0E0E0",
    },
    text_header: {
        fontSize: 25,
        color: "#4C4A54",
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 20,
    },
    itemHistory: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15,
        marginHorizontal: 40,
        borderRadius: 10,
        backgroundColor: "#A3EFA5",
        elevation: 5,
    },
    circleOverlay: {
        width: 40,
        height: 40,
        borderRadius: 30,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",

        elevation: 5,
    },
    percentageText: {
        position: "absolute",
        color: "black",
        fontSize: 14,
        fontWeight: "500",
    },
    infoHistory: {
        paddingStart: 15,
        color: "#4C4A59",
        fontSize: 16,
        fontWeight: "500",
        flexShrink: 1,
    },
});
