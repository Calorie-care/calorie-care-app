import React from 'react'
import { Controller } from 'react-hook-form'
import { View, Text, TouchableOpacity } from 'react-native'

import { Label } from '@/components/ui/label'

export function RadioButtonInput({
  control,
  required,
  label,
  name,
  options,
}: {
  control: any
  required?: boolean
  label: string
  name: string
  options: { label: string; value: string }[]
}) {
  const Option = ({
    label,
    value,
    onChange,
    isSelected,
  }: {
    label: string
    value: string
    onChange: (value: string) => void
    isSelected: boolean
  }) => {
    return (
      <TouchableOpacity
        className={`border rounded-lg px-5 py-2 ${
          isSelected ? 'bg-primary border-primary' : 'border-input'
        }`}
        onPress={() => onChange(value)}
      >
        <Text
          className={`text-base ${isSelected ? 'text-white' : 'text-black'}`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <Controller
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <View className="flex-row items-center justify-between">
            <Label className="font-normal py-1" nativeID="name">
              {label}
            </Label>
            {error && (
              <Text className="text-red-500 text-sm">{error.message}</Text>
            )}
          </View>
          <View className="flex-row flex-wrap gap-2">
            {options.map(option => (
              <Option
                key={option.value}
                label={option.label}
                value={option.value}
                onChange={onChange}
                isSelected={value === option.value}
              />
            ))}
          </View>
        </>
      )}
      name={name}
      rules={{ required: required && 'Selecione uma opção' }}
    />
  )
}
