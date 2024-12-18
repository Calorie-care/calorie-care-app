import { useAuth, useUser } from '@clerk/clerk-expo'
import { Redirect, Tabs } from 'expo-router'
import { Apple, House, Soup } from 'lucide-react-native'

export default function TabLayout() {
  const { user } = useUser()
  const { isSignedIn } = useAuth()

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
        // tabBarActiveTintColor: '#FFF',
        // tabBarInactiveTintColor: '#E4E4E7',
        // tabBarStyle: {
        //   backgroundColor: '#14a34a',
        //   borderTopColor: '#F0F0F0',
        //   borderTopWidth: 1,
        // },
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
