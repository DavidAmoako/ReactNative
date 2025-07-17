"use client"

import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { apiClient } from "../services/apiClient"

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem("auth_token")
      const userData = await AsyncStorage.getItem("user_data")

      if (token && userData) {
        setUser(JSON.parse(userData))
        apiClient.setToken(token)
      }
    } catch (error) {
      console.error("Error checking auth state:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password, role) => {
    try {
      const response = await apiClient.login(email, password, role)

      if (response.success && response.data) {
        const { user: userData, token } = response.data

        await AsyncStorage.setItem("auth_token", token)
        await AsyncStorage.setItem("user_data", JSON.stringify(userData))

        setUser(userData)
        apiClient.setToken(token)

        return { success: true }
      }

      return { success: false, error: response.error }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (userData) => {
    try {
      const response = await apiClient.register(userData)

      if (response.success && response.data) {
        const { user: newUser, token } = response.data

        await AsyncStorage.setItem("auth_token", token)
        await AsyncStorage.setItem("user_data", JSON.stringify(newUser))

        setUser(newUser)
        apiClient.setToken(token)

        return { success: true }
      }

      return { success: false, error: response.error }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("auth_token")
      await AsyncStorage.removeItem("user_data")

      setUser(null)
      apiClient.setToken(null)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
