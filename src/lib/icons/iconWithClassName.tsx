import { Ionicons } from '@expo/vector-icons'
import type { LucideIcon } from 'lucide-react-native'
import { cssInterop } from 'nativewind'

export function iconWithClassName(icon: LucideIcon | string) {
  if (typeof icon === 'string') {
    const IconComponent = props => {
      const { size, color, ...restProps } = props

      cssInterop(Ionicons, {
        className: {
          target: 'style',
          nativeStyleToProp: {
            color: true,
            opacity: true,
          },
        },
      })

      return <Ionicons name={icon} size={size} color={color} {...restProps} />
    }

    return IconComponent
  }

  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  })

  return icon
}
