import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native'
import { Text } from '@/components/ui/text'
import { Header } from '@/components/Header'
const recipeData = [
  {
    id: 1,
    title: 'Arroz de Atum',
    image: 'https://i.ibb.co/yYY8Gnk/image-4.png',
    duration: 45,
  },
  {
    id: 2,
    title: 'Cookie americano',
    image: 'https://i.ibb.co/yYY8Gnk/image-4.png',
    duration: 40,
  },
  {
    id: 3,
    title: 'Salada proteica',
    image: 'https://i.ibb.co/yYY8Gnk/image-4.png',
    duration: 20,
  },
  {
    id: 4,
    title: 'Strogonoff de Carne',
    image: 'https://i.ibb.co/yYY8Gnk/image-4.png',
    duration: 60,
  },
]

export default function Recipes() {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <Header title="Receitas" />
      {/* TODO: onSearch */}
      <View className="px-4 pt-4 bg-background">
        <SearchInput />
      </View>

      <ScrollView className="p-4 bg-background">
        {/* TODO: Ajustar fontes */}

        <View className="gap-4">
          <TouchableOpacity onPress={() => router.replace('/recipe-details')}>
            <Card image={'https://i.ibb.co/yYY8Gnk/image-4.png'}>
              <CardHeader>
                <Text className="text-2xl">Arroz de Atum</Text>
                <Text className="text-lg text-gray-500 font-bold">45 min</Text>
              </CardHeader>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
