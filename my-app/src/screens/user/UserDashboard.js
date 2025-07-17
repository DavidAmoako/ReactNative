"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from "react-native"
import { Card, Button, Chip, Avatar, Searchbar, FAB } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuth } from "../../contexts/AuthContext"
import { apiClient } from "../../services/apiClient"
import { theme } from "../../theme"

const UserDashboard = ({ navigation }) => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [recentBookings, setRecentBookings] = useState([])
  const [popularServices, setPopularServices] = useState([])
  const [loading, setLoading] = useState(true)

  const services = [
    { name: "Gardening", icon: "flower", color: "#10b981", category: "outdoor" },
    { name: "Carpentry", icon: "hammer", color: "#f59e0b", category: "repair" },
    { name: "Plumbing", icon: "pipe-wrench", color: "#3b82f6", category: "repair" },
    { name: "Electrical", icon: "lightning-bolt", color: "#8b5cf6", category: "repair" },
    { name: "Painting", icon: "format-paint", color: "#ef4444", category: "improvement" },
    { name: "Cleaning", icon: "broom", color: "#06b6d4", category: "maintenance" },
    { name: "HVAC", icon: "air-conditioner", color: "#84cc16", category: "repair" },
    { name: "Roofing", icon: "home-roof", color: "#f97316", category: "repair" },
  ]

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [bookingsResponse, servicesResponse] = await Promise.all([apiClient.getBookings(), apiClient.getServices()])

      if (bookingsResponse.success) {
        setRecentBookings(bookingsResponse.data.slice(0, 3))
      }

      if (servicesResponse.success) {
        setPopularServices(servicesResponse.data.slice(0, 6))
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const handleServicePress = (service) => {
    navigation.navigate("Book Service", { service })
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b"
      case "confirmed":
        return "#10b981"
      case "in_progress":
        return "#3b82f6"
      case "completed":
        return "#6b7280"
      case "cancelled":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.userName}>{user?.firstName || "User"}!</Text>
            </View>
            <Avatar.Text size={48} label={user?.firstName?.[0] || "U"} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search for services..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            icon="magnify"
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Card style={styles.quickActionCard}>
              <Card.Content style={styles.quickActionContent}>
                <Icon name="plus-circle" size={32} color={theme.colors.primary} />
                <Text style={styles.quickActionText}>Book Service</Text>
              </Card.Content>
            </Card>
            <Card style={styles.quickActionCard}>
              <Card.Content style={styles.quickActionContent}>
                <Icon name="history" size={32} color={theme.colors.secondary} />
                <Text style={styles.quickActionText}>View History</Text>
              </Card.Content>
            </Card>
            <Card style={styles.quickActionCard}>
              <Card.Content style={styles.quickActionContent}>
                <Icon name="message" size={32} color={theme.colors.tertiary} />
                <Text style={styles.quickActionText}>Messages</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <Button mode="text" onPress={() => navigation.navigate("Book Service")}>
              View All
            </Button>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            {services.map((service, index) => (
              <Card key={index} style={styles.serviceCard} onPress={() => handleServicePress(service)}>
                <Card.Content style={styles.serviceContent}>
                  <View style={[styles.serviceIcon, { backgroundColor: `${service.color}20` }]}>
                    <Icon name={service.icon} size={24} color={service.color} />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            <Button mode="text" onPress={() => navigation.navigate("History")}>
              View All
            </Button>
          </View>
          {recentBookings.length > 0 ? (
            recentBookings.map((booking, index) => (
              <Card key={index} style={styles.bookingCard}>
                <Card.Content style={styles.bookingContent}>
                  <View style={styles.bookingHeader}>
                    <Text style={styles.bookingService}>{booking.service || "General Service"}</Text>
                    <Chip
                      mode="outlined"
                      textStyle={{ color: getStatusColor(booking.status) }}
                      style={{ borderColor: getStatusColor(booking.status) }}
                    >
                      {booking.status || "pending"}
                    </Chip>
                  </View>
                  <Text style={styles.bookingWorker}>Worker: {booking.workerName || "To be assigned"}</Text>
                  <Text style={styles.bookingDate}>
                    {booking.scheduledDate
                      ? new Date(booking.scheduledDate).toLocaleDateString()
                      : "Date to be confirmed"}
                  </Text>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Icon name="calendar-blank" size={48} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.emptyTitle}>No Recent Bookings</Text>
                <Text style={styles.emptySubtitle}>Book your first service to get started!</Text>
                <Button mode="contained" onPress={() => navigation.navigate("Book Service")} style={styles.emptyButton}>
                  Book a Service
                </Button>
              </Card.Content>
            </Card>
          )}
        </View>

        {/* Tips & Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips & Recommendations</Text>
          <Card style={styles.tipCard}>
            <Card.Content style={styles.tipContent}>
              <Icon name="lightbulb" size={24} color={theme.colors.tertiary} />
              <View style={styles.tipText}>
                <Text style={styles.tipTitle}>Seasonal Maintenance</Text>
                <Text style={styles.tipDescription}>
                  Spring is the perfect time for garden maintenance and exterior cleaning services.
                </Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate("Book Service")} label="Book Service" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    elevation: 2,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.onBackground,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    elevation: 2,
  },
  quickActionContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  servicesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  serviceCard: {
    width: 100,
    marginRight: 12,
    elevation: 2,
  },
  serviceContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  bookingCard: {
    marginBottom: 12,
    elevation: 2,
  },
  bookingContent: {
    paddingVertical: 16,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  bookingWorker: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  emptyCard: {
    elevation: 2,
  },
  emptyContent: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 24,
  },
  tipCard: {
    elevation: 2,
  },
  tipContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
  },
  tipText: {
    marginLeft: 16,
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
})

export default UserDashboard
