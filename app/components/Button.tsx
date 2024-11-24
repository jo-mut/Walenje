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
}

const Button: React.FunctionComponent<ButtonProps> = ({
    children,
    label,
    onPress,
    bgVariant,
    isBold,
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
        ${getBackground(bgVariant)}`}>
            <TouchableOpacity onPress={onPress}>
                <View className='justify-center items-center p-3'>
                    {children}
                    <Text className={`mt-2 text-white ${isBold && 'font-[600]'}`}>
                        {label}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default Button