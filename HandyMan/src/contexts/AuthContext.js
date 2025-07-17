"use client"

import { createContext, useContext, useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authService } from "../services/authService"

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
      const token = await AsyncStorage.getItem("authToken")
      const userData = await AsyncStorage.getItem("userData")

      if (token && userData) {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Error checking auth state:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password, userType) => {
    try {
      setIsLoading(true)
      const response = await authService.login(email, password, userType)

      if (response.success) {
        await AsyncStorage.setItem("authToken", response.token)
        await AsyncStorage.setItem("userData", JSON.stringify(response.user))
        setUser(response.user)
        return { success: true }
      } else {
        return { success: false, error: response.error }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setIsLoading(true)
      const response = await authService.register(userData)

      if (response.success) {
        await AsyncStorage.setItem("authToken", response.token)
        await AsyncStorage.setItem("userData", JSON.stringify(response.user))
        setUser(response.user)
        return { success: true }
      } else {
        return { success: false, error: response.error }
      }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken")
      await AsyncStorage.removeItem("userData")
      setUser(null)
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData }
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
