import GameScreen from '@/app/(tabs)/layout/game/homeGame';
import RankSceen from '@/app/(tabs)/layout/game/rank';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GamePlayScreen from '@/app/(tabs)/layout/game/gamePlay';

const GameLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='homegames'
                component={GameScreen}
            />
            <Stack.Screen
                name='gameplay'
                component={GamePlayScreen}
            />
            <Stack.Screen
                name='ranks'
                component={RankSceen}
            />
        </Stack.Navigator>
    )
}

export default GameLayout;