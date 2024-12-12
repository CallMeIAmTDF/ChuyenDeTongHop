# Hướng Dẫn Sử Dụng Java Spring Boot

## 1. Cài Đặt Môi Trường

### Yêu Cầu:
- **Java Development Kit (JDK 17)**: [Tải và cài đặt JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- **Apache Maven**: [Tải Maven](https://maven.apache.org/download.cgi)
- **IDE khuyên dùng**: [IntelliJ IDEA](https://www.jetbrains.com/idea/)

### Cấu Hình Biến Môi Trường:
1. **JAVA_HOME**:
    - Trỏ đến thư mục cài đặt JDK 17.
    - Ví dụ: `C:\Program Files\Java\jdk-17`
2. **Thêm Maven vào PATH**:
    - Trỏ đến thư mục bin của Maven.
    - Ví dụ: `C:\Program Files\Apache\Maven\bin`

---

## 2. Tải Package

Trong thư mục dự án, chạy lệnh sau để tải các package cần thiết:

```bash
mvn clean install
```

---

## 3. Chạy Dự Án
Chạy ứng dụng với Docker. Dự án sử dụng Docker để chạy Kafka và Redis. Để bắt đầu, bạn cần có Docker và Docker Compose đã được cài đặt.

```bash
docker-compose -f docker-compose-local.yml up -d
```

Sau khi cài đặt, chạy Spring Boot Application bằng lệnh sau:

```bash
mvn spring-boot:run
```

Hoặc chạy trực tiếp từ IDE (IntelliJ IDEA) bằng cách click chuột phải và chọn `Run`, hoặc nút `Run` ở trên thanh tiêu đề.

---

## 4. Cài Đặt API

Dự án Spring Boot sử dụng các API REST. Để test API, bạn có thể dùng:
- **Postman**: [Tải và cài đặt Postman](https://www.postman.com/downloads/)
- **CURL**: Test từ terminal.
- **Swagger UI**: [Truy cập](http://localhost:8080/swagger-ui/index.html#/)
### URL Mặc Định:
- Localhost: `http://localhost:8080`

---

## 5. Build Dự Án

Để build file jar hoặc war, chạy lệnh sau:

```bash
mvn clean package
```

File jar sẽ nằm trong thư mục `target/`. Chạy file jar bằng lệnh sau:

```bash
java -jar target/<tên-file>.jar
```
