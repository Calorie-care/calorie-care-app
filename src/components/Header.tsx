import { ChevronLeft } from '@/lib/icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

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
    <View className="flex-row items-center gap-4 px-8 bg-primary pb-6 pt-16">
      <TouchableOpacity onPress={handleBackPress}>
        <ChevronLeft className="text-secondary" size={28} />
      </TouchableOpacity>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="text-secondary font-bold text-xl">{title}</Text>
        {label && <View>{label}</View>}
      </View>
    </View>
  )
}
