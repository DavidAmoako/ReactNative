"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, RefreshControl, Alert } from "react-native"
import { Card, Button, Chip, Searchbar, SegmentedButtons } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { apiClient } from "../../services/apiClient"
import { theme } from "../../theme"

const BookingHistoryScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock bookings data
  const mockBookings = [
    {
      id: 1,
      service: "Plumbing",
      workerName: "John Smith",
      scheduledDate: "2024-01-20T14:00:00Z",
      completedDate: "2024-01-20T16:30:00Z",
      status: "completed",
      amount: 150,
      rating: 5,
      address: "123 Main St, City",
      description: "Fixed kitchen sink leak",
    },
    {
      id: 2,
      service: "Cleaning",
      workerName: "Maria Garcia",
      scheduledDate: "2024-01-18T10:00:00Z",
      completedDate: null,
      status: "confirmed",
      amount: 80,
      rating: null,
      address: "456 Oak Ave, City",
      description: "Deep cleaning of living room and kitchen",
    },
    {
      id: 3,
      service: "Gardening",
      workerName: "David Wilson",
      scheduledDate: "2024-01-15T09:00:00Z",
      completedDate: "2024-01-15T12:00:00Z",
      status: "completed",
      amount: 120,
      rating: 4,
      address: "789 Pine St, City",
      description: "Lawn mowing and hedge trimming",
    },
    {
      id: 4,
      service: "Electrical",
      workerName: "Sarah Johnson",
      scheduledDate: "2024-01-25T13:00:00Z",
      completedDate: null,
      status: "pending",
      amount: 200,
      rating: null,
      address: "321 Elm St, City",
      description: "Install new ceiling fan in bedroom",
    },
  ]

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ]

  useEffect(() => {
    loadBookings()
  }, [])

  useEffect(() => {
    filterBookings()
  }, [bookings, searchQuery, statusFilter])

  const loadBookings = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getBookings()

      if (response.success) {
        setBookings(response.data)
      } else {
        // Use mock data if API fails
        setBookings(mockBookings)
      }
    } catch (error) {
      setBookings(mockBookings)
    } finally {
      setLoading(false)
    }
  }

  const filterBookings = () => {
    let filtered = bookings

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (booking) =>
          booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.workerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          booking.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredBookings(filtered)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadBookings()
    setRefreshing(false)
  }

  const handleBookingPress = (booking) => {
    navigation.navigate("BookingDetail", { booking })
  }

  const handleRateService = (booking) => {
    Alert.alert("Rate Service", `Rate your experience with ${booking.workerName}`)
  }

  const handleRebookService = (booking) => {
    navigation.navigate("Book Service", { service: { name: booking.service } })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b"
      case "confirmed":
        return "#3b82f6"
      case "completed":
        return "#10b981"
      case "cancelled":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Icon key={i} name={i <= rating ? "star" : "star-outline"} size={16} color="#f59e0b" />)
    }
    return stars
  }

  const renderBookingItem = ({ item }) => (
    <Card style={styles.bookingCard} onPress={() => handleBookingPress(item)}>
      <Card.Content style={styles.bookingContent}>
        <View style={styles.bookingHeader}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Chip
            mode="outlined"
            textStyle={{ color: getStatusColor(item.status) }}
            style={{ borderColor: getStatusColor(item.status) }}
          >
            {item.status}
          </Chip>
        </View>

        <Text style={styles.workerName}>👨‍🔧 {item.workerName}</Text>
        <Text style={styles.address}>📍 {item.address}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.bookingDetails}>
          <Text style={styles.scheduledDate}>📅 {formatDate(item.scheduledDate)}</Text>
          <Text style={styles.amount}>💰 ${item.amount}</Text>
        </View>

        {item.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Your Rating: </Text>
            <View style={styles.stars}>{renderStars(item.rating)}</View>
          </View>
        )}

        <View style={styles.bookingActions}>
          {item.status === "completed" && !item.rating && (
            <Button mode="outlined" onPress={() => handleRateService(item)} style={styles.actionButton} icon="star">
              Rate Service
            </Button>
          )}
          {item.status === "completed" && (
            <Button
              mode="contained"
              onPress={() => handleRebookService(item)}
              style={styles.actionButton}
              icon="refresh"
            >
              Book Again
            </Button>
          )}
          {item.status === "pending" && (
            <Button
              mode="outlined"
              onPress={() => Alert.alert("Info", "Cancel booking feature coming soon")}
              style={styles.actionButton}
              textColor="#ef4444"
              icon="close"
            >
              Cancel
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Booking History</Text>
        <Text style={styles.subtitle}>Track your service bookings</Text>
      </View>

      {/* Search and Filter */}
      <View style={styles.filtersContainer}>
        <Searchbar
          placeholder="Search bookings..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <SegmentedButtons
          value={statusFilter}
          onValueChange={setStatusFilter}
          buttons={statusOptions}
          style={styles.statusFilter}
        />
      </View>

      {/* Bookings List */}
      <FlatList
        data={filteredBookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.bookingsList}
        contentContainerStyle={styles.bookingsContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="history" size={64} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyTitle}>No Bookings Found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filter"
                : "Your booking history will appear here"}
            </Text>
            {!searchQuery && statusFilter === "all" && (
              <Button
                mode="contained"
                onPress={() => navigation.navigate("Book Service")}
                style={styles.emptyButton}
                icon="plus"
              >
                Book Your First Service
              </Button>
            )}
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  searchBar: {
    elevation: 2,
  },
  statusFilter: {
    backgroundColor: theme.colors.surface,
  },
  bookingsList: {
    flex: 1,
  },
  bookingsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bookingCard: {
    marginBottom: 16,
    elevation: 2,
  },
  bookingContent: {
    paddingVertical: 16,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.onSurface,
    flex: 1,
  },
  workerName: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: theme.colors.onSurface,
    marginBottom: 12,
    lineHeight: 20,
  },
  bookingDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  scheduledDate: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.secondary,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingLabel: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginRight: 8,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  bookingActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: theme.colors.onSurface,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  emptyButton: {
    paddingHorizontal: 24,
  },
})

export default BookingHistoryScreen
