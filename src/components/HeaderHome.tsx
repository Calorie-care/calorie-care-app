import { TouchableOpacity, View } from 'react-native'

import { Text } from '@/components/ui/text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { LogOut } from '@/lib/icons'

import { useClerk, useUser } from '@clerk/clerk-expo'
import { SafeAreaView } from 'react-native-safe-area-context'

export function HeaderHome() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : ''

  return (
    <SafeAreaView className="flex-row items-center px-8 bg-primary pb-4 pt-6">
      <View className="flex-1 flex-row gap-4 items-center">
        {user?.hasImage ? (
          <Avatar alt="Avatar">
            <AvatarImage source={{ uri: user?.imageUrl }} />
          </Avatar>
        ) : (
          <Avatar alt="Avatar">
            <AvatarFallback>
              <Text className="text-2xl">{firstLetter}</Text>
            </AvatarFallback>
          </Avatar>
        )}
        <View>
          <Text className="text-secondary">Olá,</Text>
          <Text className="text-secondary font-medium">{user?.firstName}</Text>
        </View>
      </View>

      <TouchableOpacity>
        <LogOut className="text-secondary" onPress={() => signOut()} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
