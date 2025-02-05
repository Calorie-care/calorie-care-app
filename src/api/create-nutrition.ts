import { api } from '@/lib/axios'

interface CreateNutritionBody {
  name: string
  weight: string
  height: string
  age: string
  gender: string
  level: string
  objective: string
  calories: string
  meals: string
}

export interface CreateNutritionResponse {
  nome: string
  sexo: string
  idade: number
  altura: number
  peso: number
  objetivo: string
  refeicoes: {
    horario: string
    nome: string
    alimentos: string[]
    kcal: string
  }[]
  suplementos: {
    nome: string
    quantidade: string
  }[]
}

export async function createNutrition({
  name,
  weight,
  height,
  age,
  gender,
  level,
  objective,
  calories,
  meals,
}: CreateNutritionBody): Promise<CreateNutritionResponse> {
  const response = await api.post('/nutrition', {
    name,
    weight,
    height,
    age,
    gender,
    level,
    objective,
    calories,
    meals,
  })

  return response.data.nutrition as CreateNutritionResponse
}
