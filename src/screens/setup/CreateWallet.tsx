import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Index';
import Button from '../../components/Button';
import { BORDERRADIUS, COLORS, SPACING } from '../../theme/theme';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'CreateWallet'>;
};


export const CreateWallet: React.FC<Props> = ({ navigation }: any) => {

    const onNavigateToCreateMnemonics = () => {
        navigation.navigate('CreateMnemonic', { name: 'CreateMnemonic' });
    }

    const onNavigateImportWallet = () => {
        navigation.navigate('ImportWallet', { name: 'ImportWallet' });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{flex: 1}}>

                </View>
                <View>
                    <Button
                        backgroundColor={COLORS.primaryGreyHex}
                        color={COLORS.primaryWhiteHex}
                        label='Import using seed phrase'
                        style={{
                            padding: SPACING.space_16,
                            radius: 20,
                        }}
                        onPress={() => onNavigateImportWallet()}>
                    </Button>
                </View>

                <View style={styles.CreateWalletContainer}>
                    <Button
                        backgroundColor={COLORS.primaryOrangeHex}
                        color={COLORS.primaryWhiteHex}
                        label='Create new wallet'
                        style={{
                            padding: SPACING.space_16,
                            radius: BORDERRADIUS.radius_20,
                        }}
                        onPress={() => onNavigateToCreateMnemonics()}>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'stretch',
        flex: 1,
        padding: 20
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },

    CreateWalletContainer: {
        marginTop: SPACING.space_20,
    }
});