"use client"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useAuth } from "../contexts/AuthContext"
import { colors } from "../theme/theme"

// User Screens
import UserDashboard from "../screens/user/UserDashboard"
import ServiceSearch from "../screens/user/ServiceSearch"
import ProviderProfile from "../screens/user/ProviderProfile"
import BookingProcess from "../screens/user/BookingProcess"
import BookingManagement from "../screens/user/BookingManagement"
import PaymentManagement from "../screens/user/PaymentManagement"

// Worker Screens
import WorkerDashboard from "../screens/worker/WorkerDashboard"
import ServiceManagement from "../screens/worker/ServiceManagement"
import WorkerBookingManagement from "../screens/worker/WorkerBookingManagement"
import WorkerProfile from "../screens/worker/WorkerProfile"
import PayoutManagement from "../screens/worker/PayoutManagement"

// Shared Screens
import MessagingScreen from "../screens/shared/MessagingScreen"
import ChatScreen from "../screens/shared/ChatScreen"
import ProfileScreen from "../screens/shared/ProfileScreen"
import RatingReviewScreen from "../screens/shared/RatingReviewScreen"
import NotificationsScreen from "../screens/shared/NotificationsScreen"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// User Tab Navigator
const UserTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === "Dashboard") {
          iconName = "home"
        } else if (route.name === "Search") {
          iconName = "magnify"
        } else if (route.name === "Bookings") {
          iconName = "calendar-check"
        } else if (route.name === "Messages") {
          iconName = "message"
        } else if (route.name === "Profile") {
          iconName = "account"
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.text.secondary,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={UserDashboard} />
    <Tab.Screen name="Search" component={ServiceSearch} />
    <Tab.Screen name="Bookings" component={BookingManagement} />
    <Tab.Screen name="Messages" component={MessagingScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
)

// Worker Tab Navigator
const WorkerTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === "Dashboard") {
          iconName = "view-dashboard"
        } else if (route.name === "Services") {
          iconName = "wrench"
        } else if (route.name === "Bookings") {
          iconName = "calendar-check"
        } else if (route.name === "Messages") {
          iconName = "message"
        } else if (route.name === "Profile") {
          iconName = "account"
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.text.secondary,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.border,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={WorkerDashboard} />
    <Tab.Screen name="Services" component={ServiceManagement} />
    <Tab.Screen name="Bookings" component={WorkerBookingManagement} />
    <Tab.Screen name="Messages" component={MessagingScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
)

const AppNavigator = () => {
  const { user } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user?.userType === "user" ? (
        <>
          <Stack.Screen name="UserTabs" component={UserTabs} />
          <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
          <Stack.Screen name="BookingProcess" component={BookingProcess} />
          <Stack.Screen name="PaymentManagement" component={PaymentManagement} />
        </>
      ) : (
        <>
          <Stack.Screen name="WorkerTabs" component={WorkerTabs} />
          <Stack.Screen name="WorkerProfile" component={WorkerProfile} />
          <Stack.Screen name="PayoutManagement" component={PayoutManagement} />
        </>
      )}

      {/* Shared Screens */}
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="RatingReview" component={RatingReviewScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator
