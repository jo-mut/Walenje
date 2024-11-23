import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Wallet as WalletUtils } from '../utils'
import { BorderRadius, Colors, FontFamily, FontSize, Spacing } from '../theme';
import Button from '../components/Button';
import { Redirect, router } from 'expo-router';


export default function GenerateSeedPhrase() {
  const [seedphrase, setSeedPhrase] = useState<string[]>([]);

  const navigateToConfirmSeedphrase = () => {
    return router.push({
      pathname: "/(auth)/confirm-seedphrase",
      params: {  seedphrase: JSON.stringify(seedphrase) }
    });
  }

  const infoContainer = () => {
    return (
      <View style={styles.InfoContainer}>
        <Text style={styles.InfoTextTitle}>
          Write down your seedphrase
        </Text>
        <Text style={styles.InfoTextDescription}>
          This is your seed phrase. Writeit down on a paper and keep it in a
          safe place. You'll be asked to re-enter this phrase (in-order) on
          the next step for confirmation.
        </Text>
      </View>
    )
  }

  const displaySeedPhrase = () => {
    return (
      <View style={styles.SeedPhraseContainer}>
        <FlatList
          data={seedphrase}
          numColumns={2}
          columnWrapperStyle={styles.FlatListWrapperStyle}
          scrollEnabled={false}
          renderItem={({ item, index }) =>
            <View style={styles.PhraseContainer}>
              <Text style={styles.Phrase}>{(index + 1) + ". " + item}</Text>
            </View>
          }
        />
      </View>
    )
  }

  const revealMnemonic = async () => {
    const phrase: any = await WalletUtils.generateMnemonics()
    console.log(phrase.split(' '))
    if (phrase) {
      setSeedPhrase(phrase.split(' '));
    }
  }

  const renderSeedPhrase = () => {
    return (
      <View>
        {seedphrase ? (
          <View>
            {displaySeedPhrase()}
          </View>
        ) : (
          <View>
            <TouchableOpacity onPress={revealMnemonic}>
              <Text>Reveal SeedPhrase</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }

  useEffect(() => {
    revealMnemonic();
  }, [])

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Container}>
        {infoContainer()}
        {renderSeedPhrase()}
        <View style={styles.ButtonContainer}>
          <Button
            label='Continue'
            style={{
              backgroundColor: Colors.primaryOrangeHex,
              padding: Spacing.space_16,
              radius: BorderRadius.radius_20,
            }}
            onPress={() => navigateToConfirmSeedphrase()}>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )

}


const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'black',
    flex: 1,
    paddingHorizontal: Spacing.space_30
  },
  InfoContainer: {
    alignContent: 'center'
  },
  InfoTextTitle: {
    color: Colors.primaryOrangeHex,
    fontSize: Spacing.space_20,
    fontFamily: FontFamily.poppins_semibold,
    textAlign: 'center',
    fontWeight: '600'
  },
  InfoTextDescription: {
    marginTop: Spacing.space_10,
    color: Colors.secondaryLightGreyHex,
    fontSize: Spacing.space_15,
    textAlign: 'center'
  },
  FlatListWrapperStyle: {
    flex: 1,
    gap: Spacing.space_10,
  },
  SeedPhraseContainer: {
    paddingVertical: 20,
    marginTop: Spacing.space_30,
    borderColor: Colors.primaryGreyHex,
  },
  PhraseContainer: {
    flex: 1 / 2,
    marginTop: Spacing.space_10,
    backgroundColor: Colors.primaryGreyHex,
    borderRadius: Spacing.space_12,
    paddingHorizontal: Spacing.space_10,
    paddingVertical: Spacing.space_8,
  },
  Phrase: {
    textAlign: 'center',
    color: Colors.secondaryLightGreyHex,
    fontSize: FontSize.size_14,
    marginLeft: Spacing.space_4,
    marginHorizontal: Spacing.space_30
  },
  ButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});