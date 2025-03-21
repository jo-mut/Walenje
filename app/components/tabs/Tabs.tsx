import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme';

import Tab from './Tab';

interface TabsProp {
    tabs: any[];
}

const Tabs: React.FC<TabsProp> = ({
    tabs
}) => {
    return (
        <View className='flex'>
            <View className='flex flex-row gap-3'>
                {tabs}
            </View>
        </View>
    )
}




export default Tabs
