"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { TextInput, Button, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { authService } from "../../src/services/authService"
import { colors, typography, spacing } from "../../src/theme/theme"

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address")
      return
    }

    setLoading(true)
    try {
      await authService.forgotPassword(email)
      setEmailSent(true)
    } catch (error) {
      Alert.alert("Error", "Failed to send reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Check Your Email</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.successContainer}>
          <MaterialCommunityIcons name="email-check" size={80} color={colors.primary} />
          <Text style={styles.successTitle}>Email Sent!</Text>
          <Text style={styles.successMessage}>
            We've sent a password reset link to {email}. Please check your email and follow the instructions to reset
            your password.
          </Text>

          <Button
            mode="contained"
            onPress={() => router.push("/(auth)/login")}
            style={styles.backToLoginButton}
            contentStyle={styles.buttonContent}
          >
            Back to Sign In
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Reset Password</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="lock-reset" size={60} color={colors.primary} />
        </View>

        <Text style={styles.description}>
          Enter your email address and we'll send you a link to reset your password.
        </Text>

        <Card style={styles.formCard}>
          <Card.Content style={styles.formContent}>
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />

            <Button
              mode="contained"
              onPress={handleResetPassword}
              loading={loading}
              disabled={loading}
              style={styles.resetButton}
              contentStyle={styles.buttonContent}
            >
              Send Reset Link
            </Button>
          </Card.Content>
        </Card>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>Remember your password? Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
  },
  backButton: {
    padding: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: spacing.xl,
  },
  description: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  formCard: {
    backgroundColor: colors.surface,
    elevation: 2,
    borderRadius: 12,
    width: "100%",
    marginBottom: spacing.lg,
  },
  formContent: {
    padding: spacing.lg,
  },
  input: {
    marginBottom: spacing.lg,
    backgroundColor: colors.background,
  },
  resetButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  backToLogin: {
    paddingVertical: spacing.sm,
  },
  backToLoginText: {
    ...typography.body2,
    color: colors.primary,
    textDecorationLine: "underline",
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  successTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  successMessage: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  backToLoginButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    width: "100%",
  },
})

export default ForgotPasswordScreen
