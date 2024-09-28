import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


export const EmptyTemplate: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flex: 1,
        padding: 20
    }
});