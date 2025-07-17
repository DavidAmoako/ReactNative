"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native"
import { Button, Card } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { theme } from "../theme"

const { width, height } = Dimensions.get("window")

const OnboardingScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const scrollViewRef = useRef(null)

  const onboardingData = [
    {
      id: 1,
      title: "Find Trusted Professionals",
      subtitle: "Connect with verified handymen and service providers in your area",
      icon: "account-check",
      color: "#2563eb",
      description:
        "Browse through hundreds of skilled professionals who have been background-checked and verified for your safety and peace of mind.",
    },
    {
      id: 2,
      title: "Book Services Instantly",
      subtitle: "Schedule appointments that fit your busy lifestyle",
      icon: "calendar-clock",
      color: "#10b981",
      description:
        "Choose your preferred time slots, get instant confirmations, and track your service provider in real-time.",
    },
    {
      id: 3,
      title: "Secure & Reliable",
      subtitle: "Safe payments and quality guaranteed",
      icon: "shield-check",
      color: "#f59e0b",
      description:
        "Enjoy secure payment processing, insurance coverage, and our satisfaction guarantee on every service.",
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

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset
    const viewSize = event.nativeEvent.layoutMeasurement
    const pageNum = Math.floor(contentOffset.x / viewSize.width)
    setCurrentPage(pageNum)
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Icon name="wrench" size={32} color={theme.colors.primary} />
          <Text style={styles.logoText}>TheHandyMan</Text>
        </View>
        <Button mode="text" onPress={handleSkip} style={styles.skipButton}>
          Skip
        </Button>
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
                  <Icon name={item.icon} size={80} color={item.color} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </ScrollView>

      {/* Page Indicators */}
      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: index === currentPage ? theme.colors.primary : theme.colors.outline,
                width: index === currentPage ? 24 : 8,
              },
            ]}
          />
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
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
    color: theme.colors.onBackground,
  },
  skipButton: {
    marginRight: -8,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    marginHorizontal: 10,
    elevation: 4,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: theme.colors.onSurface,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: theme.colors.primary,
    fontWeight: "500",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    color: theme.colors.onSurfaceVariant,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    transition: "all 0.3s ease",
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  nextButton: {
    paddingVertical: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
})

export default OnboardingScreen
