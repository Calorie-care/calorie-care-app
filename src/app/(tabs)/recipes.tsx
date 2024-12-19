import { Header } from '@/components/Header'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { router } from 'expo-router'
import { Search } from 'lucide-react-native'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type RecipeProps = {
  id: number
  title: string
  image: string
  duration: number
}

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

  function handleRecipePressed(data: RecipeProps) {
    router.push(`/recipe-details/${encodeURIComponent(JSON.stringify(data))}`)
  }

  return (
    <>
      <Header title="Receitas" />

      <View className="px-8 pt-4 bg-background">
        <Input
          placeholder="Pesquisar"
          icon={<Search className="text-muted-foreground" />}
          onChangeText={setSearch}
        />
      </View>

      <KeyboardAwareScrollView
        className="flex-1 px-8 bg-background"
        contentContainerStyle={{ paddingBottom: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              className="py-2"
              onPress={() => handleRecipePressed(item)}
            >
              <Card image={item.image}>
                <View className="py-2 px-4">
                  <Text className="text-xl">{item.title}</Text>
                  <Text className="text-muted-foreground font-semibold">
                    {item.duration} min
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </KeyboardAwareScrollView>
    </>
  )
}
