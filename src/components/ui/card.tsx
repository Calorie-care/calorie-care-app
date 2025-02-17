import { TextClassContext } from '@/components/ui/text'
import { cn } from '@/lib/utils'
import type { TextRef, ViewRef, ImageRef } from '@rn-primitives/types'
import * as React from 'react'
import { Text, View, Image } from 'react-native'

const Card = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View> & {
    image?: string | number
    imageStyle?: object
  }
>(({ className, image, imageStyle, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      'rounded-md border border-border bg-card shadow-sm shadow-foreground/10',
      className
    )}
    {...props}
  >
    {image && (
      <Image
        source={typeof image === 'string' ? { uri: image } : image}
        className="w-full h-32 rounded-t-md"
      />
    )}
    {props.children}
  </View>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  TextRef,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    role="heading"
    aria-level={3}
    ref={ref}
    className={cn(
      'text-2xl text-card-foreground font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  TextRef,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn('text-sm text-muted-foreground pt-2', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value="text-card-foreground">
    <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  </TextClassContext.Provider>
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  ViewRef,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn('flex flex-row items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
