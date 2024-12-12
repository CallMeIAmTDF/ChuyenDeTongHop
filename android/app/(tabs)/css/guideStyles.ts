import { StyleSheet } from "react-native";

export const guideStyles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền bán trong suốt
    },
    modalContent: {
      width: "80%",
      height: "60%",
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
      color: "#333",
    },
    modalText: {
      fontSize: 20, // Tăng kích thước font cho văn bản
      color: "#333",
      fontWeight: "500",
      textAlign: "justify",
      marginBottom: 30, // Tăng khoảng cách giữa văn bản và nút
    },
    confirmButton: {
      backgroundColor: "#4A90E2",
      padding: 15,
      borderRadius: 10, // Tăng độ bo góc nút
      width: "80%", // Tăng chiều rộng nút
      alignItems: "center",
    },
    confirmButtonText: {
      color: "#fff",
      fontSize: 18, // Tăng kích thước chữ nút
    },
  });
  