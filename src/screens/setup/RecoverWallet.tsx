import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLoading } from '../../hooks/useLoading';
import { useAccountState } from '../../hooks/useAccountState';
import { useRecoveryWords } from '../../hooks/useRecoveryWords';
import { generatePrivateKey } from '@bitauth/libauth';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PasswordSheet } from '../../components/passwordSheet';
import { WordListSheet } from '../../components/wordListSheet';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Index';


type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RecoverWallet'>;
};

type WordListState = {
  isOpen: boolean;
  activeIndex: number | null;
};

const RECOVERY_WORD_COUNT = 12;

const RecoverWallet: React.FunctionComponent<Props> = ({ navigation }) => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [wordListState, setWordListState] = useState<WordListState>({
    isOpen: false,
    activeIndex: null,
  });

  const { isLoading, withLoading } = useLoading();
  const [wordList, setWordList] = useState<string[]>([]);
  const {loadWallet} = useAccountState();
  const { generateSeed } = useRecoveryWords();

  const onContinue = () => {
    setPasswordModalOpen(true);
  };

  const addWord = async (word: string) => {
    setWordList(list => {
      const newList = [...list];
      if (wordListState.activeIndex !== null) {
        newList[wordListState.activeIndex] = word;
      }

      return newList;
    });
  }

  const onRestoreWallet = (password: string) =>
    withLoading(async () => {
      try {
        const seed: any = await generateSeed(password, wordList);

        if (seed !== undefined) {
          const keys: any = await generatePrivateKey(seed);
          loadWallet(keys);
          setPasswordModalOpen(false);
        }
      } catch (error) {
        console.log('onRestoreWallet#error', (error as Error).message);
      }
    })

  return (
    <SafeAreaView>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.container}>
        <Text style={styles.description}>
          Add your 12-word phrase in the correct order without any spelling
          mistakes! The words need to be in the correct order to restore your
          funds.
        </Text>

        <View style={styles.wordContainer}>
          {new Array(RECOVERY_WORD_COUNT).fill(0).map((_, index) => {
            return (
              <View key={index} style={styles.wordItem}>
                <Input
                  value={wordList[index]}
                  placeholder="Press to add a word!"
                  editable={false}
                  selectTextOnFocus={false}
                  onPressIn={() =>
                    setWordListState({ isOpen: true, activeIndex: index })
                  }
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          disabled={wordList.length < RECOVERY_WORD_COUNT}
          onPress={onContinue}>
          Continue
        </Button>
      </View>

      <WordListSheet
        isVisible={wordListState.isOpen}
        setVisible={() => setWordListState({ isOpen: false, activeIndex: null })}
        onSelect={addWord}
      />

      <PasswordSheet
        isVisible={isPasswordModalOpen}
        isWalletLoading={isLoading}
        setVisible={setPasswordModalOpen}
        onContinue={onRestoreWallet}
      />
    </SafeAreaView>
  )
}

export default RecoverWallet

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#474E68',
  },

  wordContainer: {
    paddingVertical: 12,
    flex: 1,
    gap: 12,
  },

  wordItem: {},
  placeholder: {
    opacity: 0.8,
  },
  wordText: {
    flexGrow: 1,
    fontSize: 16,
  },

  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});