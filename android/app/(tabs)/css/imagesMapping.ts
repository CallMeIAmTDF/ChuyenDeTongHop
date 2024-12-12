// utils/imageMapping.ts
import rewardBear from "../../../assets/images/png/rewardBear.png";
import rewardPen from "../../../assets/images/png/rewardPen.png";
import rewardBook from "../../../assets/images/png/rewardBook.png";
import rewardGift from "../../../assets/images/png/rewardGift.png";

const images: { [key: string]: any } = {
    "Gấu bông": rewardBear,
    "Bút thiên long": rewardPen,
    "Vở thiên long": rewardBook,
    "Hộp quà": rewardGift,
};

export const getImageByName = (name: string) => images[name] || null;
