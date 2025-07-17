import type React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors, typography, spacing } from "../../theme/theme"

const WorkerDashboard: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Worker Dashboard</Text>
      <Text style={styles.subtitle}>Manage your services and bookings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
  },
})

export default WorkerDashboard
