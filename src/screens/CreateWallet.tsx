import React, {useState} from 'react';
import { View, Text } from 'react-native';
import {RootStackParams} from '../navigation/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


type Props = {
    navigation: NativeStackNavigationProp<RootStackParams, 'CreateWallet'>;
  };      

  
const CreateWalletScreen: React.FunctionComponent<Props> = ({
    navigation,
  }) => {
   return (
    <View>
        <Text>Create wallet component</Text>
    </View>
   );
  }

export default CreateWalletScreen