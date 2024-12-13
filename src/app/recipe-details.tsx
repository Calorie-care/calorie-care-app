import { Header } from '@/components/Header'
import { RecipeCard } from '@/components/ui/recipe-card-details'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function RecipeDetails() {
  function handleActionHeader() {
    router.push('/(tabs)/recipes')
  }

  return (
    <View>
      {/* TODO: Titulo como nome da receita */}
      <Header title="Receitas" action={handleActionHeader} />

      <RecipeCard />
    </View>
  )
}
