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
import { TextInput, Button, Checkbox, Divider } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"
import { colors, typography, spacing } from "../../theme/theme"

const RegisterScreen = ({ navigation, route }) => {
  const { register } = useAuth()
  const [userType, setUserType] = useState(route.params?.userType || "user")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bio: "", // For workers
    specialties: [], // For workers
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const specialtiesList = [
    "Carpentry",
    "Plumbing",
    "Electrical",
    "Painting",
    "Gardening",
    "Cleaning",
    "HVAC",
    "Roofing",
    "Flooring",
    "General Handyman",
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSpecialty = (specialty) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const validateForm = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all required fields")
      return false
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return false
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long")
      return false
    }

    if (!agreeToTerms) {
      Alert.alert("Error", "Please agree to the Terms of Service and Privacy Policy")
      return false
    }

    if (userType === "worker" && formData.specialties.length === 0) {
      Alert.alert("Error", "Please select at least one specialty")
      return false
    }

    return true
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const userData = {
        ...formData,
        userType,
      }

      const result = await register(userData)
      if (!result.success) {
        Alert.alert("Registration Failed", result.error)
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSocialRegister = (provider) => {
    Alert.alert("Coming Soon", `${provider} registration will be available soon`)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="hammer-wrench" size={60} color={colors.primary} />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join as a {userType === "user" ? "Homeowner" : "Professional"}</Text>
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

          {/* Name Fields */}
          <View style={styles.nameContainer}>
            <TextInput
              label="First Name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange("firstName", value)}
              mode="outlined"
              style={[styles.input, styles.nameInput]}
              theme={{ colors: { primary: colors.primary } }}
            />
            <TextInput
              label="Last Name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange("lastName", value)}
              mode="outlined"
              style={[styles.input, styles.nameInput]}
              theme={{ colors: { primary: colors.primary } }}
            />
          </View>

          {/* Email */}
          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
            theme={{ colors: { primary: colors.primary } }}
          />

          {/* Phone */}
          <TextInput
            label="Phone Number"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
            mode="outlined"
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
            style={styles.input}
            theme={{ colors: { primary: colors.primary } }}
          />

          {/* Password */}
          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange("password", value)}
            mode="outlined"
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />
            }
            style={styles.input}
            theme={{ colors: { primary: colors.primary } }}
          />

          {/* Confirm Password */}
          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange("confirmPassword", value)}
            mode="outlined"
            secureTextEntry={!showConfirmPassword}
            left={<TextInput.Icon icon="lock-check" />}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            style={styles.input}
            theme={{ colors: { primary: colors.primary } }}
          />

          {/* Worker-specific fields */}
          {userType === "worker" && (
            <>
              <TextInput
                label="Professional Bio"
                value={formData.bio}
                onChangeText={(value) => handleInputChange("bio", value)}
                mode="outlined"
                multiline
                numberOfLines={3}
                placeholder="Tell us about your experience and skills..."
                style={styles.input}
                theme={{ colors: { primary: colors.primary } }}
              />

              <View style={styles.specialtiesContainer}>
                <Text style={styles.specialtiesTitle}>Select Your Specialties</Text>
                <View style={styles.specialtiesGrid}>
                  {specialtiesList.map((specialty) => (
                    <TouchableOpacity
                      key={specialty}
                      style={[
                        styles.specialtyChip,
                        formData.specialties.includes(specialty) && styles.selectedSpecialty,
                      ]}
                      onPress={() => toggleSpecialty(specialty)}
                    >
                      <Text
                        style={[
                          styles.specialtyText,
                          formData.specialties.includes(specialty) && styles.selectedSpecialtyText,
                        ]}
                      >
                        {specialty}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <Checkbox
              status={agreeToTerms ? "checked" : "unchecked"}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
              color={colors.primary}
            />
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.linkText}>Terms of Service</Text> and{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Register Button */}
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

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <Divider style={styles.divider} />
          </View>

          {/* Social Registration */}
          <View style={styles.socialContainer}>
            <Button
              mode="outlined"
              onPress={() => handleSocialRegister("Google")}
              style={styles.socialButton}
              icon="google"
            >
              Continue with Google
            </Button>

            <Button
              mode="outlined"
              onPress={() => handleSocialRegister("Facebook")}
              style={styles.socialButton}
              icon="facebook"
            >
              Continue with Facebook
            </Button>
          </View>
        </View>

        {/* Sign In Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login", { userType })}>
            <Text style={styles.signInText}>Sign In</Text>
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
  nameContainer: {
    flexDirection: "row",
    gap: spacing.md,
  },
  nameInput: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.surface,
  },
  specialtiesContainer: {
    gap: spacing.md,
  },
  specialtiesTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  specialtiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  specialtyChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selectedSpecialty: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  specialtyText: {
    ...typography.body2,
    color: colors.text.primary,
  },
  selectedSpecialtyText: {
    color: colors.surface,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  termsText: {
    ...typography.body2,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 20,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  registerButton: {
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
  signInText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
})

export default RegisterScreen
