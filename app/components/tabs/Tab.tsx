import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../../theme';

interface TabProp {
    label: string;
    onPress: any;
    size?: string;
    style?: any;
    isActive?: boolean
}

const Tab: React.FC<TabProp> = ({
    label,
    onPress,
    size,
    style,
    isActive
}) => {
    const props = { size, isActive }
    const { tabStyles } = styles(props)
    return (
        <View style={[tabStyles.TabContainer, style]}>
            <TouchableOpacity
                onPress={onPress}>
                    <Text style={tabStyles.Title}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = (props: any) => {
    const tabStyles = StyleSheet.create({
        TabContainer: {
            backgroundColor: props.isActive? Colors.primaryOrangeHex : Colors.primaryGreyHex,
            borderRadius: BorderRadius.radius_10,
            paddingHorizontal: Spacing.space_20,
            paddingVertical: Spacing.space_10,
        },
        Title: {
            color: Colors.primaryWhiteHex,
        }
    })

    return { tabStyles }
}

export default Tab
