import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import _ from 'lodash';
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../theme';

type ConfirmBoxProps = {
    phrase: string[];
}


const ConfirmBox: React.FunctionComponent<ConfirmBoxProps> = ({ phrase }) => {
    const [selectable, setSelectable] = useState<string[]>([...phrase]);
    const [selected, setSelected] = useState<string[]>([]);

    const isValidSequence = () => {
        return _.isEqual(phrase, selected)
    }

    const onPressMnemonic = (mnemonic: string, isSelected: boolean) => {
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
            <>
                {selected.length > 0 &&
                    <View style={styles.Mnemonics}>
                        {selected.map((mnemonic, index) => renderMnemonic(mnemonic, index, false))}
                    </View>
                }
            </>
        )
    }

    const renderSelectable = () => {
        return (
            <>
                {selectable.length > 0 ? (
                    <View style={styles.Mnemonics}>
                        <Text style={styles.InfoTextDescription}>
                            Select each word in the order it was presented to you
                        </Text>
                        {selectable.map((mnemonic, index) =>
                            renderMnemonic(mnemonic, index, true)
                        )}
                    </View>
                ) : (
                    <></>
                )}
            </>

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
        marginTop: Spacing.space_36,
    },
    Mnemonics: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginTop: Spacing.space_30,
        borderColor: Colors.primaryGreyHex,
        borderRadius: Spacing.space_16,
        borderWidth: 1,
    },
    Mnemonic: {
        backgroundColor: Colors.secondaryDarkGreyHex,
        borderRadius: Spacing.space_10,
        paddingVertical: Spacing.space_4,
        paddingHorizontal: Spacing.space_15,
        marginVertical: 4,
        marginHorizontal: 8
    },
    text: {
        color: Colors.primaryWhiteHex,
    },
    ConfirmContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: Spacing.space_20,
        borderRadius: BorderRadius.radius_20,
        minHeight: 100,
        width: '100%'
    },
    InfoTextDescription: {
        marginVertical: Spacing.space_10,
        color: Colors.secondaryLightGreyHex,
        fontSize: Spacing.space_15,
        textAlign: 'center'
    },
});