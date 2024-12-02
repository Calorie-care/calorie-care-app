import { useState, useRef } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import type { TextInput } from 'react-native'

import { ChevronDown } from '@/lib/icons'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { FabButton } from '@/components/ui/fab-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Header } from '@/components/Header'

import { zodResolver } from '@hookform/resolvers/zod'
import { router, useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { set, z } from 'zod'
import { ArrowRight, Check } from 'lucide-react-native'

const personalInfoSchema = z.object({
  gender: z.string().min(1, { message: 'Selecione seu gênero' }),
  objective: z.string().min(1, { message: 'Selecione o seu objetivo' }),
  level: z.string().min(1, { message: 'Selecione seu nível atual' }),
  weight: z.string().min(1, { message: 'Preencha o peso' }),
  age: z.string().min(1, { message: 'Preencha a idade' }),
  height: z.string().min(1, { message: 'Preencha a altura' }),
})

const preferencesSchema = z.object({
  calories: z.string().min(1, { message: 'Digite a quantidade de calorias' }),
  meals: z.string().min(1, { message: 'Selecione o número de refeições' }),
})

type PersonalInfoData = z.infer<typeof personalInfoSchema>
type PreferencesData = z.infer<typeof preferencesSchema>

type FormData = PersonalInfoData & PreferencesData

export default function CreateDiet() {
  const [currentStep, setCurrentStep] = useState<
    'personal-info' | 'preferences'
  >('personal-info')
  const [menuWidth, setMenuWidth] = useState(0)

  const dropdownRef = useRef(null)
  const weightRef = useRef<TextInput>(null)
  const ageRef = useRef<TextInput>(null)
  const heightRef = useRef<TextInput>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(
      currentStep === 'personal-info' ? personalInfoSchema : preferencesSchema
    ),
  })

  const genderOptions = [
    { label: 'Masculino', value: 'masculino' },
    { label: 'Feminino', value: 'feminino' },
  ]

  const levelOptions = [
    {
      label: 'Sedentário (pouco ou nenhuma atividade física)',
      value: 'Sedentário',
    },
    {
      label: 'Levemente ativo (exercícios 1 a 3 vezes na semana)',
      value: 'Levemente ativo (exercícios 1 a 3 vezes na semana)',
    },
    {
      label: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)',
      value: 'Moderadamente ativo (exercícios 3 a 5 vezes na semana)',
    },
    {
      label: 'Altamente ativo (exercícios 5 a 7 dia por semana)',
      value: 'Altamente ativo (exercícios 5 a 7 dia por semana)',
    },
  ]

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'Emagrecer' },
    { label: 'Hipertrofia', value: 'Hipertrofia' },
    { label: 'Hipertrofia e definição', value: 'Hipertrofia e definição' },
    { label: 'Definição', value: 'Definição' },
  ]

  const mealsOptions = [
    { label: '3 refeições', value: '3' },
    { label: '4 refeições', value: '4' },
    { label: '5 refeições', value: '5' },
    { label: '6 refeições', value: '6' },
  ]

  function measureDropdownWidth() {
    dropdownRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setMenuWidth(width)
    })
  }

  async function handleNextStep() {
    const isValid = await trigger()
    if (isValid) {
      setCurrentStep('preferences')
    }
  }

  function handleCreateDiet(data: FormData) {
    if (currentStep === 'personal-info') {
      handleNextStep()
    } else {
      // handleCreateDiet(data)
    }

    const completeData = {
      ...getValues(),
      ...data,
    }

    console.log(completeData)
  }

  function renderPersonalInfoStep() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-8 py-4 bg-background"
      >
        <View className="gap-3 mb-2">
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu>
                <View className="flex-row justify-between">
                  <Text className="mb-1">Gênero</Text>
                  {errors.gender && (
                    <Text className="text-red-500">
                      {errors.gender.message}
                    </Text>
                  )}
                </View>
                <DropdownMenuTrigger asChild>
                  <Button
                    ref={dropdownRef}
                    variant="dropdown"
                    onLayout={measureDropdownWidth}
                  >
                    <View className="flex flex-row items-center justify-between w-full">
                      {value ? (
                        <Text className="text-lg font-normal text-foreground">
                          {
                            genderOptions.find(option => option.value === value)
                              ?.label
                          }
                        </Text>
                      ) : (
                        <Text className="text-lg font-normal">
                          Escolha uma opção
                        </Text>
                      )}

                      <ChevronDown className="text-muted-foreground ml-2" />
                    </View>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-1.5"
                  style={{ width: menuWidth }}
                >
                  <DropdownMenuGroup>
                    {genderOptions.map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => onChange(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />

          <Controller
            control={control}
            name="level"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu>
                <View className="flex-row justify-between">
                  <Text className="mb-1">Seu nível de atividade física</Text>
                  {errors.level && (
                    <Text className="text-red-500">{errors.level.message}</Text>
                  )}
                </View>
                <DropdownMenuTrigger asChild>
                  <Button
                    ref={dropdownRef}
                    variant="dropdown"
                    onLayout={measureDropdownWidth}
                  >
                    <View className="flex flex-row items-center justify-between w-full">
                      {value ? (
                        <Text className="text-lg font-normal text-foreground">
                          {
                            levelOptions.find(option => option.value === value)
                              ?.label
                          }
                        </Text>
                      ) : (
                        <Text className="text-lg font-normal">
                          Escolha uma opção
                        </Text>
                      )}

                      <ChevronDown className="text-muted-foreground ml-2" />
                    </View>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-1.5"
                  style={{ width: menuWidth }}
                >
                  <DropdownMenuGroup>
                    {levelOptions.map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => onChange(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />

          <Controller
            control={control}
            name="objective"
            render={({ field: { onChange, value } }) => (
              <DropdownMenu>
                <View className="flex-row justify-between">
                  <Text className="mb-1">Seu objetivo</Text>
                  {errors.objective && (
                    <Text className="text-red-500">
                      {errors.objective.message}
                    </Text>
                  )}
                </View>
                <DropdownMenuTrigger asChild>
                  <Button
                    ref={dropdownRef}
                    variant="dropdown"
                    onLayout={measureDropdownWidth}
                  >
                    <View className="flex flex-row items-center justify-between w-full">
                      {value ? (
                        <Text className="text-lg font-normal text-foreground">
                          {
                            objectiveOptions.find(
                              option => option.value === value
                            )?.label
                          }
                        </Text>
                      ) : (
                        <Text className="text-lg font-normal">
                          Escolha uma opção
                        </Text>
                      )}

                      <ChevronDown className="text-muted-foreground ml-2" />
                    </View>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="mt-1.5"
                  style={{ width: menuWidth }}
                >
                  <DropdownMenuGroup>
                    {objectiveOptions.map(option => (
                      <DropdownMenuItem
                        key={option.value}
                        onSelect={() => onChange(option.value)}
                      >
                        <Text>{option.label}</Text>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        </View>

        <Controller
          control={control}
          name="weight"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Peso"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Seu peso atual em kg"
              keyboardType="numeric"
              errorMessage={errors.weight?.message}
              returnKeyType="next"
              ref={weightRef}
              onSubmitEditing={() => ageRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Idade"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Sua idade"
              keyboardType="numeric"
              errorMessage={errors.age?.message}
              ref={ageRef}
              onSubmitEditing={() => heightRef.current?.focus()}
            />
          )}
        />
        <View className="mb-32">
          <Controller
            control={control}
            name="height"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Altura"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Sua altura em cm"
                keyboardType="numeric"
                errorMessage={errors.height?.message}
                returnKeyType="done"
                ref={heightRef}
              />
            )}
          />
        </View>
      </ScrollView>
    )
  }

  function renderPreferencesStep() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-8 py-4 bg-background"
      >
        <Controller
          control={control}
          name="calories"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Quantidade de calorias"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Calorias totais"
              keyboardType="numeric"
              errorMessage={errors.calories?.message}
              returnKeyType="next"
            />
          )}
        />
        <Controller
          control={control}
          name="meals"
          render={({ field: { onChange, value } }) => (
            <DropdownMenu>
              <View className="flex-row justify-between">
                <Text className="mb-1">Em quantas refeições?</Text>
                {errors.meals && (
                  <Text className="text-red-500">{errors.meals.message}</Text>
                )}
              </View>
              <DropdownMenuTrigger asChild>
                <Button
                  ref={dropdownRef}
                  variant="dropdown"
                  onLayout={measureDropdownWidth}
                >
                  <View className="flex flex-row items-center justify-between w-full">
                    {value ? (
                      <Text className="text-lg font-normal text-foreground">
                        {
                          mealsOptions.find(option => option.value === value)
                            ?.label
                        }
                      </Text>
                    ) : (
                      <Text className="text-lg font-normal">
                        Escolha uma opção
                      </Text>
                    )}

                    <ChevronDown className="text-muted-foreground ml-2" />
                  </View>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="mt-1.5"
                style={{ width: menuWidth }}
              >
                <DropdownMenuGroup>
                  {mealsOptions.map(option => (
                    <DropdownMenuItem
                      key={option.value}
                      onSelect={() => onChange(option.value)}
                    >
                      <Text>{option.label}</Text>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />
        {errors.meals && (
          <Text className="text-red-500 mt-1">{errors.meals.message}</Text>
        )}

        <View className="mt-4">
          <Text className="text-muted-foreground">
            • Pelo menos 90 g de carboidratos
          </Text>
          <Text className="text-muted-foreground">
            • Pelo menos 40 g de gordura
          </Text>
          <Text className="text-muted-foreground">
            • Pelo menos 90 g de proteína
          </Text>
        </View>
      </ScrollView>
    )
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <Header
        title="Gerar dieta"
        action={
          currentStep === 'personal-info'
            ? () => router.back()
            : () => setCurrentStep('personal-info')
        }
        label={
          <Text className="text-secondary font-medium">
            {currentStep === 'personal-info'
              ? 'Dados pessoais'
              : 'Preferências'}
          </Text>
        }
      />

      {currentStep === 'personal-info' && renderPersonalInfoStep()}
      {currentStep === 'preferences' && renderPreferencesStep()}

      <FabButton
        onPress={handleSubmit(handleCreateDiet)}
        color="bg-primary"
        size={58}
        icon={currentStep === 'personal-info' ? ArrowRight : Check}
        iconSize={32}
      />
    </KeyboardAvoidingView>
  )
}