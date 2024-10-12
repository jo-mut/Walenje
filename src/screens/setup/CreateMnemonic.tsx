import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Wallet as WalletUtils } from '../../utils'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../theme/theme';
import Button from '../../components/Button';


export const CreateMnemonic: React.FunctionComponent = ({ navigation }: any) => {
  const [seedphrase, setSeedPhrase] = useState<string[]>([]);

  const navigateToConfirmSeedphrase = () => {
    navigation.navigate('ConfirmMnemonic', { mnemonic: seedphrase })
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
              <Text style={styles.Phrase}>{index + ". " + item}</Text>
            </View>
          }
        />
      </View>
    )
  }

  const revealMnemonic = () => {
    const mnemonics = WalletUtils.generateMnemonics();
    if (mnemonics) {
      setSeedPhrase(mnemonics.phrase.split(' '));
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
            backgroundColor={COLORS.primaryOrangeHex}
            color={COLORS.primaryWhiteHex}
            label='Continue'
            style={{
              padding: SPACING.space_16,
              radius: BORDERRADIUS.radius_20,
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
    paddingHorizontal: SPACING.space_30
  },
  InfoContainer: {
    alignContent: 'center'
  },
  InfoTextTitle: {
    color: COLORS.primaryOrangeHex,
    fontSize: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    textAlign: 'center',
    fontWeight: '600'
  },
  InfoTextDescription: {
    marginTop: SPACING.space_10,
    color: COLORS.secondaryLightGreyHex,
    fontSize: SPACING.space_15,
    textAlign: 'center'
  },
  FlatListWrapperStyle: {
    flex: 1,
    gap: SPACING.space_10,
  },
  SeedPhraseContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: SPACING.space_30,
    borderColor: COLORS.primaryGreyHex,
    borderRadius: SPACING.space_16,
    borderWidth: 1,
  },
  PhraseContainer: {
    flex: 1 / 2,
    marginTop: SPACING.space_10,
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: SPACING.space_12,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_8,
  },
  Phrase: {
    textAlign: 'center',
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
    marginLeft: SPACING.space_4,
    marginHorizontal: SPACING.space_30
  }, 
  ButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});