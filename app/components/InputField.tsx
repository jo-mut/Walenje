import {
    Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet,
    Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native'
import React from 'react'
import IconView from './IconView'

const InputField = ({
    label,
    labelStyle,
    icon,
    inputStyle,
    secureTextEntry,
    containerStyle,
    expanded,
    ...props
}: InputFieldProps) => {
    console.log({ ...props });
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}>
                <View className='w-full px-3'>
                    {label &&
                        <Text
                            className={`text-lg text-white font-[600] font-JakartaSemiBold ${labelStyle}`}>
                            {label}
                        </Text>}
                    <View
                        className={`flex flex-row justify-start items-center 
                    relative rounded-full focus:border-cyan-500 ${containerStyle}`}>
                        {icon && <Image className='w-6 h-6 ml-4'
                            source={icon} />}
                        <TextInput
                            className={`rounded-full py-4 font-JakartaSemiBold text-[15px] 
                            flex-1 ${inputStyle} text-left text-white placeholder-gray-500`}
                            secureTextEntry={secureTextEntry}
                            {...props} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField

const styles = StyleSheet.create({})