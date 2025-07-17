import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Button, Card } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { theme } from "../theme"

const { width } = Dimensions.get("window")

const RoleSelectionScreen = ({ navigation }) => {
  const roles = [
    {
      id: "user",
      title: "I'm a Homeowner",
      subtitle: "Looking for services",
      description: "Find trusted professionals for home repairs, maintenance, and improvements",
      icon: "home",
      color: "#2563eb",
      features: ["Book services instantly", "Track service providers", "Secure payments", "Rate & review"],
    },
    {
      id: "worker",
      title: "I'm a Professional",
      subtitle: "Offering services",
      description: "Connect with homeowners and grow your business with flexible scheduling",
      icon: "briefcase",
      color: "#10b981",
      features: ["Flexible scheduling", "Grow your business", "Secure payments", "Build your reputation"],
    },
  ]

  const handleRoleSelect = (role) => {
    navigation.navigate("Register", { role })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Icon name="wrench" size={32} color={theme.colors.primary} />
          <Text style={styles.logoText}>TheHandyMan</Text>
        </View>
        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>How would you like to use TheHandyMan?</Text>
      </View>

      {/* Role Cards */}
      <View style={styles.rolesContainer}>
        {roles.map((role) => (
          <Card key={role.id} style={styles.roleCard}>
            <Card.Content style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: `${role.color}20` }]}>
                <Icon name={role.icon} size={48} color={role.color} />
              </View>

              <Text style={styles.roleTitle}>{role.title}</Text>
              <Text style={[styles.roleSubtitle, { color: role.color }]}>{role.subtitle}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>

              <View style={styles.featuresContainer}>
                {role.features.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Icon name="check-circle" size={16} color={role.color} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>

              <Button
                mode="contained"
                onPress={() => handleRoleSelect(role.id)}
                style={[styles.selectButton, { backgroundColor: role.color }]}
                contentStyle={styles.buttonContent}
              >
                Continue as {role.id === "user" ? "Homeowner" : "Professional"}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <Button mode="text" onPress={() => navigation.navigate("Login")} style={styles.loginButton}>
          Sign In
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
  },
  rolesContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  roleCard: {
    elevation: 4,
  },
  cardContent: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: theme.colors.onSurface,
  },
  roleSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    textAlign: "center",
  },
  roleDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  featuresContainer: {
    width: "100%",
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    marginLeft: 12,
    color: theme.colors.onSurface,
  },
  selectButton: {
    width: "100%",
    paddingVertical: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  loginButton: {
    marginTop: 8,
  },
})

export default RoleSelectionScreen
