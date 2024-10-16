import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, SIZE, SPACING } from '../../theme/theme';

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
            backgroundColor: props.isActive? COLORS.primaryOrangeHex : COLORS.primaryGreyHex,
            borderRadius: BORDERRADIUS.radius_10,
            paddingHorizontal: SPACING.space_20,
            paddingVertical: SPACING.space_10,
        },
        Title: {
            color: COLORS.primaryWhiteHex,
        }
    })

    return { tabStyles }
}

export default Tab
