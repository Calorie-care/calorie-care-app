import { ScrollView, TouchableOpacity, View } from 'react-native'

import { HeaderHome } from '@/components/HeaderHome'

import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

import { BicepsFlexed, Pencil, Dumbbell } from '@/lib/icons'

export default function Home() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-background"
    >
      <HeaderHome />

      <View className="px-8 py-4 gap-4">
        <Card className="p-2 items-center gap-2">
          <View className="flex-row gap-2 items-center">
            <Text className="text-primary font-medium text-xl">Sua meta</Text>
            <BicepsFlexed className="text-primary" />
          </View>
          <View className="flex-row gap-1.5 items-center">
            <Text className="font-bold text-2xl">2 🔥</Text>
            <TouchableOpacity>
              <Pencil className="text-foreground" size={16} />
            </TouchableOpacity>
          </View>
          <CardDescription>
            <Text className="text-muted-foreground">
              Você está indo muito bem!
            </Text>
          </CardDescription>
        </Card>

        <Card className="py-2 px-4 flex-row justify-between items-center">
          <View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-primary font-medium text-xl">IMC</Text>
              <Dumbbell className="text-primary" size={18} />
            </View>
            <View className="flex-row gap-2 items-center">
              <Text className="font-bold text-2xl">0.0</Text>
            </View>
          </View>

          <View className="flex-1 items-end">
            <CardDescription>
              <Text className="text-muted-foreground text-right">
                Gere sua dieta para calcular seu IMC
              </Text>
            </CardDescription>
          </View>
        </Card>

        <Card className="py-2 px-4">
          <CardTitle className="text-base">
            Um plano alimentar personalizado
          </CardTitle>
          <CardDescription>
            é a melhor opção para garantir que você atinja seus objetivos com
            saúde, respeitando seu metabolismo e necessidades.
          </CardDescription>
          <Button size="sm" variant="secondary" className="mt-3 mb-1">
            <Text>Gerar dieta</Text>
          </Button>
        </Card>

        <Card className="py-2 px-4">
          <CardTitle className="text-base">
            Confira receitas incríveis
          </CardTitle>
          <CardDescription>
            veja receitas saudáveis, confira ingredientes, quantidades e etapas
            de preparo
          </CardDescription>
          <Button size="sm" variant="secondary" className="mt-3 mb-1">
            <Text>Conferir receitas</Text>
          </Button>
        </Card>
      </View>
    </ScrollView>
  )
}
