import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'

import { Header } from '@/components/Header'
import { Text } from '@/components/ui/text'

import { useUser } from '@clerk/clerk-expo'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MealCard } from '@/components/MealCard'
import { Button } from '@/components/ui/button'
import { router } from 'expo-router'

export default function Resume() {
  const { user } = useUser()

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : ''

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <Header
        title="Sua dieta"
        label={
          <TouchableOpacity onPress={() => null}>
            <Text className="text-secondary font-medium">Compartilhar</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-background"
      >
        <View className="px-8 py-4 gap-4">
          <Card className="p-2">
            <View className="flex-1 flex-row gap-4 items-center">
              {user?.hasImage ? (
                <Avatar alt="Avatar">
                  <AvatarImage source={{ uri: user?.imageUrl }} />
                </Avatar>
              ) : (
                <Avatar alt="Avatar">
                  <AvatarFallback>
                    <Text className="text-2xl">{firstLetter}</Text>
                  </AvatarFallback>
                </Avatar>
              )}
              <View>
                <Text className="text-lg">{user?.fullName}</Text>
                <Text className="text-lg">Objetivo: Emagrecimento</Text>
              </View>
            </View>
          </Card>

          <MealCard
            meal="☕  Café da manhã"
            protein="14G"
            fats="8G"
            carbs="12G"
            items={['2 fatias de pão integral', '2 ovos mexidos', '1 banana']}
          />
          <MealCard
            meal="🍽️  Almoço"
            protein="20G"
            fats="30G"
            carbs="32G"
            items={[
              '150g de frango grelhado',
              '1 xícara de arroz',
              'Salada verde à vontade',
            ]}
          />
          <MealCard
            meal="🥞  Jantar"
            protein="21G"
            fats="17G"
            carbs="22G"
            items={[
              '1 batata doce cozida',
              '150g de peixe assado',
              '1 xícara de arroz integral',
            ]}
          />

          <Button variant="secondary" onPress={() => router.replace('/(tabs)')}>
            <Text>Voltar</Text>
          </Button>
        </View>
        <Text className="text-center font-light text-xs mb-4">
          Altere sua dieta conforme a sua necessidade
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
