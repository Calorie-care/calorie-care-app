import { Link, useRouter } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

import { Activity, MessageSquare, UserRound, UsersRound } from '@/lib/icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Screen() {
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const handleAcceptTerms = async () => {
    try {
      await AsyncStorage.setItem('termsAccepted', 'true')
      router.replace('/(auth)')
    } catch (error) {
      console.error('Failed to save terms accepted', error)
    }
  }

  useEffect(() => {
    try {
      const checkTermsAccepted = async () => {
        const accepted = await AsyncStorage.getItem('termsAccepted')

        // if (accepted === 'true') {
        //   // router.replace('/(drawer)/home')
        // } else {
        setIsLoading(false)
        // }
      }

      checkTermsAccepted()
    } catch (error) {
      console.error('Failed to check terms accepted', error)
    }
  }, [router])

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    )
  }

  return (
    <View className="flex-1 justify-center items-center gap-5 py-10 bg-background px-6">
      <SafeAreaView>
        <View className="flex-1 justify-between gap-4">
          <View className="ios:pt-8 pt-12">
            <Text className="ios:text-left ios:font-black text-center text-3xl text-foreground font-bold">
              Bem-vindo ao
            </Text>
            <Text className="ios:text-left ios:font-black text-primary text-2xl text-center font-bold">
              CalorieCare
            </Text>
          </View>
          <View className="gap-8">
            {FEATURES.map(feature => (
              <View key={feature.title} className="flex-row gap-4">
                <View className="pt-px">{feature.icon}</View>
                <View className="flex-1">
                  <Text className="font-bold text-lg text-foreground">
                    {feature.title}
                  </Text>
                  <Text className="text-muted-foreground">
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View className="gap-4">
            <Button onPress={handleAcceptTerms}>
              <Text>Continuar</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const FEATURES = [
  {
    title: 'Personalização completa',
    description:
      'Desenvolvemos dietas sob medida, levando em conta suas metas e rotinas.',
    icon: <UserRound className="text-primary" size={38} />,
  },
  {
    title: 'Tecnologia inteligente',
    description:
      'Nossa IA analisa suas necessidades e ajusta o plano para garantir resultados.',
    icon: <MessageSquare className="text-primary" size={38} />,
  },
  {
    title: 'Saúde em primeiro lugar',
    description:
      'Suas preferências alimentares, restrições e objetivos são respeitados.',
    icon: <Activity className="text-primary" size={38} />,
  },
] as const
