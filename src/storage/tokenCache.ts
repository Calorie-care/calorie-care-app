import * as SecureStore from 'expo-secure-store'

async function getToken(key: string) {
  try {
    return SecureStore.getItem(key)
  } catch (error) {
    console.error('Failed to get token cache', error)
  }
}

async function saveToken(key: string, value: string) {
  try {
    return SecureStore.setItemAsync(key, value)
  } catch (error) {
    console.error('Failed to save token cache', error)
  }
}

export const tokenCache = { getToken, saveToken }
