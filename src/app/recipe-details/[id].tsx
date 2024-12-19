import { Header } from '@/components/Header'
import { RecipeCard } from '@/components/ui/recipe-card-details'
import { useLocalSearchParams } from 'expo-router'

export default function RecipeDetails() {
  const params = useLocalSearchParams()
  console.log(params.id.title)
  return (
    <>
      <Header title="{id.title}" />

      <RecipeCard data={params} />
    </>
  )
}
