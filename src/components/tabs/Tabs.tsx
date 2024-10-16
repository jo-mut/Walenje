import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, SIZE } from '../../theme/theme';
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
        color: COLORS.primaryWhiteHex,
    }
})

export default Tabs
