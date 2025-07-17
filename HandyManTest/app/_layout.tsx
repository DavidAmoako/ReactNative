"use client"

import { Stack } from "expo-router"
import { useAuth } from "../src/contexts/AuthContext"

export default function RootLayout() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return null // You could show a loading screen here
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="index" />
    </Stack>
  )
}
