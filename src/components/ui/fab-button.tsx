import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { LucideIcon } from 'lucide-react-native'

interface FABProps {
  onPress: () => void
  icon: LucideIcon
  color?: string
  size?: number
  iconColor?: string
  iconSize?: number
}

const FabButton: React.FC<FABProps> = ({
  onPress,
  icon: Icon,
  color = 'bg-blue-500',
  size = 56,
  iconColor = 'white',
  iconSize = 24,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        absolute 
        bottom-8 
        right-8 
        ${color} 
        rounded-full 
        items-center 
        justify-center 
        shadow-lg 
        active:opacity-80
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <View className="items-center justify-center">
        <Icon color={iconColor} size={iconSize} />
      </View>
    </TouchableOpacity>
  )
}

export { FabButton }
