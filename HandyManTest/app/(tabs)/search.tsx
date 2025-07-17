import { View, Text, StyleSheet } from "react-native"
import { colors, typography } from "../../src/theme/theme"

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Services</Text>
      <Text style={styles.subtitle}>Find the perfect service provider for your needs</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: 10,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
  },
})
