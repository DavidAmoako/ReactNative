"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { colors, typography } from "../theme/theme"

const { width, height } = Dimensions.get("window")

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ),
    ]).start()
  }, [])

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <MaterialCommunityIcons name="hammer-wrench" size={80} color={colors.primary} />
        </Animated.View>
        <Text style={styles.appName}>TheHandyMan</Text>
        <Text style={styles.tagline}>Connect. Fix. Done.</Text>
      </Animated.View>

      <Animated.View style={[styles.loadingContainer, { opacity: fadeAnim }]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  appName: {
    ...typography.h1,
    color: colors.primary,
    marginTop: 20,
    fontWeight: "bold",
  },
  tagline: {
    ...typography.body1,
    color: colors.accent,
    marginTop: 10,
    fontStyle: "italic",
  },
  loadingContainer: {
    position: "absolute",
    bottom: 100,
  },
  loadingText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
})

export default SplashScreen
