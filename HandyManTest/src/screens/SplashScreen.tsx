import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors, typography, spacing } from "../theme/theme"

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="wrench" size={80} color={colors.primary} />
        <Text style={styles.logoText}>TheHandyMan</Text>
        <Text style={styles.tagline}>Your trusted partner for home services</Text>
      </View>

      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl * 2,
  },
  logoText: {
    ...typography.h1,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  tagline: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    gap: spacing.md,
  },
  loadingText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
})

export default SplashScreen
