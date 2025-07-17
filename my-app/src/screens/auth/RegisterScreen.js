"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native"
import { TextInput, Button, Card, SegmentedButtons, Checkbox } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuth } from "../../contexts/AuthContext"
import { theme } from "../../theme"

const RegisterScreen = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [userType, setUserType] = useState(route.params?.role || "user")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phone || !password) {
      Alert.alert("Error", "Please fill in all required fields")
      return
    }

    if (!agreeToTerms) {
      Alert.alert("Error", "Please agree to the Terms of Service and Privacy Policy")
      return
    }

    setLoading(true)
    try {
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        password,
        role: userType,
        bio: userType === "worker" ? bio : undefined,
      }

      const result = await register(userData)

      if (!result.success) {
        Alert.alert("Registration Failed", result.error || "Registration failed")
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our community today</Text>
        </View>

        {/* Registration Form */}
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

            {/* Name Inputs */}
            <View style={styles.nameRow}>
              <TextInput
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                mode="outlined"
                style={[styles.input, styles.nameInput]}
                left={<TextInput.Icon icon="account" />}
              />
              <TextInput
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                mode="outlined"
                style={[styles.input, styles.nameInput]}
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

            {/* Phone Input */}
            <View style={styles.inputGroup}>
              <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                mode="outlined"
                keyboardType="phone-pad"
                left={<TextInput.Icon icon="phone" />}
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

            {/* Bio Input (for workers) */}
            {userType === "worker" && (
              <View style={styles.inputGroup}>
                <TextInput
                  label="Professional Bio"
                  value={bio}
                  onChangeText={setBio}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  placeholder="Tell us about your skills and experience..."
                  style={styles.input}
                />
              </View>
            )}

            {/* Terms Checkbox */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={agreeToTerms ? "checked" : "unchecked"}
                onPress={() => setAgreeToTerms(!agreeToTerms)}
              />
              <Text style={styles.checkboxText}>
                I agree to the <Text style={styles.link}>Terms of Service</Text> and{" "}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>

            {/* Register Button */}
            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.registerButton}
            >
              Create Account
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
              onPress={() => Alert.alert("Info", "Google signup coming soon")}
              style={styles.socialButton}
            >
              Continue with Google
            </Button>

            <Button
              mode="outlined"
              icon="facebook"
              onPress={() => Alert.alert("Info", "Facebook signup coming soon")}
              style={styles.socialButton}
            >
              Continue with Facebook
            </Button>
          </Card.Content>
        </Card>

        {/* Sign In Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Button mode="text" onPress={() => navigation.navigate("Login")} style={styles.signInButton}>
            Sign in
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
  nameRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  nameInput: {
    flex: 1,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.onSurface,
    marginLeft: 8,
  },
  link: {
    color: theme.colors.primary,
    textDecorationLine: "underline",
  },
  registerButton: {
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
  signInButton: {
    marginLeft: -8,
  },
})

export default RegisterScreen
