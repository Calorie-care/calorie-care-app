import { ChevronLeft } from '@/lib/icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type HeaderProps = {
  title: string
  action?: () => void
  label?: JSX.Element
}

export function Header({ title, action, label }: HeaderProps) {
  const router = useRouter()

  const handleBackPress = () => {
    if (action) {
      action()
    } else {
      router.back()
    }
  }

  return (
    <SafeAreaView className="flex-row items-center gap-4 px-8 bg-primary pb-4 pt-6">
      <TouchableOpacity onPress={handleBackPress}>
        <ChevronLeft className="text-secondary" size={28} />
      </TouchableOpacity>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="text-secondary font-bold text-xl">{title}</Text>
        {label && <View>{label}</View>}
      </View>
    </SafeAreaView>
  )
}
