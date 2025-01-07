import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../theme';
import IconView from './IconView';

type ButtonProps = {
    children?: any
    label?: string;
    onPress?: any;
    bgVariant?: string
    isBold?: boolean
    style?: string;
}

const Button: React.FunctionComponent<ButtonProps> = ({
    children,
    label,
    onPress,
    bgVariant,
    isBold,
    style
}) => {

    const getBackground = (variant?: string) => {
        switch (variant) {
            case 'outline':
                return ''
            case 'gray':
                return 'bg-primaryGreyHex'
            case 'primary':
                return 'bg-primaryOrangeHex'    
        }
        return ''
    }

    return (
        <View className={`rounded-2xl p-2 items-center justify-center 
        ${getBackground(bgVariant)} ${style}`}>
            <TouchableOpacity onPress={onPress}>
                <View className='flex-row justify-center gap-2 items-center px-5'>
                    {children && children}
                    <Text className={`text-white ${isBold && 'font-[600]'}`}>
                        {label}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default Button