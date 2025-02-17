import {
  ActivityIndicator,
  ScrollView,
  Share,
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
import { Link, router } from 'expo-router'
import { useDataStorage } from '@/storage/data'
import { createNutrition } from '@/api/create-nutrition'
import { useQuery } from '@tanstack/react-query'

export default function Resume() {
  const { user } = useUser()

  const personalInfos = useDataStorage(state => state.personalInfos)

  const { data, isFetching, error } = useQuery({
    queryKey: ['nutrition'],
    queryFn: () => createNutrition(personalInfos),
  })

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : ''

  async function handleShare() {
    if (data && Object.keys(data).length === 0) return

    const refeicaoEmojis: { [key: string]: string } = {
      'Café da manhã': '🍳',
      'Lanche da manhã': '🥐',
      Almoço: '🍛',
      'Lanche da tarde': '🍪',
      Jantar: '🍽',
    }

    const refeicoesFormatadas = data?.refeicoes
      .map(refeicao => {
        const emoji =
          refeicaoEmojis[refeicao.nome as keyof typeof refeicaoEmojis] || '🍽'
        return `${emoji} *${refeicao.nome}* às *${refeicao.horario}*\n\n- ${refeicao.alimentos.join('\n- ')}`
      })
      .join('\n\n')

    const suplementosFormatados = data?.suplementos
      .map(suplemento => `${suplemento.nome} (${suplemento.quantidade})`)
      .join('\n- ')

    const message = `
    📋 *Minha dieta personalizada - CalorieCare*
    
    👤 *Nome:* ${data?.nome ?? ''}  
    📏 *Altura:* ${data ? data.altura / 100 : ''}m  
    🎂 *Idade:* ${data?.idade ?? ''} anos  
    ⚖️ *Peso:* ${data?.peso ?? ''}kg  
    🎯 *Objetivo:* ${data?.objetivo ?? ''}  
    🚹 *Sexo:* ${data?.sexo ?? ''}

    ${refeicoesFormatadas}
    
    💊 *Suplementos:*
    \n- ${suplementosFormatados}`

    try {
      await Share.share({
        message: message,
      })
    } catch (err) {
      console.error('Erro ao compartilhar:', err)
    }
  }

  if (isFetching) {
    return (
      <View className="flex-1 items-center bg-background justify-center gap-8">
        <Text className="font-semibold text-lg">
          Gerando sua dieta! Por favor, aguarde
        </Text>
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="flex-1 items-center bg-background justify-center gap-8">
        <Text className="font-semibold text-lg">Falha ao gerar dieta!</Text>
        <Link href="/">
          <Text className="text-primary">Tente novamente</Text>
        </Link>
      </View>
    )
  }

  return (
    <View className="flex-grow bg-background">
      <Header
        title="Sua dieta"
        label={
          <TouchableOpacity onPress={handleShare}>
            <Text className="text-secondary font-medium">Compartilhar</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="p-4 gap-4">
          <Card className="p-2">
            <View className="flex-1 flex-row gap-4 items-center">
              {user?.hasImage ? (
                <Avatar className="w-16 h-16" alt="Avatar">
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
                <Text className="text-lg font-medium">{user?.fullName}</Text>
                <Text>Objetivo: {data?.objetivo}</Text>
                <Text>
                  {data?.calorias} kcal em {data?.quantidadeRefeicoes} refeições
                </Text>
              </View>
            </View>
          </Card>

          {data?.refeicoes.map(meal => (
            <MealCard
              key={meal.nome}
              meal={meal.nome}
              cal={meal.kcal}
              items={meal.alimentos}
              protein={meal.proteinas}
              fats={meal.gorduras}
              carbs={meal.carboidratos}
            />
          ))}

          {data?.suplementos.length > 0 && (
            <Card className="py-2 px-4">
              <Text className="font-semibold text-lg">Suplementos</Text>
              {data?.suplementos.map(suplemento => (
                <View key={suplemento.nome} className="py-2">
                  <Text className="text-muted-foreground">
                    {suplemento.nome}
                  </Text>
                  <Text className="text-muted-foreground">
                    • {suplemento.quantidade}
                  </Text>
                </View>
              ))}
            </Card>
          )}

          <Button variant="ghost" onPress={() => router.replace('/(tabs)')}>
            <Text>Voltar</Text>
          </Button>
        </View>
        <Text className="text-center font-light text-xs mb-4">
          Altere sua dieta conforme a sua necessidade
        </Text>
      </ScrollView>
    </View>
  )
}
