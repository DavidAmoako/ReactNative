import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Index" options={{ headerShown: false }} />
    </Stack>
  )
}
