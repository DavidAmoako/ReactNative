"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { TextInput, Button, Divider } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"
import { colors, typography, spacing } from "../../theme/theme"

const LoginScreen = ({ navigation, route }) => {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState(route.params?.userType || "user")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const result = await login(email, password, userType)
      if (!result.success) {
        Alert.alert("Login Failed", result.error)
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    Alert.alert("Coming Soon", `${provider} login will be available soon`)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="hammer-wrench" size={60} color={colors.primary} />
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          {/* User Type Toggle */}
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, userType === "user" && styles.activeUserType]}
              onPress={() => setUserType("user")}
            >
              <MaterialCommunityIcons
                name="home"
                size={20}
                color={userType === "user" ? colors.surface : colors.text.secondary}
              />
              <Text style={[styles.userTypeText, userType === "user" && styles.activeUserTypeText]}>Homeowner</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.userTypeButton, userType === "worker" && styles.activeUserType]}
              onPress={() => setUserType("worker")}
            >
              <MaterialCommunityIcons
                name="wrench"
                size={20}
                color={userType === "worker" ? colors.surface : colors.text.secondary}
              />
              <Text style={[styles.userTypeText, userType === "worker" && styles.activeUserTypeText]}>
                Professional
              </Text>
            </TouchableOpacity>
          </View>

          {/* Email Input */}
          <TextInput
            label="Email"
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

          {/* Password Input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={!showPassword}
            autoComplete="password"
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />
            }
            style={styles.input}
            theme={{ colors: { primary: colors.primary } }}
          />

          {/* Forgot Password */}
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.loginButton}
            contentStyle={styles.buttonContent}
          >
            Sign In
          </Button>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <Divider style={styles.divider} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <Button
              mode="outlined"
              onPress={() => handleSocialLogin("Google")}
              style={styles.socialButton}
              icon="google"
            >
              Continue with Google
            </Button>

            <Button
              mode="outlined"
              onPress={() => handleSocialLogin("Facebook")}
              style={styles.socialButton}
              icon="facebook"
            >
              Continue with Facebook
            </Button>
          </View>
        </View>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register", { userType })}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingTop: spacing.xxl * 2,
    marginBottom: spacing.xl,
  },
  backButton: {
    alignSelf: "flex-start",
    padding: spacing.sm,
    marginBottom: spacing.lg,
  },
  logoContainer: {
    alignItems: "center",
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  formContainer: {
    flex: 1,
    gap: spacing.lg,
  },
  userTypeContainer: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    borderRadius: 25,
    padding: spacing.xs,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.sm,
  },
  activeUserType: {
    backgroundColor: colors.primary,
  },
  userTypeText: {
    ...typography.body2,
    color: colors.text.secondary,
    fontWeight: "600",
  },
  activeUserTypeText: {
    color: colors.surface,
  },
  input: {
    backgroundColor: colors.surface,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    ...typography.body2,
    color: colors.primary,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  divider: {
    flex: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  socialContainer: {
    gap: spacing.md,
  },
  socialButton: {
    borderColor: colors.border,
    borderRadius: 25,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  footerText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  signUpText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
})

export default LoginScreen
