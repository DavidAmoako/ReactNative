import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Button, Card, Chip } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { theme } from "../theme"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = ({ navigation }) => {
  const services = [
    { name: "Gardening", icon: "flower", color: "#10b981" },
    { name: "Carpentry", icon: "hammer", color: "#f59e0b" },
    { name: "Plumbing", icon: "pipe-wrench", color: "#3b82f6" },
    { name: "Electrical", icon: "lightning-bolt", color: "#8b5cf6" },
    { name: "Painting", icon: "format-paint", color: "#ef4444" },
    { name: "Cleaning", icon: "broom", color: "#06b6d4" },
  ]

  const features = [
    {
      icon: "shield-check",
      title: "Verified Professionals",
      description: "All service providers are background-checked",
    },
    {
      icon: "credit-card",
      title: "Secure Payments",
      description: "Safe payment processing with multiple options",
    },
    {
      icon: "star",
      title: "Quality Guaranteed",
      description: "Rating system ensures high-quality service",
    },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Icon name="wrench" size={40} color={theme.colors.primary} />
          <Text style={styles.logoText}>TheHandyMan</Text>
        </View>
        <Chip mode="outlined" style={styles.tagline}>
          Connecting Homeowners with Skilled Professionals
        </Chip>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          Your Home, Our <Text style={styles.heroAccent}>Expertise</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Find trusted professionals for all your household needs. From gardening to carpentry, we connect you with
          skilled workers who get the job done right.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Register", { role: "user" })}
            icon="plus"
          >
            Book a Service
          </Button>
          <Button
            mode="outlined"
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Register", { role: "worker" })}
            icon="briefcase"
          >
            Become a Provider
          </Button>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <Card key={index} style={styles.serviceCard}>
              <Card.Content style={styles.serviceContent}>
                <Icon name={service.icon} size={32} color={service.color} />
                <Text style={styles.serviceName}>{service.name}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose TheHandyMan?</Text>
        {features.map((feature, index) => (
          <Card key={index} style={styles.featureCard}>
            <Card.Content style={styles.featureContent}>
              <Icon name={feature.icon} size={24} color={theme.colors.primary} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* How it Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          {[
            { step: "1", title: "Choose a Service", description: "Browse categories and select what you need" },
            { step: "2", title: "Book a Professional", description: "Select from verified professionals in your area" },
            { step: "3", title: "Get It Done", description: "Relax while our professional takes care of everything" },
          ].map((item, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{item.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
        <Text style={styles.ctaSubtitle}>Join thousands of satisfied homeowners and skilled professionals</Text>
        <View style={styles.ctaButtons}>
          <Button
            mode="contained"
            style={styles.ctaButton}
            onPress={() => navigation.navigate("Register", { role: "user" })}
          >
            Book Your First Service
          </Button>
          <Button
            mode="outlined"
            style={styles.ctaButton}
            onPress={() => navigation.navigate("Register", { role: "worker" })}
          >
            Start Earning Today
          </Button>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button mode="text" onPress={() => navigation.navigate("Login")} style={styles.loginButton}>
          Already have an account? Sign In
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
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
    color: theme.colors.onBackground,
  },
  tagline: {
    backgroundColor: theme.colors.surface,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: theme.colors.onBackground,
  },
  heroAccent: {
    color: theme.colors.primary,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: theme.colors.onSurfaceVariant,
    marginBottom: 32,
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    paddingVertical: 8,
  },
  secondaryButton: {
    paddingVertical: 8,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: theme.colors.onBackground,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  serviceCard: {
    width: (width - 52) / 2,
    marginBottom: 12,
  },
  serviceContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  serviceName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  featureCard: {
    marginBottom: 12,
  },
  featureContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  stepsContainer: {
    gap: 24,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  stepNumberText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 32,
    textAlign: "center",
  },
  ctaButtons: {
    width: "100%",
    gap: 12,
  },
  ctaButton: {
    paddingVertical: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: "center",
  },
  loginButton: {
    marginTop: 16,
  },
})

export default WelcomeScreen
