import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, View, Dimensions } from 'react-native'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

import { AppleIcon, FacebookIcon, GoogleIcon, Utensils } from '@/lib/icons'

import background from '@/assets/bg-sign-in.png'

import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const googleOAuth = useOAuth({ strategy: 'oauth_google' })
  const facebookOAuth = useOAuth({ strategy: 'oauth_facebook' })
  const appleOAuth = useOAuth({ strategy: 'oauth_apple' })

  async function handleOAuthSignIn(
    oAuthProvider: OAuthProvider,
    providerName: string
  ): Promise<void> {
    try {
      setIsLoading(true)

      const redirectUrl = Linking.createURL('/(drawer)/home')

      const oAuthFlow = await oAuthProvider.startOAuthFlow({ redirectUrl })

      if (oAuthFlow.authSessionResult?.type === 'success') {
        if (oAuthFlow.setActive) {
          if (oAuthFlow.createdSessionId) {
            await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
          } else {
            throw new Error('Session ID is undefined')
          }
        }
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(`Failed to sign in with ${providerName}`, error)
    }
  }

  const onGoogleSignIn = () => handleOAuthSignIn(googleOAuth, 'Google')
  const onFacebookSignIn = () => handleOAuthSignIn(facebookOAuth, 'Facebook')
  const onAppleSignIn = () => handleOAuthSignIn(appleOAuth, 'Apple')

  useEffect(() => {
    WebBrowser.warmUpAsync()
    return () => {
      WebBrowser.coolDownAsync()
    }
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    )
  }

  return (
    <View className="flex-1 py-20 px-8 bg-background">
      <View className="items-center gap-4">
        <Utensils className="text-primary" size={44} />
        <Text className="text-xl font-semibold">CalorieCare</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <Image className="h-80 w-80" source={background} />
      </View>

      <View className="gap-3">
        <Button
          variant="outline"
          className="border-red-500"
          onPress={onGoogleSignIn}
        >
          <GoogleIcon size={20} className="text-red-500" />
          <Text className="text-red-500 text-lg">Continue com o Google</Text>
        </Button>

        <View className="flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1 border-blue-500"
            onPress={onFacebookSignIn}
          >
            <FacebookIcon size={20} className="text-blue-500" />
            <Text className="text-blue-500 text-lg">Facebook</Text>
          </Button>

          <Button
            variant="outline"
            className="flex-1 border-gray-400"
            onPress={onAppleSignIn}
          >
            <AppleIcon size={20} className="text-gray-400" />
            <Text className="text-gray-400 text-lg">Apple</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

interface OAuthProvider {
  startOAuthFlow: (options: {
    redirectUrl: string
  }) => Promise<OAuthFlowResult>
}

interface OAuthFlowResult {
  authSessionResult?: { type: string }
  setActive?: (options: { session: string }) => Promise<void>
  createdSessionId?: string
}
