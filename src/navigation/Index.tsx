import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./TabNavigation";
import Settings from "../screens/settings/Settings";
import AccountRecovery from "../screens/setup/RecoverWallet";
import { CreateWallet } from "../screens/setup/CreateWallet";


export type RootStackParamList = {
    Tabs: undefined;
    Settings: undefined;
    CreateWallet: undefined;
    RecoverWallet: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationRoot = () => {

    return (
        <NavigationContainer>
            <Stack.Screen name='CreateWallet' component={CreateWallet}
                options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
            <Stack.Screen name='RecoverWallet' component={AccountRecovery}
                options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
            <Stack.Navigator initialRouteName="CreateWallet" screenOptions={{ headerShown: false }}>
                <Stack.Screen name='CreateWallet' component={CreateWallet}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='Tabs' component={TabNavigator}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
            </Stack.Navigator>
            <Stack.Screen name='Settings' component={Settings}
                options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
        </NavigationContainer>
    );
};

export default NavigationRoot;