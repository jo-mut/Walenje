import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    Camera,
    useCameraDevice,
    useCodeScanner,
} from "react-native-vision-camera";
import { router } from 'expo-router';

const Scanner = (props: any) => {
    const [hasPermission, setHasPermissions] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const device = useCameraDevice('back');
    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes: any) => {
            console.log(`onCodeScanned`, codes);
            console.log(`onCodeScanned value`, codes[0].value);
            const value: string = codes[0].value.substring(codes[0].value.indexOf(":") + 1)
            props.onRead(value);
        },
    });

    useEffect(() => {
        // exception case
        setRefresh(!refresh);
    }, [device, hasPermission]);

    useEffect(() => {
        const requestCameraPermission = async () => {
            const permission = await Camera.requestCameraPermission();
            console.log("Camera.requestCameraPermission ", permission);
            setHasPermissions(permission === "granted");
        }

        requestCameraPermission();

        setTimeout(() => {
            props.onRead(null);
        }, 15 * 1000);
    }, []);

    if (!device || !hasPermission) {
        return (
            <View className='flex-1'>
                <Text className='text-white'>
                    Camera not available or not permitted
                </Text>
            </View>
        )
    }

    return (
        <View className='flex-1'>
            <Camera
                codeScanner={codeScanner}
                style={{ flex: 1 }}
                device={device}
                isActive={true} />
        </View>
    )
}

export default Scanner

const styles = StyleSheet.create({})