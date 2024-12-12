type RootStackParamList = {
    signIn: undefined;
    signUp: undefined;
    forgetPassword: undefined;
    userInfo: undefined;
    historyExams: { historyData: Historyexams[] } | undefined;
    historyRewards: undefined;
    homerewards: undefined;
    inforewards: { name: string; image: string; price: number | undefined};
    homegames: undefined;
    guides: undefined;
    ranks: undefined;
    gameplay: undefined;
    myTabs: undefined;
    distionary: undefined;
    wordDetail:{ wordData: WordDictionary[] } | undefined;
};
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
declare module "*.png"