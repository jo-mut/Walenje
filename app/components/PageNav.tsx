import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../theme';
import IconView from './IconView'
import { Avatar } from './Avatar';
import { router } from 'expo-router';

interface PageNavProps {
    title?: string
    back?: boolean
    avatar?: boolean
    close?: boolean
}

const PageNav: React.FC<PageNavProps> = ({
    back,
    close,
    avatar,
    title,
}) => {

    const navigateToScan = () => {
        router.push('/scan')
    }

    const profile = () => {
        return (
            <Avatar
                firstName='John'
                lastName='Johns'
                profileColor={Colors.primaryOrangeHex} />
        )
    }

    const settings = (onPress: any) => {
        return (
            <TouchableOpacity
                onPress={onPress}>
                <IconView
                    iconType="MaterialCommunityIcons"
                    iconName={'dots-vertical'}
                    size={24}
                    color="#fff"
                />
            </TouchableOpacity>
        )
    }

    const scan = () => {
        return (
            <TouchableOpacity
                onPress={navigateToScan}>
                <IconView
                    iconType="MaterialCommunityIcons"
                    iconName='scan-helper'
                    size={24}
                    color="#fff"
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.Container}>
            {profile()}
            <Text
                style={styles.Title}>
                {title}
            </Text>
            {scan()}
        </View>
    )
}

export default PageNav

const styles = StyleSheet.create({
    Container: {
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