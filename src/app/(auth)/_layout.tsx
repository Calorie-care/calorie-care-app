import { useAuth, useUser } from '@clerk/clerk-expo'
import { router, Stack } from 'expo-router'
import { useEffect } from 'react'

export default function AuthLayout() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      if (user?.unsafeMetadata?.onboarding_completed === true) {
        router.push('/(tabs)')
      } else {
        router.push('/(auth)/complete-your-account')
      }
    }
  }, [isSignedIn, user])

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="complete-your-account"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}
