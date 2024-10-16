import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SIZE, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
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
        paddingVertical: SPACING.space_15,
        paddingHorizontal: SPACING.space_15,
        borderRadius: (type == 'rounded') ? SIZE(size) : BORDERRADIUS.radius_15,

    }
    switch (type) {
        case 'rounded':
            return {
                width: SIZE(size) * 2,
                height: SIZE(size) * 2,
                borderRadius: SIZE(size),
                backgroundColor: COLORS.primaryGreyHex
            };
        case 'secondary':
            return [
                { backgroundColor: COLORS.primaryDarkGreyHex },
                common
            ];
        case 'primary':
            return [
                { backgroundColor: COLORS.primaryOrangeHex, },
                common
            ];
        default:
            return [
                { backgroundColor: COLORS.primaryOrangeHex, },
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
                        { marginTop: SPACING.space_10 }]}>
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
            color: COLORS.primaryWhiteHex,
            fontFamily: FONTFAMILY.poppins_bold,
            fontSize: FONTSIZE.size_16,
            textAlign: 'center'
        },
    })

    return { buttonStyles };
}

export default Button