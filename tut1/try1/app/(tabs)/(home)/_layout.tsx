import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          color: '#fff',
        },
        headerTitleAlign: 'center',
        headerBlurEffect: "regular"
      }}>
      <Stack.Screen name="details" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
