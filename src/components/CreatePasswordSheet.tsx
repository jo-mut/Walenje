import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'


type Props = {
    setVisible: (isVisible: boolean) => void;
    onContinue: (password: string) => Promise<void>;
};

const CreatePasswordSheet: React.FC<Props> = (
    {
        setVisible,
        onContinue,
    }) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [password, confirmPassword]);

    const onCreateWallet = () => {
        if (password !== confirmPassword) {
            setErrorMessage("The entered passwords don't match");
            return;
        }
        onContinue(password);
    }


    return (
        <View>
            <View>
                <Text>Set Password</Text>
                <Text>
                    Set a strong password allowing you to login easily to your wallet from
                    this device. We don't send and store the password anywhere except this
                    device.
                </Text>
            </View>
            <View style={styles.sectionContainer}>
                <TextInput
                    placeholder="Type a strong password"
                    value={password}
                    secureTextEntry
                    autoFocus
                />
                <TextInput
                    value={confirmPassword}
                    placeholder="Type the password again"
                    secureTextEntry
                />
            </View>
            <View style={styles.sectionContainer}>
                <TouchableOpacity onPress={onCreateWallet}>
                    Create wallet
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setVisible(false)}>
                    Cancel
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreatePasswordSheet


const styles = StyleSheet.create({
    sectionContainer: {
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
    },

    description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#474E68',
    },
});