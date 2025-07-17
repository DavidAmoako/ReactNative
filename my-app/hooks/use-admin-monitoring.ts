"use client"

import { useState, useEffect, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { wsService } from "@/lib/websocket-service"
import type { User, PlatformStats, SystemAlert } from "@/lib/types"

export function useAdminMonitoring() {
  const [users, setUsers] = useState<User[]>([])
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null)
  const [realtimeStats, setRealtimeStats] = useState({
    activeUsers: 0,
    activeWorkers: 0,
    pendingBookings: 0,
    systemLoad: 0,
  })
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize WebSocket connection
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        await wsService.connect()
        setIsConnected(true)

        // Subscribe to real-time updates
        wsService.subscribe("user_update", handleUserUpdate)
        wsService.subscribe("stats_update", handleStatsUpdate)
        wsService.subscribe("system_alert", handleSystemAlert)
      } catch (error) {
        console.error("Failed to connect to WebSocket:", error)
        setIsConnected(false)
      }
    }

    initializeConnection()

    return () => {
      wsService.disconnect()
    }
  }, [])

  // Load initial data
  useEffect(() => {
    loadInitialData()
  }, [])

  // Real-time stats polling
  useEffect(() => {
    const interval = setInterval(() => {
      loadRealtimeStats()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)

      const [statsResponse, usersResponse, alertsResponse] = await Promise.all([
        apiClient.getPlatformStats(),
        apiClient.getUsers({ limit: 100 }),
        apiClient.getAlerts(),
      ])

      if (statsResponse.success && statsResponse.data) {
        setPlatformStats(statsResponse.data)
      }

      if (usersResponse.success && usersResponse.data) {
        setUsers(usersResponse.data.users)
      }

      if (alertsResponse.success && alertsResponse.data) {
        setAlerts(alertsResponse.data)
      }

      await loadRealtimeStats()
    } catch (error) {
      console.error("Failed to load initial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadRealtimeStats = async () => {
    try {
      const response = await apiClient.getRealtimeStats()
      if (response.success && response.data) {
        setRealtimeStats(response.data)

        // Broadcast stats update to other connected clients
        wsService.send("stats_update", response.data, "admin_app")
      }
    } catch (error) {
      console.error("Failed to load real-time stats:", error)
    }
  }

  const handleUserUpdate = useCallback((userData: User) => {
    setUsers((prev) => {
      const index = prev.findIndex((u) => u.id === userData.id)
      if (index >= 0) {
        const updated = [...prev]
        updated[index] = userData
        return updated
      } else {
        return [...prev, userData]
      }
    })
  }, [])

  const handleStatsUpdate = useCallback((stats: typeof realtimeStats) => {
    setRealtimeStats(stats)
  }, [])

  const handleSystemAlert = useCallback((alert: SystemAlert) => {
    setAlerts((prev) => [alert, ...prev])
  }, [])

  const suspendUser = async (userId: string, reason: string) => {
    try {
      await apiClient.suspendUser(userId, reason)

      // Update local state
      setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, isActive: false } : user)))

      // Broadcast user update
      const updatedUser = users.find((u) => u.id === userId)
      if (updatedUser) {
        wsService.send("user_update", { ...updatedUser, isActive: false }, "admin_app")
      }

      return { success: true }
    } catch (error) {
      console.error("Failed to suspend user:", error)
      return { success: false, error: "Failed to suspend user" }
    }
  }

  const resolveAlert = async (alertId: string) => {
    try {
      await apiClient.updateAlert(alertId, "resolved")

      setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))

      return { success: true }
    } catch (error) {
      console.error("Failed to resolve alert:", error)
      return { success: false, error: "Failed to resolve alert" }
    }
  }

  const broadcastMessage = async (message: string, targetRole?: "user" | "worker") => {
    try {
      await apiClient.broadcastMessage(message, targetRole)

      // Send via WebSocket for real-time delivery
      wsService.send("broadcast_message", { message, targetRole }, "admin_app")

      return { success: true }
    } catch (error) {
      console.error("Failed to broadcast message:", error)
      return { success: false, error: "Failed to broadcast message" }
    }
  }

  const refreshData = async () => {
    await loadInitialData()
  }

  return {
    users,
    platformStats,
    realtimeStats,
    alerts,
    isConnected,
    loading,
    actions: {
      suspendUser,
      resolveAlert,
      broadcastMessage,
      refreshData,
    },
  }
}
