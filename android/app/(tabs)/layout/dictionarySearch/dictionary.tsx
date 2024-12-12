import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { dictionaryStyles } from "../../css/dictionaryStyles";
import { ApiWordDictionary, WordDictionary } from "../../data";
import initializeApiClient from "../../bearerToken";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import WordDetailModal from "./wordDetail";

const DictionaryScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [searchText, setSearchText] = useState("");
  const [words, setWords] = useState<WordDictionary[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState<WordDictionary | null>(null);
  const [searchHistory, setSearchHistory] = useState<WordDictionary[]>([]); // State để lưu lịch sử tìm kiếm
  
  const closeModal = () => setModalVisible(false);
  
  const handleSelectWord = (item: WordDictionary) => {
    // Tìm xem từ đã tồn tại trong lịch sử chưa => nếu chưa trả về -1, nếu rồi trả về dữ liệu
    const existingIndex = searchHistory.findIndex(word => word.word === item.word);

    if (existingIndex !== -1) {
      // If it exists, remove it from its current position
      const updatedHistory = [...searchHistory];
      updatedHistory.splice(existingIndex, 1); // Remove the existing item
      // Update state with the new order
      setSearchHistory([item, ...updatedHistory]); // Add to the top
    } else {
      // If it's a new word, add it to the top of history
      setSearchHistory(prevHistory => [item, ...prevHistory]);
    }

    setSelectedWord(item);
    setModalVisible(true);
  };

  const fetchWords = async (searchText: string) => {
    try {
      const apiInstance = await initializeApiClient();
      const response = await apiInstance.get<ApiWordDictionary>(
        `/words/searchWordInDict?word=${searchText}`
      );
      setWords(response.data.data);
    } catch (e) {
      console.log("Loi!!!", e);
    }
  };

  // Cập nhật khi người dùng nhập từ vào ô tìm kiếm
  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setWords([]); // Nếu ô tìm kiếm trống, xóa danh sách từ
    } else {
      fetchWords(text); // Gọi API với từ tìm kiếm
    }
  };

  const filteredWords = words.filter((word) =>
    word.word.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDismiss = () => {
    setSearchText("");
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (searchText) {
      fetchWords(searchText); // Gọi API mỗi khi searchText thay đổi
    }
  }, [searchText]);
  useEffect(() => {
    console.log("Lich su:", searchHistory);
  }, [searchHistory]);

  return (
    <View style={dictionaryStyles.container}>
      <View style={dictionaryStyles.header}>
        <Text style={dictionaryStyles.text_header}>Tra từ điển</Text>
      </View>
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={dictionaryStyles.body}>
          <View style={dictionaryStyles.searchContainer}>
            <FontAwesome name="search" size={24} color="#fff" />
            <TextInput
              style={dictionaryStyles.searchInput}
              placeholder="Nhập từ cần tìm"
              placeholderTextColor="#a1a1a1"
              value={searchText}
              onChangeText={handleSearch}
              onFocus={() => setSearchText("")}
            />
          </View>
          {searchText === "" ? (
            <FlatList
              data={searchHistory}
              numColumns={1}
              keyExtractor={(item) => item.word}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectWord(item)}>
     <View style={dictionaryStyles.itemWord}>
       <View style={dictionaryStyles.wordPronunContainer}>
         <Text style={dictionaryStyles.wordText}>{item.word}</Text>
         <Text style={dictionaryStyles.exampleText}>{`${item.pronun}`}</Text>
       </View>
       {/* Chỉ hiển thị nghĩa đầu tiên */}
       <Text style={dictionaryStyles.meaningText}>
         {item.mean.split(/\/\/|;/)[1]?.trim() || "Không có nghĩa"}
       </Text>
     </View>
   </TouchableOpacity>
              )}
            />
          ) : filteredWords.length === 0 && searchText ? (
            <Text style={dictionaryStyles.noResultsText}>
              Không tìm thấy kết quả
            </Text>
          ) : (
            <FlatList
              data={filteredWords}
              numColumns={1}
              keyExtractor={(item) => item.word}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectWord(item)}>
     <View style={dictionaryStyles.itemWord}>
       <View style={dictionaryStyles.wordPronunContainer}>
         <Text style={dictionaryStyles.wordText}>{item.word}</Text>
         <Text style={dictionaryStyles.exampleText}>{`${item.pronun}`}</Text>
       </View>
       {/* Chỉ hiển thị nghĩa đầu tiên */}
       <Text style={dictionaryStyles.meaningText}>
         {item.mean.split(/\/\/|;/)[1]?.trim() || "Không có nghĩa"}
       </Text>
     </View>
   </TouchableOpacity>
              )}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
      {selectedWord && (
        <WordDetailModal
          wordData={selectedWord}
          visible={modalVisible}
          onClose={closeModal}
        />
      )}
    </View>
  );
};

export default DictionaryScreen;
