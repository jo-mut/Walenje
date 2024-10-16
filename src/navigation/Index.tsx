import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./TabNavigation";
import { CreateWallet } from "../screens/setup/CreateWallet";
import { CreateMnemonic } from "../screens/setup/CreateMnemonic";
import { ConfirmMnemonic } from "../screens/setup/ConfirmMnemonic";
import { ImportWallet } from "../screens/setup/ImportWallet";
import { Wallet } from "../screens/wallet/Wallet";
import { Send } from "../screens/wallet/send/Send";
import Receive from "../screens/wallet/receive/Receive";
import Swaps from "../screens/wallet/swaps/Swaps";



export type RootStackParamList = {
    Tabs: undefined;
    Settings: undefined;
    CreateWallet: undefined;
    CreateMnemonic: undefined;
    ConfirmMnemonic: undefined;
    ImportWallet: undefined;
    Wallet: undefined;
    Send: undefined;
    Receive: undefined;
    Swaps: undefined;
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
                <Stack.Screen name='ImportWallet' component={ImportWallet}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='Wallet' component={Wallet}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='Send' component={Send}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='Receive' component={Receive}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='Swaps' component={Swaps}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
                <Stack.Screen name='Tabs' component={TabNavigator}
                    options={{ animation: 'slide_from_bottom' }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationRoot;