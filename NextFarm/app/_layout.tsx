import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useAssets } from 'expo-asset';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    MontserratAlternatesRegular: require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    Baloo: require('../assets/fonts/Baloo.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratRegular: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBlack: require('../assets/fonts/Montserrat-Black.ttf'),
    MontserratLight: require('../assets/fonts/Montserrat-Light.ttf'),

  });

  const [assets, error] = useAssets([
    require('../assets/images/intro1.jpg'),
    require('../assets/images/intro2.jpg'),
    require('../assets/images/intro3.jpg'),
    require('../assets/images/page1.png'),
    require('../assets/images/page2.png'),
    require('../assets/images/page3.png'),

  ]);

  /*   return assets ? <Image source={assets[5]} /> : null; */

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(intro)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(intro)/intro2" options={{ headerShown: false }} />
        <Stack.Screen name="(intro)/intro3" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="start" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
