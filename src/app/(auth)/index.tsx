import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'

import { Text } from '@/components/ui/text'

import { Utensils } from '@/lib/icons'

import background from '@/assets/bg-sign-in.png'

import * as WebBrowser from 'expo-web-browser'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SocialLoginButton } from '@/components/SocialLoginButton'

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
  useWarmUpBrowser()

  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 pt-24 px-8 bg-background">
      <View className="items-center gap-2">
        <Utensils className="text-primary" size={56} />
        <Text className="text-xl font-semibold">CalorieCare</Text>
        <Text className="text-muted-foreground">Seu aliado na nutrição</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <Image className="h-48 w-48" source={background} />
      </View>

      <View className="gap-3 py-8">
        <SocialLoginButton strategy="facebook" />
        <SocialLoginButton strategy="google" />
        <SocialLoginButton strategy="apple" />
      </View>
      <View className="py-4">
        <Text className="pt-1 text-center text-foreground">
          Ao continuar, você concorda com nossos{' '}
          <Link href="/">
            <Text className="text-muted-foreground">termos de serviço</Text>
          </Link>{' '}
          e{' '}
          <Link href="/">
            <Text className="text-muted-foreground">
              políticas de privacidade.
            </Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  )
}
