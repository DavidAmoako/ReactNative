"use client"

import type React from "react"
import { useState, useRef } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native"
import { Button, Card } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors, typography, spacing } from "../../theme/theme"

const { width, height } = Dimensions.get("window")

interface OnboardingData {
  id: number
  title: string
  subtitle: string
  icon: string
  color: string
  description: string
  features: string[]
}

interface OnboardingScreenProps {
  navigation: any
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)

  const onboardingData: OnboardingData[] = [
    {
      id: 1,
      title: "Find Trusted Professionals",
      subtitle: "Connect with verified handymen and service providers in your area",
      icon: "account-check",
      color: colors.primary,
      description:
        "Browse through hundreds of skilled professionals who have been background-checked and verified for your safety and peace of mind.",
      features: ["Verified professionals", "Background checks", "Trusted reviews", "Local experts"],
    },
    {
      id: 2,
      title: "Book Services Instantly",
      subtitle: "Schedule appointments that fit your busy lifestyle",
      icon: "calendar-clock",
      color: colors.accent,
      description:
        "Choose your preferred time slots, get instant confirmations, and track your service provider in real-time.",
      features: ["Flexible scheduling", "Instant booking", "Real-time tracking", "Easy rescheduling"],
    },
    {
      id: 3,
      title: "Secure & Reliable",
      subtitle: "Safe payments and quality guaranteed",
      icon: "shield-check",
      color: colors.success,
      description:
        "Enjoy secure payment processing, insurance coverage, and our satisfaction guarantee on every service.",
      features: ["Secure payments", "Insurance coverage", "Money-back guarantee", "24/7 support"],
    },
  ]

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      })
    } else {
      navigation.replace("Welcome")
    }
  }

  const handleSkip = () => {
    navigation.replace("Welcome")
  }

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset
    const viewSize = event.nativeEvent.layoutMeasurement
    const pageNum = Math.floor(contentOffset.x / viewSize.width)
    setCurrentPage(pageNum)
  }

  const handleDotPress = (index: number) => {
    setCurrentPage(index)
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    })
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="wrench" size={32} color={colors.primary} />
          <Text style={styles.logoText}>TheHandyMan</Text>
        </View>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {onboardingData.map((item, index) => (
          <View key={item.id} style={styles.page}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                  <MaterialCommunityIcons name={item.icon} size={80} color={item.color} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={[styles.subtitle, { color: item.color }]}>{item.subtitle}</Text>
                <Text style={styles.description}>{item.description}</Text>

                <View style={styles.featuresContainer}>
                  {item.features.map((feature, featureIndex) => (
                    <View key={featureIndex} style={styles.feature}>
                      <MaterialCommunityIcons name="check-circle" size={16} color={item.color} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>

      {/* Page Indicators */}
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handleDotPress(index)} style={styles.indicatorButton}>
            <View
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentPage ? colors.primary : colors.border,
                  width: index === currentPage ? 24 : 8,
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        <Button mode="contained" onPress={handleNext} style={styles.nextButton} contentStyle={styles.buttonContent}>
          {currentPage === onboardingData.length - 1 ? "Get Started" : "Next"}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.5,
    paddingBottom: spacing.lg,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    ...typography.h3,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  skipButton: {
    padding: spacing.sm,
  },
  skipText: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.surface,
    elevation: 4,
    borderRadius: 16,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body1,
    textAlign: "center",
    marginBottom: spacing.lg,
    fontWeight: "600",
  },
  description: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  featuresContainer: {
    alignSelf: "stretch",
    gap: spacing.md,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  featureText: {
    ...typography.body2,
    color: colors.text.primary,
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  indicatorButton: {
    padding: spacing.xs,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
  },
  bottomContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
})

export default OnboardingScreen
