import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONTFAMILY, FONTSIZE } from '../theme/theme';

type ButtonProps = {
    backgroundColor: string;
    color: string;
    label: string;
    onPress: any;
    style: any;
    size?: number
}

const Button: React.FunctionComponent<ButtonProps> = ({
    backgroundColor,
    color,
    label,
    onPress,
    style
}) => {
    const { buttonStyles } = styles(backgroundColor, color, style);
    return (
        <View style={buttonStyles.Container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={buttonStyles.Label}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button

const styles: any = (backgroundColor: string, color: string, style: any) => {
    const buttonStyles = StyleSheet.create({
        Container: {
            backgroundColor: backgroundColor,
            padding: style.padding,
            borderRadius: style.radius,
            alignContent: 'center',
            justifyContent: 'center',
        },

        Label: {
            color: color,
            fontFamily: FONTFAMILY.poppins_bold,
            fontSize: FONTSIZE.size_16,
            textAlign: 'center'
        },
    })

    return { buttonStyles };
}
