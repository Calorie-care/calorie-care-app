import { cn } from '@/lib/utils'
import * as React from 'react'
import { TextInput, View, type TextInputProps } from 'react-native'
import { Label } from './label'
import { Text } from './text'

interface CustomTextInputProps extends TextInputProps {
  label: string
  errorMessage?: string
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
      className,
      placeholderClassName,
      label,
      labelClassName,
      errorMessage,
      labelColor = 'text-foreground',
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <View className="flex-row justify-between">
          <Label
            className={cn('font-normal py-1', labelColor, labelClassName)}
            nativeID="name"
          >
            {label}
          </Label>
          {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
        </View>
        <View className="flex-row items-center mb-2 web:flex h-10 native:h-14 web:w-full rounded-md border border-input bg-background px-3">
          {icon && <View className="mr-2">{icon}</View>}
          <TextInput
            ref={ref}
            className={cn(
              'pb-2 text-base lg:text-sm native:text-lg placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2',
              props.editable === false && 'opacity-50 web:cursor-not-allowed',
              className
            )}
            multiline={true}
            placeholderClassName={cn(
              'text-muted-foreground',
              placeholderClassName
            )}
            {...props}
          />
        </View>
      </>
    )
  }
)

Input.displayName = 'Input'

export { Input }
