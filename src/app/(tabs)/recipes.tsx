import { Header } from '@/components/Header'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { router } from 'expo-router'
import { Search } from 'lucide-react-native'
import React from 'react'
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native'

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
  const [search, setSearch] = React.useState('')

  const filteredRecipes = recipeData.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  )

  function handleRecipePressed() {
    router.replace('/recipe-details')
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <Header title="Receitas" />
      <View className="px-4 pt-4 bg-background">
        <Input
          label=""
          placeholder="Pesquisar"
          icon={<Search className="text-muted-foreground" />}
          onChangeText={setSearch}
        />
      </View>
      <View className="p-4 bg-background">
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.id.toString()}
          contentContainerClassName="gap-4"
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleRecipePressed}>
              <Card image={item.image}>
                <CardHeader>
                  <Text className="text-2xl">{item.title}</Text>
                  <Text className="text-lg text-gray-500 font-bold">
                    {item.duration} min
                  </Text>
                </CardHeader>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  )
}
