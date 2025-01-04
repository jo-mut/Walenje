import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BorderRadius, Size, Colors, FontFamily, FontSize, Spacing } from '../theme';
import IconView from './IconView'
import { Avatar } from './Avatar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from './icons';

interface PageNavProps {
    title?: string
    back?: boolean
    avatar?: boolean
    close?: boolean
    scan?: boolean
    settings?: boolean
}

const PageNav: React.FC<PageNavProps> = ({
    back,
    close,
    avatar,
    title,
    scan,
    settings
}) => {

    const { top } = useSafeAreaInsets();


    return (
        <View
            style={{ paddingTop: top }}
            className='flex flex-row bg-primaryBlackRGBA justify-between mx-5'>
            {back &&
                <TouchableOpacity
                    onPress={() => router.back()}>
                    <IconView
                        icon={Icons.leftArrow}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>}
            {avatar &&
                <Avatar
                    firstName='John'
                    lastName='Johns'
                    profileColor={Colors.primaryOrangeHex} />}
            <Text
                className='text-primaryWhiteHex font-xl font-semibold text-center'>
                {title}
            </Text>
            {scan &&
                <TouchableOpacity
                    onPress={() => router.push('/scan')}>
                    <IconView
                        iconType="MaterialCommunityIcons"
                        iconName='scan-helper'
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>}
            {settings &&
                <TouchableOpacity
                    onPress={() => router.push('/settings')}>
                    <IconView
                        iconType="MaterialCommunityIcons"
                        iconName={'dots-vertical'}
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>}
        </View>


    )
}

export default PageNav