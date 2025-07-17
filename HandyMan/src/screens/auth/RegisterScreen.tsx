"use client"

import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { TextInput, Button, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"
import { colors, typography, spacing } from "../../theme/theme"

interface RegisterScreenProps {
  navigation: any
  route: {
    params?: {
      userType: "user" | "worker"
    }
  }
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const userType = route.params?.userType || "user"

  const handleRegister = async () => {
    const { name, email, phone, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long")
      return
    }

    setLoading(true)
    try {
      await register({
        name,
        email,
        phone,
        password,
        userType,
      })
    } catch (error) {
      Alert.alert("Registration Failed", "Please try again")
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Create Account</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Role Indicator */}
        <View style={styles.roleIndicator}>
          <MaterialCommunityIcons name={userType === "user" ? "home" : "wrench"} size={24} color={colors.primary} />
          <Text style={styles.roleText}>{userType === "user" ? "Homeowner Account" : "Professional Account"}</Text>
        </View>

        {/* Registration Form */}
        <Card style={styles.formCard}>
          <Card.Content style={styles.formContent}>
            <TextInput
              label="Full Name *"
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="account" />}
            />

            <TextInput
              label="Email Address *"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(value) => updateFormData("phone", value)}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
              left={<TextInput.Icon icon="phone" />}
            />

            <TextInput
              label="Password *"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />

            <TextInput
              label="Confirm Password *"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              left={<TextInput.Icon icon="lock-check" />}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? "eye-off" : "eye"}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
              contentStyle={styles.buttonContent}
            >
              Create Account
            </Button>
          </Card.Content>
        </Card>

        {/* Terms and Privacy */}
        <View style={styles.termsSection}>
          <Text style={styles.termsText}>
            By creating an account, you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInSection}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.signInLink}>Sign In</Text>
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
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
  roleIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${colors.primary}20`,
    padding: spacing.md,
    borderRadius: 25,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  roleText: {
    ...typography.body1,
    color: colors.primary,
    fontWeight: "600",
  },
  formCard: {
    backgroundColor: colors.surface,
    elevation: 2,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  formContent: {
    padding: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.background,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    marginTop: spacing.md,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  termsSection: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  termsText: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  signInSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  signInText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  signInLink: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
})

export default RegisterScreen
