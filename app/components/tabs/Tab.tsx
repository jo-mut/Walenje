import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../../theme';

interface TabProp {
    color?: string,
    background?: string,
    label: string;
    onPress: any;
    style?: any;
    isActive?: boolean
}

const Tab: React.FC<TabProp> = ({
    color = "text-white",
    label,
    onPress,
    style,
    isActive
}) => {
    return (
        <TouchableOpacity
            className={`${style} text-center items-center`}
            onPress={onPress}>
            <Text className={`text-lg ${isActive ? "text-orange-500" : color}`}>{label}</Text>
            {isActive && <View className='p-[2] w-[20] flex-1 bg-orange-500 mt-1' />}
        </TouchableOpacity>
    )
}


export default Tab
