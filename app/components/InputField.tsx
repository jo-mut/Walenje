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
                <View
                    className={`flex flex-row justify-start items-center 
                    relative rounded-2xl focus:border-cyan-500 ${containerStyle}`}>
                    {icon && <Image className='w-6 h-6 ml-4'
                        source={icon} />}
                    <TextInput
                        className={`${inputStyle} text-[15px] flex-1 text-left text-white placeholder-gray-500`}
                        secureTextEntry={secureTextEntry}
                        {...props} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default InputField

const styles = StyleSheet.create({})