import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

import { AppleIcon, FacebookIcon, GoogleIcon, Utensils } from '@/lib/icons'

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
    <View className="flex-1 justify-center bg-background">
      <View className="px-6">
        <View className="items-center gap-2 mb-10">
          <View className="bg-green-500 p-4 rounded-full mb-4 shadow-lg">
            <Utensils className="text-white" size={48} />
          </View>

          <Text className="text-3xl font-semibold">CalorieCare</Text>

          <Text className="text-muted-foreground text-center">
            Seu companheiro de nutrição inteligente
          </Text>
        </View>

        <Text className="text-center mb-4">Continuar com:</Text>

        <View className="flex-row justify-between gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-white"
            onPress={onGoogleSignIn}
          >
            <GoogleIcon size={20} className="text-muted-secondary" />
            <Text className="text-muted-secondary">Google</Text>
          </Button>

          <Button
            variant="outline"
            className="flex-1 bg-blue-500"
            onPress={onFacebookSignIn}
          >
            <FacebookIcon size={20} className="text-white" />
            <Text className="text-white">Facebook</Text>
          </Button>

          <Button
            variant="outline"
            className="flex-1 bg-primary-foreground"
            onPress={onAppleSignIn}
          >
            <AppleIcon size={20} className="text-foreground" />
            <Text className="text-foreground">Apple</Text>
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
