import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Wallet as WalletUtils } from '../../utils'


export const CreateMnemonic: React.FunctionComponent = ({ navigation }: any) => {
  const [seedphrase, setSeedPhrase] = useState<string[]>([]);

  const navigateToConfirmSeedphrase = () => {
    navigation.navigate('ConfirmMnemonic')
  }

  const renderMnemonic = () => {
    console.log("veewee seedphrase ", seedphrase)
    return (
      <View style={styles.message}>
        {seedphrase.map((phrase, index) => (
          <View style={styles.message} key={index}>
            <Text>{phrase}</Text>
          </View>
        ))}
      </View>
    )
  }

  const revealMnemonic = () => {
    const mnemonics = WalletUtils.generateMnemonics();
    console.log("veewee seedphrase ", mnemonics)
    if (mnemonics) {
      setSeedPhrase(mnemonics.phrase.split(' '));
    }
  }

  const renderSeedPhrase = () => {
    return (
      <View>
        {seedphrase ? (
          <View>
            <TouchableOpacity onPress={revealMnemonic}>
              <Text>Reveal SeedPhrase</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {renderMnemonic()}
          </View>
        )}
      </View>
    )
  }

  useEffect(() => {
    revealMnemonic();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text>Save carefully your sequence of mnemonics:</Text>
        <View>
          <TouchableOpacity style={styles.buttonsContainer} onPress={() => navigateToConfirmSeedphrase()}>
            <Text>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
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
  message: {
    color: 'grey',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 32
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