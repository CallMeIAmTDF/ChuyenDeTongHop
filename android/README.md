# Hướng Dẫn Sử Dụng Dự Án

## 1. Cài Đặt Môi Trường

Để bắt đầu, bạn cần cài đặt các công cụ và cấu hình môi trường sau đây:

### Yêu Cầu:
- **Node.js**: [Tải và cài đặt Node.js](https://nodejs.org)
- **JDK 17**: [Tải và cài đặt JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- **Android Studio**: [Tải Android Studio](https://developer.android.com/studio)

### Cấu Hình Biến Môi Trường:
1. **JAVA_HOME**:
   - Trỏ đến thư mục cài đặt JDK 17.
   - Ví dụ: `C:\Program Files\Java\jdk-17`
2. **ANDROID_HOME**:
   - Trỏ đến thư mục SDK của Android Studio.
   - Ví dụ: `C:\Users\<Tên Người Dùng>\AppData\Local\Android\Sdk`

Thêm các biến này vào `PATH` để có thể sử dụng chúng từ dòng lệnh.

---

## 2. Tải Package

Trong thư mục dự án, chạy các lệnh sau để cài đặt các package cần thiết:

```bash
npm install
npm install expo
npx expo install expo-dev-client
```

---

## 3. Chạy Dự Án

Sau khi hoàn tất cài đặt môi trường và tải các package, bạn có thể chạy dự án trên thiết bị Android hoặc trình giả lập bằng lệnh sau:

```bash
npx expo run:android
```

### Ghi Chú:
- Đảm bảo thiết bị Android của bạn được kết nối với máy tính hoặc trình giả lập Android đang hoạt động.
- Nếu gặp lỗi, kiểm tra lại cấu hình môi trường và đảm bảo các package đã được cài đặt thành công.
