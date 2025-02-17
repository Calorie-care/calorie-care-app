import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { router, useLocalSearchParams } from 'expo-router'
import { Clock, Flame } from 'lucide-react-native'
import { View, ScrollView } from 'react-native'

export default function RecipeDetails() {
  const {
    image,
    title,
    cal,
    duration,
    proteins,
    fats,
    carbs,
    ingredients,
    preparation,
  } = useLocalSearchParams()

  const ingredientsList =
    typeof ingredients === 'string' ? ingredients.split(',') : []
  const preparationMethod =
    typeof preparation === 'string' ? preparation.split(/,(?=\s?[A-Z])/) : []

  return (
    <View className="flex-grow bg-background">
      <Header
        title={String(title)}
        action={() => router.navigate('/(tabs)/recipes')}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="p-4">
          <Card image={String(image)}>
            <View className="py-2 px-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-2xl font-medium">{title}</Text>
                <View>
                  <View className="flex-row items-center">
                    <Flame className="text-rose-500 mr-1.5" size={14} />

                    <Text className="text-muted-foreground">{cal} kcal</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Clock className="text-muted-foreground mr-1.5" size={14} />
                    <Text className="text-muted-foreground">
                      {duration} min
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between px-8 py-4 border-t border-b border-border">
              <View className="items-center">
                <Text className="font-medium text-muted-foreground text-xs">
                  PROTEÍNAS
                </Text>
                <Text className="text-xl font-bold">{proteins}G</Text>
              </View>
              <View className="items-center">
                <Text className="font-medium text-muted-foreground text-xs">
                  CARBS.
                </Text>
                <Text className="text-xl font-bold">{carbs}G</Text>
              </View>
              <View className="items-center">
                <Text className="font-medium text-muted-foreground text-xs">
                  GORDURAS
                </Text>
                <Text className="text-xl font-bold">{fats}G</Text>
              </View>
            </View>

            <View className="px-4 py-2">
              <Text className="text-xl font-semibold mb-2">
                {'🥕  Ingredientes'}
              </Text>
              <View className="space-y-2">
                {ingredientsList.map(ingredient => (
                  <Text
                    key={ingredient.trim()}
                    className="text-muted-foreground"
                  >
                    • {ingredient.trim()}
                  </Text>
                ))}
              </View>
            </View>

            <View className="px-4 py-2 border-t border-border">
              <Text className="text-xl font-semibold mb-2">
                {'🥘  Preparo'}
              </Text>
              <View className="space-y-2">
                {preparationMethod.map((step, index) => (
                  <Text key={step.trim()} className="text-muted-foreground">
                    {index + 1}. {step.trim()}
                  </Text>
                ))}
              </View>
            </View>
          </Card>
          <Button
            className="mt-4"
            variant="ghost"
            onPress={() => router.replace('/(tabs)')}
          >
            <Text>Voltar</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}
