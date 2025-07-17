"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { Card, Button, Avatar, Chip, Searchbar } from "react-native-paper"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../../contexts/AuthContext"
import { colors, typography, spacing } from "../../theme/theme"

interface Service {
  id: string
  name: string
  icon: string
  color: string
}

interface Provider {
  id: string
  name: string
  rating: number
  reviews: number
  services: string[]
  image: string
  distance: string
}

interface Booking {
  id: string
  service: string
  provider: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
}

const UserDashboard: React.FC = () => {
  const { user } = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const services: Service[] = [
    { id: "1", name: "Plumbing", icon: "pipe-wrench", color: colors.primary },
    { id: "2", name: "Electrical", icon: "lightning-bolt", color: colors.accent },
    { id: "3", name: "Carpentry", icon: "hammer", color: "#8B4513" },
    { id: "4", name: "Gardening", icon: "flower", color: "#228B22" },
    { id: "5", name: "Cleaning", icon: "broom", color: "#4169E1" },
    { id: "6", name: "Painting", icon: "format-paint", color: "#FF6347" },
  ]

  const featuredProviders: Provider[] = [
    {
      id: "1",
      name: "John Smith",
      rating: 4.8,
      reviews: 127,
      services: ["Plumbing", "Electrical"],
      image: "https://via.placeholder.com/100",
      distance: "2.3 km",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      rating: 4.9,
      reviews: 89,
      services: ["Cleaning", "Gardening"],
      image: "https://via.placeholder.com/100",
      distance: "1.8 km",
    },
  ]

  const upcomingBookings: Booking[] = [
    {
      id: "1",
      service: "Plumbing",
      provider: "John Smith",
      date: "Today",
      time: "2:00 PM",
      status: "upcoming",
    },
    {
      id: "2",
      service: "Gardening",
      provider: "Sarah Johnson",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "upcoming",
    },
  ]

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{user?.name}</Text>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="bell" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <Searchbar
          placeholder="Search for services..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: `${service.color}20` }]}>
                <MaterialCommunityIcons name={service.icon} size={24} color={service.color} />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingBookings.map((booking) => (
            <Card key={booking.id} style={styles.bookingCard}>
              <Card.Content style={styles.bookingContent}>
                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingService}>{booking.service}</Text>
                  <Text style={styles.bookingProvider}>with {booking.provider}</Text>
                  <Text style={styles.bookingTime}>
                    {booking.date} at {booking.time}
                  </Text>
                </View>
                <Chip mode="outlined" style={styles.statusChip}>
                  {booking.status}
                </Chip>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

      {/* Featured Providers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Providers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {featuredProviders.map((provider) => (
          <Card key={provider.id} style={styles.providerCard}>
            <Card.Content style={styles.providerContent}>
              <Avatar.Image size={60} source={{ uri: provider.image }} />
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{provider.rating}</Text>
                  <Text style={styles.reviews}>({provider.reviews} reviews)</Text>
                </View>
                <Text style={styles.distance}>{provider.distance} away</Text>
                <View style={styles.servicesContainer}>
                  {provider.services.map((service, index) => (
                    <Chip key={index} mode="outlined" compact style={styles.serviceChip}>
                      {service}
                    </Chip>
                  ))}
                </View>
              </View>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>View</Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Quick Book Button */}
      <View style={styles.quickBookSection}>
        <Button mode="contained" style={styles.quickBookButton} contentStyle={styles.quickBookContent} icon="plus">
          Book a Service
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 1.5,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  userName: {
    ...typography.h3,
    color: colors.text.primary,
  },
  searchBar: {
    backgroundColor: colors.background,
    elevation: 0,
    borderRadius: 25,
  },
  searchInput: {
    ...typography.body2,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
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
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  serviceCard: {
    alignItems: "center",
    width: "30%",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 12,
    elevation: 1,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  serviceName: {
    ...typography.body2,
    color: colors.text.primary,
    textAlign: "center",
    fontWeight: "500",
  },
  bookingCard: {
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  bookingContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: "600",
  },
  bookingProvider: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  bookingTime: {
    ...typography.body2,
    color: colors.primary,
    fontWeight: "500",
  },
  statusChip: {
    backgroundColor: `${colors.primary}20`,
  },
  providerCard: {
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    elevation: 1,
  },
  providerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    ...typography.body1,
    color: colors.text.primary,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  rating: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: "500",
  },
  reviews: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  distance: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  servicesContainer: {
    flexDirection: "row",
    gap: spacing.xs,
    flexWrap: "wrap",
  },
  serviceChip: {
    height: 24,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  bookButtonText: {
    ...typography.body2,
    color: colors.surface,
    fontWeight: "600",
  },
  quickBookSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  quickBookButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  quickBookContent: {
    paddingVertical: spacing.sm,
  },
})

export default UserDashboard
