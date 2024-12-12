
import DictionaryScreen from '@/app/(tabs)/layout/dictionarySearch/dictionary';
import WordDetailScreen from '@/app/(tabs)/layout/dictionarySearch/wordDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const DictionaryLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='distionary'
                component={DictionaryScreen}
            />
            {/* <Stack.Screen
                name='wordDetail'
                component={WordDetailScreen}
            /> */}
        </Stack.Navigator>
    )
}

export default DictionaryLayout;