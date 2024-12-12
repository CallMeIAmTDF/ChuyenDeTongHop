import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { guideStyles } from "../../css/guideStyles";

interface GuideModalProps {
  visible: boolean;
  onClose: () => void;
}

const GuideScreen: React.FC<GuideModalProps> = ({ visible, onClose }) => {
  // Tạo animation fadeIn và fadeOut
  const fadeAnim = new Animated.Value(0); // 0 là trạng thái ban đầu (ẩn hoàn toàn)

  // Hàm bắt đầu animation khi modal hiển thị
  const startAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Mục tiêu là làm modal xuất hiện
      duration: 300, // Thời gian hiệu ứng
      easing: Easing.ease, // Tạo hiệu ứng mượt mà
      useNativeDriver: true,
    }).start();
  };

  // Hàm dừng animation khi modal đóng
  const endAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Mục tiêu là làm modal biến mất
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  // Khi modalVisible thay đổi, kích hoạt animation
  React.useEffect(() => {
    if (visible) {
      startAnimation();
    } else {
      endAnimation();
    }
  }, [visible]);

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={guideStyles.modalContainer}>
        <Animated.View style={[guideStyles.modalContent, { opacity: fadeAnim }]}>
          <Text style={guideStyles.modalTitle}>LUẬT CHƠI</Text>
          <Text style={guideStyles.modalText}>
            Khi nhấn bắt đầu, hai người chơi sẽ được ghép đôi với nhau. Khi ghép
            đôi hoàn tất, màn hình sẽ hiện ra "1 từ tiếng anh và 8 từ tiếng việt".
            Nhiệm vụ của bạn là chọn chính xác ô có nghĩa của từ tiếng anh. Có
            tổng cộng 15 câu hỏi, nếu chọn đúng, bạn sẽ được 1 điểm, nếu sai,
            đối thủ của bạn sẽ được điểm. Hãy chú ý tốc độ và độ chính xác.
          </Text>
          <TouchableOpacity style={guideStyles.confirmButton} onPress={onClose}>
            <Text style={guideStyles.confirmButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền bán trong suốt
//   },
//   modalContent: {
//     width: "80%",
//     height: "60%",
//     backgroundColor: "#fff",
//     borderRadius: 15,
//     padding: 30,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#333",
//   },
//   modalText: {
//     fontSize: 20, // Tăng kích thước font cho văn bản
//     color: "#333",
//     fontWeight: "500",
//     textAlign: "justify",
//     marginBottom: 30, // Tăng khoảng cách giữa văn bản và nút
//   },
//   confirmButton: {
//     backgroundColor: "#4A90E2",
//     padding: 15,
//     borderRadius: 10, // Tăng độ bo góc nút
//     width: "80%", // Tăng chiều rộng nút
//     alignItems: "center",
//   },
//   confirmButtonText: {
//     color: "#fff",
//     fontSize: 18, // Tăng kích thước chữ nút
//   },
// });

export default GuideScreen;
