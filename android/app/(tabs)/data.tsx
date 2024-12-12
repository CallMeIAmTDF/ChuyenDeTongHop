// Định nghĩa interface cho thông tin người dùng
export interface Role {
    id: number;
    name: string;
}

//Api Usr
export interface ApiUser {
    code: number;
    message: string;
    data: User;
}
export interface User {
    id: string;
    email: string;
    name: string;
    gender: string;
    address: string;
    dob: string;
    role: Role;
    mobile_number: string | null;
    updated_at: string | null;
    created_at: string;
    no_password: boolean;
    image: string;
}

// Lưu thông tin người dùng vào trạng thái toàn cục
let userInfo: User | null = null;

export const setInfoApi = (data: User) => {
    userInfo = data;
};

// Hàm lấy thông tin người dùng
export const getUserInfo = (): User | null => {
    return userInfo;
};


///////////////////userGoogle
// data.ts
// Định nghĩa interface cho thông tin người dùng
export interface UserGoogle {
    id: string;
    email: string;
    given_name: string;
    name: string;
    picture: string;
    verified_email: boolean;
}

// Lưu thông tin người dùng vào trạng thái toàn cục
let userGoogle: UserGoogle | null = null;

export const setInfoGoogle = (data: UserGoogle) => {
    userGoogle = data;
};

// Hàm lấy thông tin người dùng
export const getInfoGoogle = (): UserGoogle | null => {
    return userGoogle;
};


//ham dang xuat
let funLogout: () => void | null;

export const setLogout = (fun: () => void) => {
    funLogout = fun;
};

export const getLogout = () => {
    return funLogout();
};

//Api Levels
export interface ApiLevels {
    code: number;
    message: string;
    data: Levels[];
}
export interface Levels {
    lid: number,
    lname: string,
    limage: string,
    numTopics: number,
    numWord: number,
    progress: number,
};
export let levels: Levels[] | null;
export const setLevels = (data: Levels[]) => {
    levels = data;
}
export const getLevels = (): Levels[] | null => {
    return levels;
}

//api topic
export interface ApiTopics {
    code: number;
    message: string;
    data: Topics[];
}
export interface Topics {
    tid: number,
    tname: string,
    numWords: number,
    progress: number
};
export let topics: Topics[] | null;
export const setTopics = (data: Topics[]) => {
    topics = data;
}
export const getTopics = (): Topics[] | null => {
    return topics;
}

//token
export let tokenAutor: string;
export const setTokenAuthor = (data: string) => {
    tokenAutor = data;
}
export const getTokenAuthor = () => {
    return tokenAutor;
}

//api ques
export interface ApiQuestions {
    code: number;
    message: string;
    data: Questions;
}
export interface Questions {
    wid: number,
    question: string,
    answers: [
        string
    ]
};
export let questions: Questions | null;
export const setQuestions = (data: Questions) => {
    questions = data;
}
export const getQuestions = (): Questions | null => {
    return questions;
}

//api answer
export interface ApiAnswer {
    code: number;
    message: string;
    data: Answers;
}
export interface Answers {
    wid: number,
    word: string,
    pronun: string,
    entype: string,
    vietype: string,
    voice: string,
    photo: string,
    meaning: string,
    endesc: string,
    viedesc: string,
};
export let answer: Answers | null;
export const setAnswer = (data: Answers) => {
    answer = data;
}
export const getAnswer = (): Answers | null => {
    return answer;
}

//tid
export let tidApi: number | null;
export const setTidApi = (data: number) => {
    tidApi = data;
}
export const getTidApi = (): number | null => {
    return tidApi;
}

//chuyen sang trang listLevel
let funToLevel: () => void | null;

export const setToLevel = (fun: () => void) => {
    funToLevel = fun;
};

export const getToLevel = () => {
    return funToLevel();
};
//Api test
export interface ApiTests {
    code: number;
    message: string;
    data?: Questions[];
}

export let tests: Questions[];
export const setTests = (data: Questions[]) => {
    tests = data;
}
export const getTests = (): Questions[] => {
    return tests;
}


import { Audio } from 'expo-av';
//ip dong
import Constants from 'expo-constants';

export const getServerIpAddress = () => {
    let ip;
    if (__DEV__) {
        const debuggerHost = Constants.manifest2?.extra?.expoGo?.debuggerHost;
        ip = debuggerHost?.split(':')[0]; // Lấy phần IP từ '192.168.x.x:8081'
    }
    return ip;
};

//forget pass
export interface ApiForget {
    code: number;
    message: string;
}

let eQues: boolean;
export const setEQues = (fun: boolean) => {
    eQues = fun;
}
export const getEQues = () => {
    return eQues
}

//ham xoá token khi dădng xuất
let out: () => void;
export const setOut = (fun: () => void) => {
    out = fun;
}
export const getOut = () => {
    return out();
}

//api result
export interface TestDetail {
    wid: number;              // ID của câu hỏi
    question: string;         // Nội dung câu hỏi
    userAnswer: string;       // Câu trả lời của người dùng
    systemAnswer: string;     // Đáp án hệ thống
    correct: boolean;         // Kết quả đúng/sai
}

export interface TestData {
    numQues: number;          // Số lượng câu hỏi
    testDetail: TestDetail[]; // Chi tiết bài kiểm tra
    numCorrectques: number;   // Số lượng câu đúng
    numForget: number,
    numNewWord: number
}

export interface ApiResult {
    code: number;             // Mã trạng thái
    message: string;          // Thông báo
    data: TestData;           // Dữ liệu trả về
}

let resultTest: ApiResult | null;
export const setResultTest = (data: ApiResult | null) => {
    resultTest = data;
}
export const getResultTest = () => {
    return resultTest;
}

//History Exams
export interface Historyexams {
    thid: number;
    uid: number;
    numques: string;
    numcorrectques: number;
    tdate: string;
}
export interface ApiHistoryexams {
    code: number;
    message: string;
    data: Historyexams[];
}

//Dictionary
export interface WordDictionary {
    word: string;
    type: string;
    mean: string;
    pronun: string;
}
export interface ApiWordDictionary {
    code: number;
    message: string;
    data: WordDictionary[];
}
let tname: string;
export const setTname = (data: string) => {
    tname = data;
}

export const getTname = () => {
    return tname
}

let lname: string;
export const setLname = (data: string) => {
    tname = data;
}

export const getLname = () => {
    return tname
}

export const playSound = async (link: string) => {
    if (link) {
        const text = link.split("https");
        // Phần văn bản trước URL
        // Phần URL
        const url = "https" + text[1].trim();
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: url }
            );
            await sound.playAsync();

            // Giải phóng tài nguyên sau khi âm thanh phát xong
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync(); // Giải phóng tài nguyên sau khi phát xong
                }
            });
        } catch (error) {
            console.error('Lỗi khi phát âm thanh:', error);
        }
    }
};

let closeChat: () => void;
export const setCloseChat = (fun: () => void) => {
    closeChat = fun;
}
export const getCloseChat = () => {
    return closeChat;
};