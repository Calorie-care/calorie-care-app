import { View, Image, type TextInput, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import React, { useEffect, useRef, useState } from 'react'

import background from '@/assets/bg-complete-your-account.png'

import { RadioButtonInput } from '@/components/RadioButtonInput'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const profileSchema = z.object({
  full_name: z.string().min(1, { message: 'Digite o seu nome completo' }),
  birthdate: z
    .string()
    .min(1, 'A data de nascimento é obrigatória')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: 'Data inválida. Use o formato DD/MM/AAAA',
    })
    .refine(
      date => {
        const [day, month, year] = date.split('/').map(Number)

        // Valida se a data é válida
        const isValidDate = !Number.isNaN(
          new Date(year, month - 1, day).getTime()
        )
        if (!isValidDate) return false

        // Valida se a data é anterior ou igual à data atual
        const inputDate = new Date(year, month - 1, day)
        const today = new Date()
        return inputDate <= today
      },
      { message: 'Data inválida' }
    ),
  gender: z.string().min(1, { message: 'Selecione seu gênero' }),
})

type FormData = z.infer<typeof profileSchema>

export default function CompleteYourAccount() {
  const { user, isLoaded } = useUser()

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const birthdateRef = useRef<TextInput>(null)

  const { control, handleSubmit, setError, setValue } = useForm<FormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: user?.fullName || '',
      birthdate: '',
      gender: '',
    },
  })

  const handleUpdateProfile = async (data: FormData) => {
    const { full_name, birthdate, gender } = data

    try {
      setIsLoading(true)

      await user?.update({
        firstName: full_name.split(' ')[0],
        lastName: full_name.split(' ')[1],
        unsafeMetadata: {
          gender,
          birthdate,
          onboarding_completed: true,
        },
      })

      await user?.reload()

      return router.push('/(tabs)')
    } catch (error) {
      console.error(error)

      return setError('full_name', { message: 'Ocorreu um erro' })
    } finally {
      setIsLoading(false)
    }
  }

  const applyDateMask = (text: string) => {
    const cleanText = text.replace(/\D/g, '')
    const day = cleanText.slice(0, 2)
    const month = cleanText.slice(2, 4)
    const year = cleanText.slice(4, 8)

    return [day, month, year].filter(Boolean).join('/')
  }

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    if (!user) {
      return
    }
  }, [isLoaded, user])

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="flex-grow bg-background"
      extraHeight={100}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="flex-1 px-8 py-16 justify-center gap-4 bg-background">
          <View className="gap-4">
            <Text className="text-2xl font-medium">Complete sua conta</Text>
            <Text className="text-muted-foreground text-lg leading-tight">
              Informe seus dados para personalizar sua experiência
            </Text>
          </View>

          <View className="items-center justify-center">
            <Image className="h-56 w-56" source={background} />
          </View>

          <View>
            <Input
              control={control}
              name="full_name"
              label="Nome completo *"
              placeholder="Seu nome completo"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => birthdateRef.current?.focus()}
            />

            <Input
              control={control}
              name="birthdate"
              label="Data de nascimento *"
              placeholder="DD/MM/AAAA"
              onChangeText={text => {
                const maskedText = applyDateMask(text)
                setValue('birthdate', maskedText)
              }}
              keyboardType="numeric"
              ref={birthdateRef}
              returnKeyType="done"
            />

            <RadioButtonInput
              control={control}
              label="Gênero *"
              required
              name="gender"
              options={[
                { label: 'Masculino', value: 'male' },
                { label: 'Feminino', value: 'female' },
                { label: 'Outro', value: 'other' },
              ]}
            />
          </View>

          <View className="mt-8">
            <Button
              onPress={handleSubmit(handleUpdateProfile)}
              isLoading={isLoading}
            >
              <Text>Finalizar</Text>
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAwareScrollView>
  )
}
