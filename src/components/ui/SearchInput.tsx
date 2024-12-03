import { Search, Delete } from 'lucide-react-native'
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'

//TODO: Debounce search

interface SearchInputProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchInput({
  onSearch,
  placeholder = 'Pesquisar',
}: SearchInputProps) {
  const [query, setQuery] = useState('')

  const handleChangeText = (text: string) => {
    setQuery(text)
    // onSearch(text)
  }

  const handleClear = () => {
    setQuery('')
    // onSearch('')
  }

  return (
    <View>
      <View className="flex-row items-center bg-card rounded-lg px-3 h-11 border border-border">
        <Search size={20} className="text-gray-500 mr-2" />
        <TextInput
          className="flex-1 text-base text-gray-80"
          placeholder={placeholder}
          placeholderTextColor="#666"
          value={query}
          onChangeText={handleChangeText}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} className="ml-2">
            <Delete size={20} className="text-gray-500" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
