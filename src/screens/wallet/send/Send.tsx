import { Image, SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, SIZE, SPACING } from '../../../theme/theme';
import PageNav from '../../../components/PageNav';
import IconView from '../../../components/IconView';
import Button from '../../../components/Button';


export const Send: React.FC = ({ navigation, route }: any) => {
    const styles = sendStyles();
    const fromAccount: any = route.params.fromAccount.address;
    console.log("from account ", fromAccount)
    const [toAccountAddress, setToAccountAddress] = useState('');

    const navigateToEnterAmount = () => {

    }

    const resetTextInput = () => {
        setToAccountAddress('')
    }

    return (
        <SafeAreaView style={styles.Container}>
            <PageNav
                left='close'
                title='Send'
                onPress={{}} />
            <View style={styles.InnerContainer}>
                <View style={styles.FromContainer}>
                    <Text
                        style={styles.FromAccount}>
                        From
                    </Text>
                    <View style={styles.AccountFromContainer}>
                        <Text
                            numberOfLines={1}
                            style={styles.AccountName}>
                            {fromAccount}
                        </Text>
                        <TouchableOpacity
                            style={styles.AccountOptions}
                            onPress={() => ('')}>
                            <IconView
                                iconName='chevron-down'
                                color={COLORS.primaryWhiteHex}
                                iconType='MaterialCommunityIcons'
                                size={SIZE('medium')}>
                            </IconView>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.AccountToContainer}>
                    <Text style={styles.ToAccount}>To</Text>
                    <View style={styles.TextInputContainer}>
                        <TextInput
                            placeholder='Enter account address'
                            value={toAccountAddress}
                            onChangeText={text => (
                                setToAccountAddress(text)
                            )}
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            style={styles.TextInputContainer} />
                        <TouchableOpacity
                            onPress={resetTextInput}>
                            <IconView
                                iconName={toAccountAddress ? 'close' : 'scan-helper'}
                                color={COLORS.primaryWhiteHex}
                                iconType='MaterialCommunityIcons'
                                size={SIZE('medium')}>
                            </IconView>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.ButtonContainer}>
                <Button
                    label='Next'
                    style={{
                        backgroundColor: COLORS.primaryOrangeHex,
                        padding: SPACING.space_16,
                        radius: BORDERRADIUS.radius_20,
                        marginHorizontal: SPACING.space_20
                    }}
                    onPress={() => navigateToEnterAmount()}>
                </Button>
            </View>
        </SafeAreaView>
    )

}

const sendStyles = () => {
    return StyleSheet.create({
        Container: {
            backgroundColor: 'black',
            flex: 1,
        },
        InnerContainer: {
            paddingHorizontal: SPACING.space_10
        },
        AccountFromContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: SPACING.space_10,
            marginTop: SPACING.space_4,
            borderRadius: SPACING.space_15,
        },
        AccountName: {
            paddingVertical: SPACING.space_15,
            color: COLORS.secondaryLightGreyHex,
            fontWeight: '400',
            width: '80%',
            alignItems: 'baseline',
            marginRight: SPACING.space_10,
        },
        AccountToContainer: {
            marginTop: SPACING.space_15,
            backgroundColor: COLORS.primaryGreyHex,
            borderRadius: SPACING.space_15,
            padding: SPACING.space_10
        },
        AccountOptions: {
            padding: SPACING.space_10,
        },
        FromContainer: {
            marginTop: SPACING.space_20,
            backgroundColor: COLORS.primaryGreyHex,
            borderRadius: SPACING.space_15,
        },
        FromAccount: {
            color: COLORS.primaryWhiteHex,
            fontWeight: '600',
            marginTop: SPACING.space_10,
            marginLeft: SPACING.space_10,
            fontFamily: FONTFAMILY.poppins_semibold,
        },
        ToAccount: {
            color: COLORS.primaryWhiteHex,
            fontWeight: '600',
            fontFamily: FONTFAMILY.poppins_semibold,
        },
        TextInput: {
            padding: SPACING.space_10,
            color: COLORS.primaryWhiteHex,
            marginRight: SPACING.space_10
        },
        TextInputContainer: {
            color: COLORS.primaryWhiteHex,
            paddingVertical: SPACING.space_10,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        ButtonContainer: {
            flex: 1,
            justifyContent: 'flex-end'
        }
    })
}