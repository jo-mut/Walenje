import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import _ from 'lodash';
import { BORDERRADIUS, COLORS, SPACING } from '../theme/theme';

type ConfirmBoxProps = {
    mnemonics: string[];
}


const ConfirmBox: React.FunctionComponent<ConfirmBoxProps> = ({ mnemonics }) => {
    const [selectable, setSelectable] = useState<string[]>([...mnemonics]);
    const [selected, setSelected] = useState<string[]>([]);

    const isValidSequence = () => {
        return _.isEqual(mnemonics, selected)
    }

    const onPressMnemonic = (mnemonic: string, isSelected: boolean) => {
        console.log('selected ', mnemonic)
        if (isSelected) {
            setSelectable(selectable.filter(m => m !== mnemonic));
            setSelected([...selected, mnemonic]);
        } else {
            setSelectable([...selectable, mnemonic]);
            setSelected(selected.filter(m => m !== mnemonic));
        }
    }

    const renderMnemonic = (mnemonic: string, index: number, selected: boolean) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    onPressMnemonic(mnemonic, true)
                }}>
                <View style={styles.Mnemonic}>
                    <Text style={styles.text}>{mnemonic}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderSelected = () => {
        return (
            <View style={styles.Mnemonics}>
                {selected.map((mnemonic, index) => renderMnemonic(mnemonic, index, false))}
            </View>
        )
    }

    const renderSelectable = () => {
        return (
            <View style={styles.Mnemonics}>
                {selectable.length > 0 ? (
                    <Text style={styles.InfoTextDescription}>
                        Select each word in the order it was presented to you
                    </Text>
                ) : (
                    <></>
                )
                }
                {selectable.map((mnemonic, index) =>
                    renderMnemonic(mnemonic, index, true)
                )}
            </View>
        )
    }

    return (
        <View style={styles.Container}>
            {renderSelected()}
            {renderSelectable()}
        </View>
    )
}

export default ConfirmBox

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        marginTop: SPACING.space_36,
    },
    Mnemonics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: SPACING.space_30,
        borderColor: COLORS.primaryGreyHex,
        borderRadius: SPACING.space_16,
        borderWidth: 1,
    },
    Mnemonic: {
        backgroundColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_10,
        padding: 4,
        marginVertical: 4,
        marginHorizontal: 8
    },
    text: {
        color: COLORS.primaryWhiteHex,
    },
    ConfirmContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_20,
        minHeight: 100,
        width: '100%'
    },
    InfoTextDescription: {
        marginVertical: SPACING.space_10,
        color: COLORS.secondaryLightGreyHex,
        fontSize: SPACING.space_15,
        textAlign: 'center'
    },
});