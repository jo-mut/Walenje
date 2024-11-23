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
        <View style={styles.TabsContainer}>
            
        </View>
    )
}


const styles = StyleSheet.create({
    TabsContainer: {
        flexDirection: 'row'
    },
    Title: {
        color: Colors.primaryWhiteHex,
    }
})

export default Tabs
