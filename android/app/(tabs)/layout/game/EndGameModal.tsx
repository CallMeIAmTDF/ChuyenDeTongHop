import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Dimensions,
} from "react-native";
import img_gamelose from "../../../../assets/images/png/game/gamelose.png";
import img_gamewin from "../../../../assets/images/png/game/gamewin.png";
import img_cup from "../../../../assets/images/png/game/cup_icon.png";
import { captureRef } from 'react-native-view-shot';
import RNFS from "react-native-fs";
import Share from "react-native-share";
interface EndGameModalProps {
    visible: boolean;
    score: number[];
    onQuit: () => void;
    img1: string | undefined,
    img2: string | undefined,
}
const { width, height } = Dimensions.get('window');

const EndGameModal: React.FC<EndGameModalProps> = ({ visible, score, onQuit, img1, img2 }) => {

    const handleQuit = () => {
        onQuit();
    };
    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={styles.container}>
                {/* header  */}
                <View style={styles.header}>
                    <Image source={score[0] > score[1] ? img_gamewin : img_gamelose} style={styles.imgendgame} />
                    <View style={styles.pluspoint}>
                        <Image source={img_cup} style={styles.imgcup} />
                        <Text style={styles.point}> {score[0] > score[1] ? '+' : ''}{3 * (score[0] - score[1])}</Text>
                    </View>
                </View>

                {/* body  */}
                <View style={styles.body}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.circle}>
                            <Image source={img1 ? { uri: img1 } : require('../../../../assets/images/png/rewardBear.png')} style={styles.avatar} />
                        </View>
                        <View style={styles.centerContainer}>
                            <Text style={styles.scoreTitle}>SCORE</Text>
                            <Text style={styles.scoreValue}>
                                {score[0]} - {score[1]}
                            </Text>
                        </View>
                        <View style={styles.circle}>
                            <Image source={img2 ? { uri: img2 } : require('../../../../assets/images/png/rewardBear.png')} style={styles.avatar} />
                        </View>
                    </View>
                </View>

                {/* footer  */}
                <View style={styles.footer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.quitButton]}
                            onPress={handleQuit}
                        >
                            <Text style={styles.buttonTextQuit}>Quit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: "92.3%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        // borderWidth: 1,
        // borderColor: "red",
        bottom: 0,
    },
    header: {
        height: height * 26.82 / 100,
        backgroundColor: "#8AD0E7",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
    },
    imgendgame: {
        height: height * 19.16 / 100,
        width: width * 38.17 / 100,
        marginTop: 30,
    },
    pluspoint: {
        flex: 1,
        flexDirection: "row",
        marginLeft: width * 76.34 / 100,
        alignItems: "center",
        marginBottom: 10,
    },
    imgcup: {
        height: height * 3.83 / 100,
        width: width * 7.63 / 100,
    },
    point: {
        color: "#A19116",
        fontSize: 17,
        fontWeight: "bold",
    },
    body: {
        // borderWidth: 1,
        height: height * 44.7 / 100,
    },
    scoreContainer: {
        // borderWidth: 1,
        // flex: 1,
        marginHorizontal: width * 17.8 / 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#695F5F",
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 4,
        marginTop: height * 28.1 / 100,
    },
    circle: {
        width: width * 17.8 / 100,
        height: height * 8.94 / 100,
        borderRadius: 35,
        backgroundColor: "#D9D9D9",
    },
    centerContainer: {
        flex: 1,
        alignItems: "center",
    },
    scoreTitle: {
        fontSize: 14,
        color: "#FFFFFF",
        fontWeight: "600",
    },
    scoreValue: {
        fontSize: 20,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    avatar: {
        width: width * 17.8 / 100,
        height: height * 8.94 / 100,
        borderRadius: 35,
    },
    footer: {
        flex: 1,
        backgroundColor: "#8AD0E7",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        height: height * 7.66 / 100,
        width: width * 40.53 / 100,
        paddingVertical: height * 2 / 100,
        paddingHorizontal: width * 3.05 / 100,
        borderRadius: 5,
        marginHorizontal: width * 5.05 / 100,
        alignItems: "center",
        justifyContent: "center",
    },
    shareButton: {
        backgroundColor: "#FFFF",
    },
    quitButton: {
        backgroundColor: "#41669C",
    },
    buttonTextShare: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    },
    buttonTextQuit: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EndGameModal;