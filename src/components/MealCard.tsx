import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Card } from '@/components/ui/card'

type MealCardProps = {
  meal: string
  protein: string
  fats: string
  carbs: string
  items: string[]
}

export function MealCard({ meal, protein, fats, carbs, items }: MealCardProps) {
  return (
    <Card className="p-2">
      <View className="flex-1 flex-row justify-center mb-2">
        <View className="flex-row gap-20">
          <View className="items-center">
            <Text className="font-medium text-muted-foreground text-xs">
              PROTEÍNAS
            </Text>
            <Text className="font-medium">{protein}</Text>
          </View>
          <View className="items-center">
            <Text className="font-medium text-muted-foreground text-xs">
              CARB.
            </Text>
            <Text className="font-medium">{carbs}</Text>
          </View>
          <View className="items-center">
            <Text className="font-medium text-muted-foreground text-xs">
              GORDURAS
            </Text>
            <Text className="font-medium">{fats}</Text>
          </View>
        </View>
      </View>
      <Text className="py-2 font-semibold text-lg text-center">{meal}</Text>
      {items.map(item => (
        <Text key={item} className="font-semibold text-muted-foreground">
          {item}
        </Text>
      ))}
    </Card>
  )
}
