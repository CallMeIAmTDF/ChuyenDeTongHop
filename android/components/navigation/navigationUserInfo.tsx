import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserInfoScreen from '@/app/(tabs)/layout/userInfo';
import HistoryExamLayout from '@/app/(tabs)/layout/historyExams';
import HistoryRewardLayout from '@/app/(tabs)/layout/historyRewards';
import SignInLayout from '@/app/(tabs)/layout/signInLayout';


const UserInfoLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='userInfo'
                component={UserInfoScreen}
            />
            <Stack.Screen
                name="historyExams"
                component={HistoryExamLayout}
            />
            <Stack.Screen
                name="historyRewards"
                component={HistoryRewardLayout}
            />
            <Stack.Screen
                name="signIn"
                component={SignInLayout}
            />
        </Stack.Navigator>
    )
}

export default UserInfoLayout;