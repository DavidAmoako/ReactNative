"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native"
import { Card, Button, Avatar, List, Switch, Divider } from "react-native-paper"
import { useAuth } from "../contexts/AuthContext"
import { theme } from "../theme"

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(true)

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: logout,
      },
    ])
  }

  const handleEditProfile = () => {
    Alert.alert("Info", "Edit profile feature coming soon")
  }

  const handleChangePassword = () => {
    Alert.alert("Info", "Change password feature coming soon")
  }

  const handleSupport = () => {
    Alert.alert("Support", "Contact support at support@handyman-app.com")
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text size={80} label={user?.firstName?.[0] || "U"} style={styles.avatar} />
            <Text style={styles.userName}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userRole}>
              {user?.role === "user" ? "Homeowner" : user?.role === "worker" ? "Professional" : "Admin"}
            </Text>
            <Button mode="outlined" onPress={handleEditProfile} style={styles.editButton} icon="pencil">
              Edit Profile
            </Button>
          </Card.Content>
        </Card>
      </View>

      {/* Stats (for workers) */}
      {user?.role === "worker" && (
        <View style={styles.section}>
          <Card style={styles.statsCard}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Your Stats</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>47</Text>
                  <Text style={styles.statLabel}>Jobs Completed</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>4.8</Text>
                  <Text style={styles.statLabel}>Average Rating</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>$2,340</Text>
                  <Text style={styles.statLabel}>Total Earnings</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      )}

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <Card style={styles.settingsCard}>
          <List.Item
            title="Change Password"
            description="Update your account password"
            left={(props) => <List.Icon {...props} icon="lock" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleChangePassword}
          />
          <Divider />
          <List.Item
            title="Payment Methods"
            description="Manage your payment options"
            left={(props) => <List.Icon {...props} icon="credit-card" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert("Info", "Payment methods feature coming soon")}
          />
          <Divider />
          <List.Item
            title="Address Book"
            description="Manage your saved addresses"
            left={(props) => <List.Icon {...props} icon="map-marker" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert("Info", "Address book feature coming soon")}
          />
        </Card>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card style={styles.settingsCard}>
          <List.Item
            title="Push Notifications"
            description="Receive notifications about bookings and messages"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={() => <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />}
          />
          <Divider />
          <List.Item
            title="Location Services"
            description="Allow location access for better service matching"
            left={(props) => <List.Icon {...props} icon="crosshairs-gps" />}
            right={() => <Switch value={locationEnabled} onValueChange={setLocationEnabled} />}
          />
          <Divider />
          <List.Item
            title="Language"
            description="English"
            left={(props) => <List.Icon {...props} icon="translate" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert("Info", "Language selection coming soon")}
          />
        </Card>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Card style={styles.settingsCard}>
          <List.Item
            title="Help Center"
            description="Get answers to common questions"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert("Info", "Help center coming soon")}
          />
          <Divider />
          <List.Item
            title="Contact Support"
            description="Get help from our support team"
            left={(props) => <List.Icon {...props} icon="headset" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={handleSupport}
          />
          <Divider />
          <List.Item
            title="Rate the App"
            description="Share your feedback with us"
            left={(props) => <List.Icon {...props} icon="star" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert("Info", "App rating feature coming soon")}
          />
        </Card>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Card style={styles.settingsCard}>
          <List.Item
            title="Terms of Service"
            left={(props) => <List.Icon {...props} icon="file-document" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert("Info", "Terms of service coming soon")}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props) => <List.Icon {...props} icon="shield-account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => Alert.alert("Info", "Privacy policy coming soon")}
          />
          <Divider />
          <List.Item
            title="App Version"
            description="1.0.0"
            left={(props) => <List.Icon {...props} icon="information" />}
          />
        </Card>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <Button mode="outlined" onPress={handleLogout} style={styles.logoutButton} textColor="#ef4444" icon="logout">
          Logout
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
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  profileCard: {
    elevation: 4,
  },
  profileContent: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatar: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: theme.colors.onSurface,
  },
  userEmail: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  userRole: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "500",
    marginBottom: 24,
  },
  editButton: {
    paddingHorizontal: 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: theme.colors.onBackground,
  },
  statsCard: {
    elevation: 2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
  },
  settingsCard: {
    elevation: 2,
  },
  logoutButton: {
    borderColor: "#ef4444",
    paddingVertical: 8,
  },
})

export default ProfileScreen
