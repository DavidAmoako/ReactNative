"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { authService } from "../../services/authService"
import { colors, typography, spacing } from "../../theme/theme"

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address")
      return
    }

    setLoading(true)
    try {
      const result = await authService.forgotPassword(email)
      if (result.success) {
        setEmailSent(true)
      } else {
        Alert.alert("Error", result.error)
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (emailSent) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.successContainer}>
            <MaterialCommunityIcons name="email-check" size={80} color={colors.primary} />
            <Text style={styles.successTitle}>Check Your Email</Text>
            <Text style={styles.successMessage}>We've sent a password reset link to {email}</Text>
            <Text style={styles.successSubMessage}>
              Please check your email and follow the instructions to reset your password.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Login")}
              style={styles.backToLoginButton}
              contentStyle={styles.buttonContent}
            >
              Back to Sign In
            </Button>

            <TouchableOpacity onPress={() => setEmailSent(false)} style={styles.resendLink}>
              <Text style={styles.resendText}>Didn't receive the email? Try again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="lock-reset" size={80} color={colors.primary} />
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
            theme={{ colors: { primary: colors.primary } }}
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
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>Remember your password? Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingTop: spacing.xxl * 2,
    marginBottom: spacing.xl,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  formContainer: {
    gap: spacing.xl,
  },
  input: {
    backgroundColor: colors.surface,
  },
  resetButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  backToLogin: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  backToLoginText: {
    ...typography.body2,
    color: colors.primary,
    textDecorationLine: "underline",
  },
  successContainer: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  successTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    textAlign: "center",
  },
  successMessage: {
    ...typography.body1,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.md,
    fontWeight: "600",
  },
  successSubMessage: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
  },
  buttonContainer: {
    gap: spacing.lg,
  },
  backToLoginButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  resendLink: {
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  resendText: {
    ...typography.body2,
    color: colors.primary,
    textDecorationLine: "underline",
  },
})

export default ForgotPasswordScreen
