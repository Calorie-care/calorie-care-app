import { TouchableOpacity, View } from 'react-native'

import { Text } from '@/components/ui/text'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { LogOut } from '@/lib/icons'

import { useClerk, useUser } from '@clerk/clerk-expo'

export function HeaderHome() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const firstLetter = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : ''

  return (
    <View className="flex-row bg-primary pt-12 pb-4 px-8 items-center">
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
    </View>
  )
}
