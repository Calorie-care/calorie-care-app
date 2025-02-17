import { NAV_THEME } from '@/lib/constants'
import { useColorScheme } from '@/lib/useColorScheme'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { Redirect, Tabs } from 'expo-router'
import { Apple, House, Soup } from 'lucide-react-native'

export default function TabLayout() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()

  const { colorScheme } = useColorScheme()
  const theme = NAV_THEME[colorScheme === 'dark' ? 'dark' : 'light']

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />
  }

  if (isSignedIn && user?.unsafeMetadata?.onboarding_completed !== true) {
    return <Redirect href="/(auth)/complete-your-account" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme['muted-foreground'],
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          borderTopWidth: 1,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <House size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: 'Dieta',
          tabBarIcon: ({ color }) => <Apple size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Receitas',
          tabBarIcon: ({ color }) => <Soup size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}
