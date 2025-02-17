import { router } from 'expo-router'
import { Clock, Flame, Search } from 'lucide-react-native'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

import { Header } from '@/components/Header'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'

import { RECIPES } from '@/storage/mockedData'

type RecipeProps = {
  id: number
  title: string
  image: string
  cal: string
  duration: string
  proteins: string
  fats: string
  carbs: string
  ingredients: string[]
  preparation: string[]
}

export default function Recipes() {
  const [search, setSearch] = React.useState('')

  const filteredRecipes = RECIPES.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  )

  function handleRecipePressed(data: RecipeProps) {
    router.navigate({
      pathname: '/recipe-details',
      params: {
        id: data.id,
        title: data.title,
        image: data.image,
        cal: data.cal,
        duration: data.duration,
        proteins: data.proteins,
        fats: data.fats,
        carbs: data.carbs,
        ingredients: data.ingredients,
        preparation: data.preparation,
      },
    })
  }

  return (
    <>
      <Header title="Receitas" />

      <View className="px-4 pt-4 bg-background">
        <Input
          placeholder="Pesquisar"
          icon={<Search className="text-muted-foreground" />}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredRecipes}
        className="flex-1 px-4 bg-background"
        keyExtractor={item => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="pb-4"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="py-2"
            onPress={() => handleRecipePressed(item)}
          >
            <Card image={item.image}>
              <View className="py-2 px-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-xl font-medium">{item.title}</Text>
                  <View>
                    <View className="flex-row items-center">
                      <Flame
                        className="text-muted-foreground mr-1.5"
                        size={14}
                      />

                      <Text className="text-muted-foreground">
                        {item.cal} cal
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Clock
                        className="text-muted-foreground mr-1.5"
                        size={14}
                      />
                      <Text className="text-muted-foreground">
                        {item.duration} min
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </>
  )
}
