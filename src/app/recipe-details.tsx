import { router } from 'expo-router'
import { View } from 'react-native'
import { Header } from '@/components/Header'
import { RecipeCard } from '@/components/ui/recipe-card'

export default function RecipeDetails() {
  return (
    <View>
      {/* TODO: Titulo como nome da receita */}
      <Header title="Receitas" />

      <RecipeCard />
    </View>
  )
}
