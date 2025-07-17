"use client"

import { useRef, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from "react-native"
import { Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors, typography, spacing } from "../../theme/theme"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="hammer-wrench" size={100} color={colors.primary} />
          <Text style={styles.appName}>TheHandyMan</Text>
          <Text style={styles.tagline}>Connect. Fix. Done.</Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="account-check" size={40} color={colors.accent} />
            <Text style={styles.featureTitle}>Trusted Professionals</Text>
            <Text style={styles.featureDescription}>Verified and skilled handymen ready to help</Text>
          </View>

          <View style={styles.feature}>
            <MaterialCommunityIcons name="calendar-clock" size={40} color={colors.accent} />
            <Text style={styles.featureTitle}>Easy Booking</Text>
            <Text style={styles.featureDescription}>Schedule services that fit your timeline</Text>
          </View>

          <View style={styles.feature}>
            <MaterialCommunityIcons name="shield-check" size={40} color={colors.accent} />
            <Text style={styles.featureTitle}>Secure & Safe</Text>
            <Text style={styles.featureDescription}>Protected payments and insured services</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("RoleSelection")}
            style={styles.primaryButton}
            contentStyle={styles.buttonContent}
          >
            Get Started
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
    paddingTop: height * 0.1,
    paddingBottom: spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  appName: {
    ...typography.h1,
    color: colors.primary,
    marginTop: spacing.md,
    textAlign: "center",
  },
  tagline: {
    ...typography.body1,
    color: colors.accent,
    marginTop: spacing.sm,
    textAlign: "center",
    fontStyle: "italic",
  },
  featuresContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: spacing.xl,
  },
  feature: {
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  featureTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  featureDescription: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  secondaryButtonText: {
    ...typography.body2,
    color: colors.primary,
    textDecorationLine: "underline",
  },
})

export default WelcomeScreen
