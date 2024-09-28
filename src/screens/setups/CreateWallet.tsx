import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Index';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'CreateWallet'>;
};


export const CreateWallet: React.FC<Props> = ({ navigation }: any) => {

    const onNavigateToCreateMnemonics = () => {
        navigation.navigate('CreateMnemonic', {name: 'CreateMnemonic'});
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <View>
                        <Text style={styles.message}>
                            When creating a new wallet you will receive a sequence of
                            mnemonics which represent your "personal password". Anyone
                            with this sequence may be able to reconfigure your wallet
                            in any new device. Keep it stored as secure as possible. Only
                            you should have access to this information.
                        </Text>
                        <Text style={styles.message}>
                            Write it somewhere safe so you can make sure you won't lose it,
                            or you may lose permanently all your coins. There is no way to
                            recover it later.
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => onNavigateToCreateMnemonics()}>
                        <Text>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        padding: 20
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    message: {
        color: 'grey',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        marginHorizontal: 32
    },
    buttonsContainer: {
        alignItems: 'center',
        color: 'black',
        padding: 20,
        backgroundColor: '#949494',
        borderRadius: 20,
        justifyContent: 'space-between'
    }
});