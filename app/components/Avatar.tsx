import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export const Avatar = ({ initials, profileColor, profileImage }
    : {
        initials: string,
        profileColor: string,
        profileImage?: any
    }) => {
    return (
        <View className={`w-9 h-9 rounded-full`}>
            {profileImage ?
                <Image
                    source={profileImage}
                    resizeMode='contain'
                    className='w-8 h-8 rounded-full' />
                :
                <View className={`w-9 h-9 rounded-full  
                items-center justify-center`} style={{ backgroundColor: profileColor }}>
                    <Text className='text-white text-lg'>{initials}</Text>
                </View>

            }
        </View>
    )
}


