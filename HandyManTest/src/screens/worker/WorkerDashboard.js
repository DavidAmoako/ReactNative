"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, RefreshControl, Alert } from "react-native"
import { Card, Button, Chip, Avatar, ProgressBar, FAB } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuth } from "../../contexts/AuthContext"
import { apiClient } from "../../services/apiClient"
import { theme } from "../../theme"

const WorkerDashboard = ({ navigation }) => {
  const { user } = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const [jobs, setJobs] = useState([])
  const [stats, setStats] = useState({
    totalJobs: 0,
    completedJobs: 0,
    pendingJobs: 0,
    earnings: 0,
    rating: 4.8,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const jobsResponse = await apiClient.getWorkerJobs()

      if (jobsResponse.success) {
        setJobs(jobsResponse.data.slice(0, 5))
        // Calculate stats from jobs data
        const totalJobs = jobsResponse.data.length
        const completedJobs = jobsResponse.data.filter((job) => job.status === "completed").length
        const pendingJobs = jobsResponse.data.filter((job) => job.status === "pending").length
        const earnings = jobsResponse.data
          .filter((job) => job.status === "completed")
          .reduce((sum, job) => sum + (job.amount || 0), 0)

        setStats({
          totalJobs,
          completedJobs,
          pendingJobs,
          earnings,
          rating: 4.8, // This would come from API
        })
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

  const handleJobAction = async (jobId, action) => {
    try {
      const response = await apiClient.updateJobStatus(jobId, action)
      if (response.success) {
        loadDashboardData()
        Alert.alert("Success", `Job ${action} successfully`)
      } else {
        Alert.alert("Error", response.error)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update job status")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#f59e0b"
      case "accepted":
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

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
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
              <Text style={styles.userName}>{user?.firstName || "Worker"}!</Text>
            </View>
            <Avatar.Text size={48} label={user?.firstName?.[0] || "W"} />
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <Icon name="briefcase" size={24} color={theme.colors.primary} />
                <Text style={styles.statNumber}>{stats.totalJobs}</Text>
                <Text style={styles.statLabel}>Total Jobs</Text>
              </Card.Content>
            </Card>
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <Icon name="check-circle" size={24} color={theme.colors.secondary} />
                <Text style={styles.statNumber}>{stats.completedJobs}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </Card.Content>
            </Card>
          </View>
          <View style={styles.statsRow}>
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <Icon name="clock" size={24} color={theme.colors.tertiary} />
                <Text style={styles.statNumber}>{stats.pendingJobs}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </Card.Content>
            </Card>
            <Card style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <Icon name="currency-usd" size={24} color="#10b981" />
                <Text style={styles.statNumber}>${stats.earnings}</Text>
                <Text style={styles.statLabel}>Earnings</Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Rating Card */}
        <View style={styles.section}>
          <Card style={styles.ratingCard}>
            <Card.Content style={styles.ratingContent}>
              <View style={styles.ratingHeader}>
                <Icon name="star" size={24} color="#f59e0b" />
                <Text style={styles.ratingText}>{stats.rating}</Text>
                <Text style={styles.ratingLabel}>Your Rating</Text>
              </View>
              <ProgressBar progress={stats.rating / 5} color="#f59e0b" style={styles.ratingProgress} />
              <Text style={styles.ratingDescription}>
                Keep up the great work! High ratings lead to more job opportunities.
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Recent Jobs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Jobs</Text>
            <Button mode="text" onPress={() => navigation.navigate("Jobs")}>
              View All
            </Button>
          </View>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <Card key={index} style={styles.jobCard}>
                <Card.Content style={styles.jobContent}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{job.service || "General Service"}</Text>
                    <Chip
                      mode="outlined"
                      textStyle={{ color: getStatusColor(job.status) }}
                      style={{ borderColor: getStatusColor(job.status) }}
                    >
                      {job.status || "pending"}
                    </Chip>
                  </View>
                  <Text style={styles.jobClient}>Client: {job.clientName || "Unknown"}</Text>
                  <Text style={styles.jobLocation}>📍 {job.location || "Location not specified"}</Text>
                  <Text style={styles.jobDate}>
                    📅 {job.scheduledDate ? new Date(job.scheduledDate).toLocaleDateString() : "TBD"}
                  </Text>
                  <Text style={styles.jobAmount}>💰 ${job.amount || "TBD"}</Text>

                  {job.status === "pending" && (
                    <View style={styles.jobActions}>
                      <Button
                        mode="outlined"
                        onPress={() => handleJobAction(job.id, "declined")}
                        style={styles.declineButton}
                      >
                        Decline
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => handleJobAction(job.id, "accepted")}
                        style={styles.acceptButton}
                      >
                        Accept
                      </Button>
                    </View>
                  )}

                  {job.status === "accepted" && (
                    <View style={styles.jobActions}>
                      <Button
                        mode="contained"
                        onPress={() => handleJobAction(job.id, "in_progress")}
                        style={styles.startButton}
                      >
                        Start Job
                      </Button>
                    </View>
                  )}

                  {job.status === "in_progress" && (
                    <View style={styles.jobActions}>
                      <Button
                        mode="contained"
                        onPress={() => handleJobAction(job.id, "completed")}
                        style={styles.completeButton}
                      >
                        Mark Complete
                      </Button>
                    </View>
                  )}
                </Card.Content>
              </Card>
            ))
          ) : (
            <Card style={styles.emptyCard}>
              <Card.Content style={styles.emptyContent}>
                <Icon name="briefcase-outline" size={48} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.emptyTitle}>No Recent Jobs</Text>
                <Text style={styles.emptySubtitle}>New job opportunities will appear here when available.</Text>
              </Card.Content>
            </Card>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Card style={styles.quickActionCard}>
              <Card.Content style={styles.quickActionContent}>
                <Icon name="calendar" size={32} color={theme.colors.primary} />
                <Text style={styles.quickActionText}>Schedule</Text>
              </Card.Content>
            </Card>
            <Card style={styles.quickActionCard}>
              <Card.Content style={styles.quickActionContent}>
                <Icon name="message" size={32} color={theme.colors.secondary} />
                <Text style={styles.quickActionText}>Messages</Text>
              </Card.Content>
            </Card>
            <Card style={styles.quickActionCard}>
              <Card.Content style={styles.quickActionContent}>
                <Icon name="account" size={32} color={theme.colors.tertiary} />
                <Text style={styles.quickActionText}>Profile</Text>
              </Card.Content>
            </Card>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => Alert.alert("Info", "Add availability feature coming soon")}
        label="Availability"
      />
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
    backgroundColor: theme.colors.secondary,
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
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    elevation: 2,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    color: theme.colors.onSurface,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginTop: 4,
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
  ratingCard: {
    elevation: 2,
  },
  ratingContent: {
    paddingVertical: 20,
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    color: theme.colors.onSurface,
  },
  ratingLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: theme.colors.onSurfaceVariant,
  },
  ratingProgress: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  ratingDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  jobCard: {
    marginBottom: 12,
    elevation: 2,
  },
  jobContent: {
    paddingVertical: 16,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  jobClient: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  jobDate: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  jobAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.secondary,
    marginBottom: 12,
  },
  jobActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  declineButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
  },
  startButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  completeButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.secondary,
  },
})

export default WorkerDashboard
