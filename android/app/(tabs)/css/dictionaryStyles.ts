import { StyleSheet } from "react-native";

export const dictionaryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Nền sáng nhẹ nhàng
  },
  header: {
    height: 65,
    backgroundColor: "#459DE4", // Màu xanh dương tươi sáng
    justifyContent: "center",
    alignItems: "center",
  },
  text_header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff", // Màu trắng cho tiêu đề
  },
  body: {
    flex: 1,
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF', // Màu xanh dương tương tự header
    borderRadius: 10,
    backgroundColor: '#ffffff', // Nền trắng cho ô tìm kiếm
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 20,
    // shadowColor: "#000", // Thêm bóng cho ô tìm kiếm
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333", // Màu chữ đen đậm
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    color: "#888888",
    textAlign: 'center',
    marginTop: 20,
  },
  itemWord: {
    backgroundColor: "#ffffff", // Nền trắng sáng
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2, // Thêm bóng nhẹ cho item
  },
  wordPronunContainer: {
    flexDirection: "row", // Hiển thị từ và cách phát âm trên cùng một hàng
    // justifyContent: "", // Tạo khoảng cách giữa từ và cách phát âm
    gap: 10,
    alignItems: 'center', // Căn giữa theo chiều dọc
  },
  wordText: {
    fontSize: 22, // Tăng kích thước chữ cho từ vựng
    fontWeight: '600',
    color: "#007BFF", // Màu xanh để làm nổi bật từ vựng
  },
  meaningText: {
    fontSize: 16,
    color: "#333333", // Màu chữ xám cho nghĩa
    marginTop: 5, // Thêm khoảng cách trên nghĩa để tách biệt với từ và cách phát âm
  },
  exampleText: {
    fontSize: 14,
    color: "#6c757d", // Màu xám nhạt cho ví dụ
    fontStyle: 'italic',
  },
});
