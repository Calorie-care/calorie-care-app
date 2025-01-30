import { cn } from '@/lib/utils'
import * as React from 'react'
import { TextInput, View, type TextInputProps } from 'react-native'
import { Label } from './label'
import { Text } from './text'
import { Controller } from 'react-hook-form'

interface CustomTextInputProps extends TextInputProps {
  control?: any // Tornando o control opcional
  name?: string // Tornando o name opcional para quando não usar react-hook-form
  label?: string
  labelColor?: string
  labelClassName?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  CustomTextInputProps
>(
  (
    {
      control,
      name,
      className,
      placeholderClassName,
      label,
      labelClassName,
      labelColor = 'text-foreground',
      icon,
      ...props
    },
    ref
  ) => {
    if (control && name) {
      // Renderiza com react-hook-form
      return (
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <View className="flex-row items-center justify-between">
                {label && (
                  <Label
                    className={cn(
                      'font-normal py-1',
                      labelColor,
                      labelClassName
                    )}
                    nativeID="name"
                  >
                    {label}
                  </Label>
                )}
                {error && (
                  <Text className="text-red-500 text-sm">{error.message}</Text>
                )}
              </View>
              <View className="flex-row items-center mb-2 web:flex h-10 native:h-14 web:w-full rounded-md border border-input bg-card px-3">
                {icon && <View className="mr-2">{icon}</View>}
                <TextInput
                  ref={ref}
                  className={cn(
                    'flex-1 pb-2 text-base lg:text-sm native:text-lg text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
                    props.editable === false &&
                      'opacity-50 web:cursor-not-allowed',
                    className
                  )}
                  value={value}
                  onChangeText={onChange}
                  placeholderClassName={cn(placeholderClassName)}
                  {...props}
                />
              </View>
            </>
          )}
          name={name}
        />
      )
    }

    // Renderiza sem react-hook-form
    return (
      <>
        {label && (
          <View className="flex-row items-center justify-between">
            <Label
              className={cn('font-normal py-1', labelColor, labelClassName)}
              nativeID="name"
            >
              {label}
            </Label>
          </View>
        )}
        <View className="flex-row items-center mb-2 web:flex h-10 native:h-14 web:w-full rounded-md border border-input bg-card px-3">
          {icon && <View className="mr-2">{icon}</View>}
          <TextInput
            ref={ref}
            className={cn(
              'flex-1 pb-2 text-base lg:text-sm native:text-lg text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
              props.editable === false && 'opacity-50 web:cursor-not-allowed',
              className
            )}
            placeholderClassName={cn(placeholderClassName)}
            {...props}
          />
        </View>
      </>
    )
  }
)

Input.displayName = 'Input'

export { Input }
