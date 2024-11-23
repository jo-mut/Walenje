import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../theme';
import IconView from './IconView';

type ButtonProps = {
    children?: any
    theme?: string
    label?: string;
    onPress?: any;
    style?: any;
    size?: any;
    type?: string;
    icon?: any;
}


const buttonType = (type?: string, size?: string) => {
    const common = {
        alignItems: 'center',
        paddingVertical: Spacing.space_15,
        paddingHorizontal: Spacing.space_15,
        borderRadius: (type == 'rounded') ? Size(size) : BorderRadius.radius_15,

    }
    switch (type) {
        case 'rounded':
            return {
                width: Size(size) * 2,
                height: Size(size) * 2,
                borderRadius: Size(size),
                backgroundColor: Colors.primaryGreyHex
            };
        case 'secondary':
            return [
                { backgroundColor: Colors.primaryDarkGreyHex },
                common
            ];
        case 'primary':
            return [
                { backgroundColor: Colors.primaryOrangeHex, },
                common
            ];
        default:
            return [
                { backgroundColor: Colors.primaryOrangeHex, },
                common
            ];
    }

}

const Button: React.FunctionComponent<ButtonProps> = ({
    children,
    size,
    type,
    label,
    onPress,
    style
}) => {
    const { buttonStyles } = styles(type, style);
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <View
                    style={[buttonStyles.Container, buttonType(type, size), style]}>
                    {(type == 'rounded') ? (
                        <>{children}</>
                    ) : (
                        <Text
                            style={buttonStyles.Label}>
                            {label}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
            {(type == 'rounded') ? (
                <Text
                    style={
                        [buttonStyles.Label,
                        { marginTop: Spacing.space_10 }]}>
                    {label}
                </Text>
            ) : (
                <></>
            )}
        </View>
    )
}

const styles: any = () => {
    const buttonStyles = StyleSheet.create({
        Container: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        Label: {
            color: Colors.primaryWhiteHex,
            fontFamily: FontFamily.poppins_bold,
            fontSize: FontSize.size_16,
            textAlign: 'center'
        },
    })

    return { buttonStyles };
}

export default Button