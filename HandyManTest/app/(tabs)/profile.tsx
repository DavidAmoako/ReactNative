"use client"

import { View, Text, StyleSheet } from "react-native"
import { Button } from "react-native-paper"
import { useAuth } from "../../src/contexts/AuthContext"
import { useRouter } from "expo-router"
import { colors, typography, spacing } from "../../src/theme/theme"

export default function ProfileScreen() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace("/(auth)/welcome")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Welcome, {user?.name}!</Text>
      <Text style={styles.userType}>Account Type: {user?.userType}</Text>

      <Button mode="contained" onPress={handleLogout} style={styles.logoutButton} contentStyle={styles.buttonContent}>
        Logout
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  userType: {
    ...typography.body2,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl,
    textTransform: "capitalize",
  },
  logoutButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
})
