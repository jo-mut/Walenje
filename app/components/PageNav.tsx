import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../theme';
import IconView from './IconView'

interface PageNavProps {
    title?: string
    left?: any,
    right?: any,
    onPress?: any,
}

const PageNav: React.FC<PageNavProps> = ({
    left,
    right,
    title,
    onPress
}) => {
    return (
        <View style={styles.Container}>
            <TouchableOpacity
                onPress={onPress}>
                <IconView
                    iconType="MaterialCommunityIcons"
                    iconName={left}
                    size={24}
                    color="#fff"
                />
            </TouchableOpacity>
            <Text
                style={styles.Title}>
                {title}
            </Text>
            <TouchableOpacity
                onPress={() => ({})}>
                <IconView
                    iconType="MaterialCommunityIcons"
                    iconName={right}
                    size={24}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    )
}

export default PageNav

const styles = StyleSheet.create({
    Container: {
        marginHorizontal: Spacing.space_20,
        paddingVertical: Spacing.space_10,
        flexDirection: 'row',
        backgroundColor: Colors.primaryBlackRGBA,
        justifyContent: 'space-between',
    },
    Title: {
        color: Colors.primaryWhiteHex,
        fontSize: FontSize.size_20,
        fontWeight: '600',
        textAlign: 'center'
    }
})