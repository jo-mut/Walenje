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
    const firstInitial = "Jom".charAt(0).toUpperCase();
    const secondInitial = "Kelo".charAt(0).toUpperCase();
    const fullInitials = firstInitial + secondInitial;


    return (
        <View
            style={{ paddingTop: top + 10 }}
            className='flex flex-row bg-black justify-between px-5'>
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
                    initials={fullInitials}
                    profileColor={Colors.primaryOrangeHex} />}
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