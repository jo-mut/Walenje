import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./TabNavigation";
import { CreateWallet } from "../screens/setups/CreateWallet";
import { CreateMnemonic } from "../screens/setups/CreateMnemonic";
import { ConfirmMnemonic } from "../screens/setups/ConfirmMnemonic";



export type RootStackParamList = {
    Tabs: undefined;
    Settings: undefined;
    CreateWallet: undefined;
    CreateMnemonic: undefined;
    ConfirmMnemonic: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationRoot = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="CreateWallet" screenOptions={{ headerShown: false }}>
                <Stack.Screen name='CreateMnemonic' component={CreateMnemonic}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='CreateWallet' component={CreateWallet}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                    <Stack.Screen name='ConfirmMnemonic' component={ConfirmMnemonic}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='Tabs' component={TabNavigator}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationRoot;