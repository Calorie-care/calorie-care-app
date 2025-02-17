import { create } from 'zustand'

export type PersonalInfos = {
  name: string
  weight: string
  age: string
  height: string
  level: string
  objective: string
  gender: string
  calories: string
  meals: string
}

type DataState = {
  personalInfos: PersonalInfos
  setPersonalInfos: (data: PersonalInfos) => void
}

export const useDataStorage = create<DataState>(set => ({
  personalInfos: {
    name: '',
    weight: '',
    age: '',
    height: '',
    level: '',
    objective: '',
    gender: '',
    calories: '',
    meals: '',
  },
  setPersonalInfos: data =>
    set(state => ({ personalInfos: { ...state.personalInfos, ...data } })),
}))
