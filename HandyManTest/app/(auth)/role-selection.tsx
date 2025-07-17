"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Button, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { colors, typography, spacing } from "../../src/theme/theme"

const { width } = Dimensions.get("window")

interface Role {
  id: "user" | "worker"
  title: string
  subtitle: string
  description: string
  icon: string
  features: string[]
}

const RoleSelectionScreen: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"user" | "worker" | null>(null)
  const router = useRouter()

  const roles: Role[] = [
    {
      id: "user",
      title: "I need services",
      subtitle: "Homeowner",
      description: "Find trusted professionals for your home repairs and maintenance",
      icon: "home",
      features: ["Browse service providers", "Book appointments", "Secure payments", "Rate and review"],
    },
    {
      id: "worker",
      title: "I provide services",
      subtitle: "Professional",
      description: "Offer your skills and grow your handyman business",
      icon: "wrench",
      features: ["Manage your services", "Accept bookings", "Get paid securely", "Build your reputation"],
    },
  ]

  const handleContinue = () => {
    if (selectedRole) {
      router.push({
        pathname: "/(auth)/register",
        params: { userType: selectedRole },
      })
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Choose Your Role</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.subtitle}>How would you like to use TheHandyMan?</Text>

      {/* Role Cards */}
      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <TouchableOpacity key={role.id} onPress={() => setSelectedRole(role.id)} style={styles.roleCardContainer}>
            <Card style={[styles.roleCard, selectedRole === role.id && styles.selectedCard]}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.roleHeader}>
                  <MaterialCommunityIcons
                    name={role.icon}
                    size={50}
                    color={selectedRole === role.id ? colors.primary : colors.accent}
                  />
                  <View style={styles.roleInfo}>
                    <Text style={styles.roleTitle}>{role.title}</Text>
                    <Text style={styles.roleSubtitle}>{role.subtitle}</Text>
                  </View>
                  {selectedRole === role.id && (
                    <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />
                  )}
                </View>

                <Text style={styles.roleDescription}>{role.description}</Text>

                <View style={styles.featuresContainer}>
                  {role.features.map((feature, index) => (
                    <View key={index} style={styles.feature}>
                      <MaterialCommunityIcons name="check" size={16} color={colors.primary} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={!selectedRole}
          style={[styles.continueButton, !selectedRole && styles.disabledButton]}
          contentStyle={styles.buttonContent}
        >
          Continue
        </Button>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={styles.loginLink}>
          <Text style={styles.loginLinkText}>Already have an account? Sign In</Text>
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
    marginBottom: spacing.md,
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
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  rolesContainer: {
    flex: 1,
    gap: spacing.lg,
  },
  roleCardContainer: {
    flex: 1,
  },
  roleCard: {
    backgroundColor: colors.surface,
    elevation: 2,
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
  },
  selectedCard: {
    borderColor: colors.primary,
    elevation: 4,
  },
  cardContent: {
    padding: spacing.lg,
    height: "100%",
  },
  roleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  roleInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  roleTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  roleSubtitle: {
    ...typography.body2,
    color: colors.accent,
    fontWeight: "600",
  },
  roleDescription: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  featuresContainer: {
    gap: spacing.sm,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  featureText: {
    ...typography.body2,
    color: colors.text.primary,
  },
  bottomContainer: {
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: colors.text.disabled,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  loginLink: {
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  loginLinkText: {
    ...typography.body2,
    color: colors.primary,
    textDecorationLine: "underline",
  },
})

export default RoleSelectionScreen
