import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "", headerStyle: { backgroundColor: '#f5f5f5' } }} />
    </Stack>
  );
}
