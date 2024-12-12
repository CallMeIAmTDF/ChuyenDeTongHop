import HomeRewardScreen from '@/app/(tabs)/layout/homeRewardLayout';
import InfoRewardScreen from '@/app/(tabs)/layout/infoRewardLayout';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RewardLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='homerewards'
                component={HomeRewardScreen}
            />
            <Stack.Screen
                name='inforewards'
                component={InfoRewardScreen}
            />
        </Stack.Navigator>
    )
}

export default RewardLayout;