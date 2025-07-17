"use client"

import { useEffect } from "react"
import { useRouter } from "expo-router"
import { useAuth } from "../src/contexts/AuthContext"
import SplashScreen from "../src/screens/SplashScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Index() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!isLoading) {
        const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding")

        if (!hasSeenOnboarding) {
          router.replace("/onboarding")
        } else if (user) {
          router.replace("/(tabs)")
        } else {
          router.replace("/(auth)/welcome")
        }
      }
    }

    checkOnboarding()
  }, [user, isLoading])

  return <SplashScreen />
}
