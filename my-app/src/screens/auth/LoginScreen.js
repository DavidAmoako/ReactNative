"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native"
import { TextInput, Button, Card, SegmentedButtons } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuth } from "../../contexts/AuthContext"
import { theme } from "../../theme"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("user")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const result = await login(email, password, userType)

      if (!result.success) {
        Alert.alert("Login Failed", result.error || "Invalid credentials")
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const userTypeOptions = [
    { value: "user", label: "Homeowner" },
    { value: "worker", label: "Professional" },
    { value: "admin", label: "Admin" },
  ]

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="wrench" size={32} color={theme.colors.primary} />
            <Text style={styles.logoText}>TheHandyMan</Text>
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        {/* Login Form */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            {/* User Type Selector */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Type</Text>
              <SegmentedButtons
                value={userType}
                onValueChange={setUserType}
                buttons={userTypeOptions}
                style={styles.segmentedButtons}
              />
            </View>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                left={<TextInput.Icon icon="email" />}
                style={styles.input}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye-off" : "eye"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                style={styles.input}
              />
            </View>

            {/* Forgot Password */}
            <Button
              mode="text"
              onPress={() => Alert.alert("Info", "Forgot password functionality coming soon")}
              style={styles.forgotPassword}
            >
              Forgot password?
            </Button>

            {/* Login Button */}
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
            >
              Sign In
            </Button>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <Button
              mode="outlined"
              icon="google"
              onPress={() => Alert.alert("Info", "Google login coming soon")}
              style={styles.socialButton}
            >
              Continue with Google
            </Button>

            <Button
              mode="outlined"
              icon="facebook"
              onPress={() => Alert.alert("Info", "Facebook login coming soon")}
              style={styles.socialButton}
            >
              Continue with Facebook
            </Button>
          </Card.Content>
        </Card>

        {/* Sign Up Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Button mode="text" onPress={() => navigation.navigate("Register")} style={styles.signUpButton}>
            Sign up
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    color: theme.colors.onBackground,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.onBackground,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  card: {
    marginBottom: 24,
  },
  cardContent: {
    paddingVertical: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: theme.colors.onSurface,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  loginButton: {
    paddingVertical: 8,
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.outline,
  },
  dividerText: {
    marginHorizontal: 16,
    color: theme.colors.onSurfaceVariant,
    fontSize: 14,
  },
  socialButton: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  signUpButton: {
    marginLeft: -8,
  },
})

export default LoginScreen
