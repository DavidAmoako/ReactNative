"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Dimensions } from "react-native"
import { Card, Searchbar, Avatar, Chip, FAB } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"
import { colors, typography, spacing } from "../../theme/theme"

const { width } = Dimensions.get("window")

const UserDashboard = ({ navigation }) => {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [featuredProviders, setFeaturedProviders] = useState([])

  const serviceCategories = [
    { name: "Carpentry", icon: "hammer", color: colors.accent, count: 24 },
    { name: "Plumbing", icon: "pipe-wrench", color: colors.primary, count: 18 },
    { name: "Electrical", icon: "lightning-bolt", color: "#FF9800", count: 15 },
    { name: "Painting", icon: "format-paint", color: "#E91E63", count: 32 },
    { name: "Gardening", icon: "flower", color: "#4CAF50", count: 28 },
    { name: "Cleaning", icon: "broom", color: "#2196F3", count: 45 },
    { name: "HVAC", icon: "air-conditioner", color: "#9C27B0", count: 12 },
    { name: "General", icon: "wrench", color: colors.text.secondary, count: 67 },
  ]

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    // Mock data - replace with actual API calls
    setUpcomingBookings([
      {
        id: 1,
        service: "Plumbing Repair",
        provider: "John Smith",
        date: "2024-01-20",
        time: "10:00 AM",
        status: "confirmed",
      },
      {
        id: 2,
        service: "Garden Maintenance",
        provider: "Sarah Johnson",
        date: "2024-01-22",
        time: "2:00 PM",
        status: "pending",
      },
    ])

    setFeaturedProviders([
      {
        id: 1,
        name: "Mike Wilson",
        service: "Carpentry",
        rating: 4.9,
        reviews: 127,
        price: "$45/hr",
        avatar: "MW",
        badge: "Top Rated",
      },
      {
        id: 2,
        name: "Lisa Chen",
        service: "Cleaning",
        rating: 4.8,
        reviews: 89,
        price: "$35/hr",
        avatar: "LC",
        badge: "Fast Response",
      },
    ])
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const renderServiceCategory = (category, index) => (
    <TouchableOpacity
      key={index}
      style={styles.categoryCard}
      onPress={() => navigation.navigate("Search", { category: category.name })}
    >
      <Card style={styles.categoryCardInner}>
        <Card.Content style={styles.categoryContent}>
          <MaterialCommunityIcons name={category.icon} size={32} color={category.color} />
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categoryCount}>{category.count} providers</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )

  const renderUpcomingBooking = (booking) => (
    <Card key={booking.id} style={styles.bookingCard}>
      <Card.Content style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingService}>{booking.service}</Text>
          <Chip
            mode="outlined"
            style={[
              styles.statusChip,
              { borderColor: booking.status === "confirmed" ? colors.primary : colors.accent },
            ]}
          >
            {booking.status}
          </Chip>
        </View>
        <Text style={styles.bookingProvider}>👨‍🔧 {booking.provider}</Text>
        <Text style={styles.bookingDateTime}>
          📅 {booking.date} at {booking.time}
        </Text>
      </Card.Content>
    </Card>
  )

  const renderFeaturedProvider = (provider) => (
    <Card
      key={provider.id}
      style={styles.providerCard}
      onPress={() => navigation.navigate("ProviderProfile", { providerId: provider.id })}
    >
      <Card.Content style={styles.providerContent}>
        <View style={styles.providerHeader}>
          <Avatar.Text size={48} label={provider.avatar} />
          <View style={styles.providerInfo}>
            <View style={styles.providerNameRow}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Chip mode="outlined" compact style={styles.providerBadge}>
                {provider.badge}
              </Chip>
            </View>
            <Text style={styles.providerService}>{provider.service}</Text>
            <View style={styles.providerRating}>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{provider.rating}</Text>
              <Text style={styles.reviewsText}>({provider.reviews} reviews)</Text>
            </View>
          </View>
        </View>
        <View style={styles.providerFooter}>
          <Text style={styles.providerPrice}>{provider.price}</Text>
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{user?.firstName || "User"}!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search for services or providers..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            onSubmitEditing={() => navigation.navigate("Search", { query: searchQuery })}
          />
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <View style={styles.categoriesGrid}>{serviceCategories.map(renderServiceCategory)}</View>
        </View>

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Bookings")}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {upcomingBookings.map(renderUpcomingBooking)}
          </View>
        )}

        {/* Featured Providers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Professionals</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {featuredProviders.map(renderFeaturedProvider)}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("Search")}>
              <MaterialCommunityIcons name="magnify" size={24} color={colors.primary} />
              <Text style={styles.quickActionText}>Find Services</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("Bookings")}>
              <MaterialCommunityIcons name="calendar-check" size={24} color={colors.primary} />
              <Text style={styles.quickActionText}>My Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction} onPress={() => navigation.navigate("Messages")}>
              <MaterialCommunityIcons name="message" size={24} color={colors.primary} />
              <Text style={styles.quickActionText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate("Search")} label="Book Service" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  userName: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  searchBar: {
    backgroundColor: colors.surface,
    elevation: 2,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  seeAllText: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  categoryCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
  },
  categoryCardInner: {
    backgroundColor: colors.surface,
    elevation: 2,
  },
  categoryContent: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  categoryName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: "600",
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  categoryCount: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  bookingCard: {
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
    elevation: 2,
  },
  bookingContent: {
    paddingVertical: spacing.md,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  bookingService: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: "600",
    flex: 1,
  },
  statusChip: {
    height: 28,
  },
  bookingProvider: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  bookingDateTime: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  providerCard: {
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
    elevation: 2,
  },
  providerContent: {
    paddingVertical: spacing.md,
  },
  providerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  providerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  providerNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  providerName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: "600",
    flex: 1,
  },
  providerBadge: {
    height: 24,
    marginLeft: spacing.sm,
  },
  providerService: {
    ...typography.body2,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  providerRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },
  reviewsText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  providerFooter: {
    alignItems: "flex-end",
  },
  providerPrice: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: "bold",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.md,
  },
  quickAction: {
    alignItems: "center",
    padding: spacing.md,
  },
  quickActionText: {
    ...typography.caption,
    color: colors.text.primary,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    margin: spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
})

export default UserDashboard
