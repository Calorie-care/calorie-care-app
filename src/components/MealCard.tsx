import { View } from 'react-native'
import { Text } from '@/components/ui/text'
import { Card } from '@/components/ui/card'
import { Flame } from 'lucide-react-native'

type MealCardProps = {
  meal: string
  cal: string
  protein: string
  fats: string
  carbs: string
  items: string[]
}

export function MealCard({
  meal,
  cal,
  protein,
  fats,
  carbs,
  items,
}: MealCardProps) {
  return (
    <Card className="p-2">
      <View className="flex-1 flex-row justify-center mb-2">
        <View className="flex-row gap-20">
          <View className="items-center">
            <Text className="font-medium text-muted-foreground text-xs">
              PROTEÍNAS
            </Text>
            <Text className="text-xl font-bold">{protein}</Text>
          </View>
          <View className="items-center">
            <Text className="font-medium text-muted-foreground text-xs">
              CARB.
            </Text>
            <Text className="text-xl font-bold">{carbs}</Text>
          </View>
          <View className="items-center">
            <Text className="font-medium text-muted-foreground text-xs">
              GORDURAS
            </Text>
            <Text className="text-xl font-bold">{fats}</Text>
          </View>
        </View>
      </View>
      <View className="py-2">
        <Text className="font-semibold text-lg text-center">{meal}</Text>
        <View className="flex-row justify-center items-center">
          <Flame className="text-rose-500 mr-1.5" size={14} />
          <Text className="text-center">{cal} kcal</Text>
        </View>
      </View>
      {items.map(item => (
        <Text key={item} className="px-2 text-muted-foreground">
          • {item}
        </Text>
      ))}
    </Card>
  )
}
