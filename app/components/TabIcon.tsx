import { StyleSheet, Text, Image, View } from 'react-native'
import React from 'react'

const TabIcon = ({ icon, focused }: {icon: any, focused:boolean}) => {
    return (
        <View className={`flex flex-row justify-center items-center 
        rounded-full ${focused ? `bg-general-300` : ''}`}>
            <View className={`rounded-full justify-center items-center w-12 h-12 ${focused ? 'bg-general-400' : ''}`}>
                <Image
                    source={icon}
                    tintColor='white'
                    resizeMode='contain'
                    className='w-7 h-7'>
                </Image>
            </View>
        </View>
    )
}

export default TabIcon

const styles = StyleSheet.create({})