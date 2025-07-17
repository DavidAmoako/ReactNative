"use client"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "expo-status-bar"
import { Provider as PaperProvider } from "react-native-paper"
import { AuthProvider, useAuth } from "./src/contexts/AuthContext"
import { NotificationProvider } from "./src/contexts/NotificationContext"
import { theme } from "./src/theme/theme"
import AuthNavigator from "./src/navigation/AuthNavigator"
import AppNavigator from "./src/navigation/AppNavigator"
import SplashScreen from "./src/screens/SplashScreen"

// Icons
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

// User Tab Navigator
function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = "home"
          } else if (route.name === "Book Service") {
            iconName = "plus-circle"
          } else if (route.name === "Messages") {
            iconName = "message"
          } else if (route.name === "History") {
            iconName = "history"
          } else if (route.name === "Profile") {
            iconName = "account"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AppNavigator} />
      <Tab.Screen name="Book Service" component={AppNavigator} />
      <Tab.Screen name="Messages" component={AppNavigator} />
      <Tab.Screen name="History" component={AppNavigator} />
      <Tab.Screen name="Profile" component={AppNavigator} />
    </Tab.Navigator>
  )
}

// Worker Tab Navigator
function WorkerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = "view-dashboard"
          } else if (route.name === "Jobs") {
            iconName = "briefcase"
          } else if (route.name === "Messages") {
            iconName = "message"
          } else if (route.name === "Schedule") {
            iconName = "calendar"
          } else if (route.name === "Profile") {
            iconName = "account"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AppNavigator} />
      <Tab.Screen name="Jobs" component={AppNavigator} />
      <Tab.Screen name="Messages" component={AppNavigator} />
      <Tab.Screen name="Schedule" component={AppNavigator} />
      <Tab.Screen name="Profile" component={AppNavigator} />
    </Tab.Navigator>
  )
}

// Admin Tab Navigator
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Dashboard") {
            iconName = "view-dashboard"
          } else if (route.name === "Users") {
            iconName = "account-group"
          } else if (route.name === "Analytics") {
            iconName = "chart-line"
          } else if (route.name === "Settings") {
            iconName = "cog"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AppNavigator} />
      <Tab.Screen name="Users" component={AppNavigator} />
      <Tab.Screen name="Analytics" component={AppNavigator} />
      <Tab.Screen name="Settings" component={AppNavigator} />
    </Tab.Navigator>
  )
}

function AppContent() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NotificationProvider>
          <StatusBar style="auto" />
          <AppContent />
        </NotificationProvider>
      </AuthProvider>
    </PaperProvider>
  )
}
