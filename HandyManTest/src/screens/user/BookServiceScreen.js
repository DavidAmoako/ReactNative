"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions } from "react-native"
import { Card, Button, TextInput, Chip, Avatar, Searchbar } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { apiClient } from "../../services/apiClient"
import { theme } from "../../theme"

const { width } = Dimensions.get("window")

const BookServiceScreen = ({ navigation, route }) => {
  const [selectedService, setSelectedService] = useState(route.params?.service || null)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(false)

  const services = [
    { name: "Gardening", icon: "flower", color: "#10b981", price: "$50-80/hr" },
    { name: "Carpentry", icon: "hammer", color: "#f59e0b", price: "$60-100/hr" },
    { name: "Plumbing", icon: "pipe-wrench", color: "#3b82f6", price: "$70-120/hr" },
    { name: "Electrical", icon: "lightning-bolt", color: "#8b5cf6", price: "$80-150/hr" },
    { name: "Painting", icon: "format-paint", color: "#ef4444", price: "$40-70/hr" },
    { name: "Cleaning", icon: "broom", color: "#06b6d4", price: "$30-50/hr" },
    { name: "HVAC", icon: "air-conditioner", color: "#84cc16", price: "$90-160/hr" },
    { name: "Roofing", icon: "home-roof", color: "#f97316", price: "$80-140/hr" },
  ]

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ]

  // Mock workers data
  const mockWorkers = [
    {
      id: 1,
      name: "John Smith",
      rating: 4.9,
      reviews: 127,
      specialties: ["Plumbing", "Electrical"],
      hourlyRate: 85,
      avatar: "JS",
      distance: "2.3 km",
      available: true,
    },
    {
      id: 2,
      name: "Maria Garcia",
      rating: 4.8,
      reviews: 89,
      specialties: ["Cleaning", "Gardening"],
      hourlyRate: 45,
      avatar: "MG",
      distance: "1.8 km",
      available: true,
    },
    {
      id: 3,
      name: "David Wilson",
      rating: 4.7,
      reviews: 156,
      specialties: ["Carpentry", "Painting"],
      hourlyRate: 75,
      avatar: "DW",
      distance: "3.1 km",
      available: false,
    },
  ]

  useEffect(() => {
    setWorkers(mockWorkers)
  }, [])

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setSelectedWorker(null)
  }

  const handleWorkerSelect = (worker) => {
    if (!worker.available) {
      Alert.alert("Unavailable", "This worker is currently not available")
      return
    }
    setSelectedWorker(worker)
  }

  const handleBookService = async () => {
    if (!selectedService || !selectedWorker || !description || !address || !selectedDate || !selectedTime) {
      Alert.alert("Missing Information", "Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      const bookingData = {
        service: selectedService.name,
        workerId: selectedWorker.id,
        description,
        address,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        estimatedCost: selectedWorker.hourlyRate,
      }

      const response = await apiClient.bookService(bookingData)

      if (response.success) {
        Alert.alert(
          "Booking Confirmed!",
          `Your ${selectedService.name} service has been booked with ${selectedWorker.name} for ${selectedDate} at ${selectedTime}.`,
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Dashboard"),
            },
          ],
        )
      } else {
        Alert.alert("Booking Failed", response.error)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to book service")
    } finally {
      setLoading(false)
    }
  }

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.specialties.some((specialty) => specialty.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Book a Service</Text>
        <Text style={styles.subtitle}>Choose a service and professional</Text>
      </View>

      {/* Service Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Service</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
          {services.map((service, index) => (
            <Card
              key={index}
              style={[styles.serviceCard, selectedService?.name === service.name && styles.selectedServiceCard]}
              onPress={() => handleServiceSelect(service)}
            >
              <Card.Content style={styles.serviceContent}>
                <View style={[styles.serviceIcon, { backgroundColor: `${service.color}20` }]}>
                  <Icon name={service.icon} size={24} color={service.color} />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {selectedService && (
        <>
          {/* Service Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Service Details</Text>
            <TextInput
              label="Describe your needs"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              placeholder="Please describe what you need help with..."
              style={styles.input}
            />
            <TextInput
              label="Service Address"
              value={address}
              onChangeText={setAddress}
              mode="outlined"
              placeholder="Enter your address"
              style={styles.input}
              left={<TextInput.Icon icon="map-marker" />}
            />
          </View>

          {/* Date and Time Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Schedule</Text>
            <View style={styles.scheduleContainer}>
              <TextInput
                label="Date"
                value={selectedDate}
                onChangeText={setSelectedDate}
                mode="outlined"
                placeholder="YYYY-MM-DD"
                style={[styles.input, styles.dateInput]}
                left={<TextInput.Icon icon="calendar" />}
              />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeSlots}>
                {timeSlots.map((time, index) => (
                  <Chip
                    key={index}
                    mode={selectedTime === time ? "flat" : "outlined"}
                    selected={selectedTime === time}
                    onPress={() => setSelectedTime(time)}
                    style={styles.timeChip}
                  >
                    {time}
                  </Chip>
                ))}
              </ScrollView>
            </View>
          </View>

          {/* Worker Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Professional</Text>
            <Searchbar
              placeholder="Search professionals..."
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
            />
            {filteredWorkers.map((worker, index) => (
              <Card
                key={index}
                style={[
                  styles.workerCard,
                  selectedWorker?.id === worker.id && styles.selectedWorkerCard,
                  !worker.available && styles.unavailableWorkerCard,
                ]}
                onPress={() => handleWorkerSelect(worker)}
              >
                <Card.Content style={styles.workerContent}>
                  <View style={styles.workerHeader}>
                    <Avatar.Text size={48} label={worker.avatar} />
                    <View style={styles.workerInfo}>
                      <Text style={styles.workerName}>{worker.name}</Text>
                      <View style={styles.workerRating}>
                        <Icon name="star" size={16} color="#f59e0b" />
                        <Text style={styles.ratingText}>{worker.rating}</Text>
                        <Text style={styles.reviewsText}>({worker.reviews} reviews)</Text>
                      </View>
                      <Text style={styles.workerDistance}>📍 {worker.distance} away</Text>
                    </View>
                    <View style={styles.workerPricing}>
                      <Text style={styles.hourlyRate}>${worker.hourlyRate}/hr</Text>
                      {!worker.available && (
                        <Chip mode="outlined" textStyle={{ color: "#ef4444" }}>
                          Unavailable
                        </Chip>
                      )}
                    </View>
                  </View>
                  <View style={styles.specialties}>
                    {worker.specialties.map((specialty, idx) => (
                      <Chip key={idx} mode="outlined" style={styles.specialtyChip}>
                        {specialty}
                      </Chip>
                    ))}
                  </View>
                </Card.Content>
              </Card>
            ))}
          </View>

          {/* Booking Summary */}
          {selectedWorker && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Booking Summary</Text>
              <Card style={styles.summaryCard}>
                <Card.Content style={styles.summaryContent}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Service:</Text>
                    <Text style={styles.summaryValue}>{selectedService.name}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Professional:</Text>
                    <Text style={styles.summaryValue}>{selectedWorker.name}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Date & Time:</Text>
                    <Text style={styles.summaryValue}>
                      {selectedDate} at {selectedTime}
                    </Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Estimated Cost:</Text>
                    <Text style={styles.summaryValue}>${selectedWorker.hourlyRate}/hour</Text>
                  </View>
                </Card.Content>
              </Card>
            </View>
          )}

          {/* Book Button */}
          {selectedWorker && (
            <View style={styles.section}>
              <Button
                mode="contained"
                onPress={handleBookService}
                loading={loading}
                disabled={loading}
                style={styles.bookButton}
                contentStyle={styles.bookButtonContent}
              >
                Book Service
              </Button>
            </View>
          )}
        </>
      )}
    </ScrollView>
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: theme.colors.onBackground,
  },
  servicesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  serviceCard: {
    width: 120,
    marginRight: 12,
    elevation: 2,
  },
  selectedServiceCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
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
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  scheduleContainer: {
    gap: 16,
  },
  dateInput: {
    marginBottom: 16,
  },
  timeSlots: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  timeChip: {
    marginRight: 8,
  },
  searchBar: {
    marginBottom: 16,
    elevation: 2,
  },
  workerCard: {
    marginBottom: 12,
    elevation: 2,
  },
  selectedWorkerCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  unavailableWorkerCard: {
    opacity: 0.6,
  },
  workerContent: {
    paddingVertical: 16,
  },
  workerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  workerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  workerName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  workerRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "500",
  },
  reviewsText: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginLeft: 4,
  },
  workerDistance: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  workerPricing: {
    alignItems: "flex-end",
  },
  hourlyRate: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.secondary,
    marginBottom: 4,
  },
  specialties: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  specialtyChip: {
    marginRight: 0,
  },
  summaryCard: {
    elevation: 2,
  },
  summaryContent: {
    paddingVertical: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.onSurface,
  },
  bookButton: {
    paddingVertical: 8,
  },
  bookButtonContent: {
    paddingVertical: 8,
  },
})

export default BookServiceScreen
