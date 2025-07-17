import type React from "react"
import { View, Text, StyleSheet, Dimensions } from "react-native"
import { Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors, typography, spacing } from "../../theme/theme"

const { width, height } = Dimensions.get("window")

interface WelcomeScreenProps {
  navigation: any
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="wrench" size={60} color={colors.primary} />
          <Text style={styles.logoText}>TheHandyMan</Text>
        </View>

        <Text style={styles.tagline}>Your trusted partner for home services</Text>

        <View style={styles.heroImageContainer}>
          <MaterialCommunityIcons name="home-variant" size={120} color={colors.accent} />
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="account-check" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Verified Professionals</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="clock-fast" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Quick Booking</Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="shield-check" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Secure Payments</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="star" size={24} color={colors.primary} />
            <Text style={styles.featureText}>Quality Guaranteed</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("RoleSelection")}
          style={styles.primaryButton}
          contentStyle={styles.buttonContent}
        >
          Get Started
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate("Login")}
          style={styles.secondaryButton}
          contentStyle={styles.buttonContent}
        >
          Sign In
        </Button>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  heroSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: spacing.xxl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logoText: {
    ...typography.h1,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  tagline: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  heroImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    backgroundColor: `${colors.accent}20`,
    borderRadius: 100,
    marginBottom: spacing.xl,
  },
  featuresSection: {
    paddingVertical: spacing.lg,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  featureItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  featureText: {
    ...typography.body2,
    color: colors.text.primary,
    textAlign: "center",
    marginTop: spacing.sm,
    fontWeight: "500",
  },
  buttonContainer: {
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  secondaryButton: {
    borderColor: colors.primary,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  footer: {
    paddingBottom: spacing.lg,
    alignItems: "center",
  },
  footerText: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 16,
  },
})

export default WelcomeScreen
