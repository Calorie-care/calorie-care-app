import React from 'react'
import { Image, Text, View } from 'react-native'

export function RecipeCard() {
  return (
    <View className="rounded-lg overflow-hidden shadow-lg m-4 bg-white">
      <Image
        source={{ uri: 'https://i.ibb.co/kKwbwNj/image-4-2.png' }}
        className="w-full h-36 object-cover"
      />

      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-800">Arroz de atum</Text>
      </View>

      <View className="flex-row justify-between px-8 py-4 border-t border-b border-gray-200">
        <View className="items-center">
          <Text className="text-gray-600 text-sm">PROTEÍNAS</Text>
          <Text className="text-xl font-bold">16G</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-600 text-sm">GORDURAS</Text>
          <Text className="text-xl font-bold">17G</Text>
        </View>
        <View className="items-center">
          <Text className="text-gray-600 text-sm">CARB.</Text>
          <Text className="text-xl font-bold">7G</Text>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-xl font-bold mb-3">Ingredientes</Text>
        <View className="space-y-2">
          {[
            '4 latas de atum em óleo',
            '500ml caldo aromático',
            '400g espinafres congelados',
            '350g arroz',
            '200g tomate pelado',
            '120g cebola',
            '120g alho francês',
            '30g alho',
            '30g salsa',
            'Raspa e sumo de 1 limão',
          ].map((ingredient, index) => (
            <Text key={index} className="text-gray-600">
              • {ingredient}
            </Text>
          ))}
        </View>
      </View>

      <View className="p-4 border-t border-gray-200">
        <Text className="text-xl font-bold mb-3">Preparo</Text>
        <View className="space-y-3">
          <Text className="text-gray-600">
            1. Ferva 600 ml de água com as cascas da cebola, alho e alho
            francês.
          </Text>
          <Text className="text-gray-600">
            2. Numa panela, refogue a cebola picada, o alho, o tomate e o alho
            francês.
          </Text>
          <Text className="text-gray-600">
            3. Adicione o caldo aromático, a raspa e o sumo de limão, e deixe
            cozinhar em lume brando
          </Text>
        </View>
      </View>
    </View>
  )
}
