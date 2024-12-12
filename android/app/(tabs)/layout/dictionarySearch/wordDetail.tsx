import React from "react";
import { Modal, Text, TouchableOpacity, View, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import { WordDictionary } from "../../data";

interface WordDetailModalProps {
  wordData: WordDictionary;
  visible: boolean;
  onClose: () => void;
}

const WordDetailModal: React.FC<WordDetailModalProps> = ({ wordData, visible, onClose }) => {
  const formatMean = (text: string) => {
    // Remove leading and trailing slashes and replace remaining slashes with newlines
    return text
      .replace(/^\/\/|\/\/$/g, '') // Remove leading and trailing '//'
      .split('//') // Split by remaining '//'
      .map(sentence => sentence.trim()) // Trim whitespace from each sentence
      .filter(sentence => sentence.length > 0) // Filter out empty sentences
      .map(sentence => `- ${sentence.charAt(0).toUpperCase() + sentence.slice(1)}`) // Capitalize first letter
      .join('\n'); // Join sentences with newline characters
  };
  const formattedMean = formatMean(wordData.mean);

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{wordData.word}</Text>
                <Text style={styles.pronunciation}>{wordData.pronun}</Text>
                <Text style={styles.wordType}>{wordData.type}</Text>
                <Text style={styles.meaning}>{formattedMean}</Text>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Nền tối hơn để tạo sự nổi bật
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%", // Giới hạn chiều cao tối đa của modal
    backgroundColor: "#ffffff", // Nền trắng
    borderRadius: 20,
    padding: 30,
    elevation: 10,
  },
  scrollContainer: {
    flexGrow: 1, // Để ScrollView có thể mở rộng
    justifyContent: 'flex-start', // Căn trên nội dung
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333", // Màu chữ tối hơn
    marginBottom: 10,
    textAlign: 'center', // Căn giữa tiêu đề
  },
  wordType: {
    fontSize: 20,
    color: "#666", // Màu chữ xám nhạt
    marginBottom: 10,
    textAlign: 'center', // Căn giữa loại từ
  },
  meaning: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'left', // Căn trái nội dung
    lineHeight: 28, // Tăng khoảng cách giữa các dòng
    color: "#444", // Màu chữ cho nghĩa từ
  },
  pronunciation: {
    fontSize: 20,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: 'center', // Căn giữa nội dung
    color: "#007BFF", // Màu xanh cho phần phát âm
  },
});

export default WordDetailModal;
