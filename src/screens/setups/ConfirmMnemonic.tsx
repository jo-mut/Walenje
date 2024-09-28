import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


const navigateToLandingPage = (navigation: any) => {
    navigation.navigate('Home');
}

export const ConfirmMnemonic: React.FC = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.contentContainer}>

                </View>
                <TouchableOpacity style={styles.buttonsContainer} onPress={() => navigateToLandingPage(navigation)}>
                    <Text>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
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
    },
    contentContainer: {
        flex: 1,
    },
    buttonsContainer: {
        alignItems: 'center',
        color: 'black',
        padding: 20,
        backgroundColor: '#949494',
        borderRadius: 20,
        justifyContent: 'space-between'
    }
});