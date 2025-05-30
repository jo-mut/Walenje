import { Redirect, router } from "expo-router";
import { Token as TokenActions, Wallet as WalletActions, } from '../common/actions'
import { ITokenStore } from "@/interfaces/tokens";
import { useEffect, useState } from "react";
import { Token as TokenService, Wallets } from "@/app/services";
import { inject, observer } from "mobx-react";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView, Text, View } from "react-native";
import Button from "../components/Button";


const Welcome = inject('wallets')(observer(
  ({ wallets }: { wallets: any }) => {

    const handleNavigate = () => {
      if (wallets.currentWallet.address) {
        return router.replace('/(root)/home')
      }

      return router.replace('/(auth)/sign-up')
    }

    return (
      <SafeAreaView className='flex-1 bg-black'>
        <View className='flex-1'>

          <View className='flex-1 justify-end m-5'>
            <Button
              style='p-4'
              label='Continue'
              bgVariant='primary'
              onPress={() => handleNavigate()}>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    )

  }))

export default Welcome