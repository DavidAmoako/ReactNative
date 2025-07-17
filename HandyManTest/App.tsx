import { Slot } from "expo-router"
import { Provider as PaperProvider } from "react-native-paper"
import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "./src/contexts/AuthContext"
import { NotificationProvider } from "./src/contexts/NotificationContext"
import { theme } from "./src/theme/theme"

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NotificationProvider>
          <StatusBar style="auto" />
          <Slot />
        </NotificationProvider>
      </AuthProvider>
    </PaperProvider>
  )
}
