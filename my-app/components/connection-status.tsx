"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle } from "lucide-react"
import { wsService } from "@/lib/websocket-service"

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [connectionHealth, setConnectionHealth] = useState<"healthy" | "degraded" | "offline">("offline")

  useEffect(() => {
    // Monitor WebSocket connection status
    const checkConnection = () => {
      const connected = wsService && wsService.ws?.readyState === WebSocket.OPEN
      setIsConnected(connected)

      if (connected) {
        setConnectionHealth("healthy")
        setLastUpdate(new Date())
      } else {
        setConnectionHealth("offline")
      }
    }

    // Check connection status every 5 seconds
    const interval = setInterval(checkConnection, 5000)
    checkConnection() // Initial check

    // Listen for WebSocket messages to update last update time
    wsService.subscribe("stats_update", () => {
      setLastUpdate(new Date())
      setConnectionHealth("healthy")
    })

    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleReconnect = async () => {
    try {
      await wsService.connect()
      setIsConnected(true)
      setConnectionHealth("healthy")
    } catch (error) {
      console.error("Failed to reconnect:", error)
      setConnectionHealth("offline")
    }
  }

  const getStatusIcon = () => {
    switch (connectionHealth) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "degraded":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusColor = () => {
    switch (connectionHealth) {
      case "healthy":
        return "bg-green-50 text-green-700 border-green-200"
      case "degraded":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "offline":
        return "bg-red-50 text-red-700 border-red-200"
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <Wifi className="h-5 w-5" />
          <span>Main App Connection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor()}`}>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <span className="font-medium capitalize">{connectionHealth}</span>
          </div>
          <Badge variant={connectionHealth === "healthy" ? "default" : "destructive"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {lastUpdate && (
          <div className="text-sm text-gray-600">
            <p>Last update: {lastUpdate.toLocaleTimeString()}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Real-time sync</span>
            <span className={isConnected ? "text-green-600" : "text-red-600"}>
              {isConnected ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Data freshness</span>
            <span className="text-gray-600">
              {lastUpdate ? `${Math.floor((Date.now() - lastUpdate.getTime()) / 1000)}s ago` : "Never"}
            </span>
          </div>
        </div>

        {!isConnected && (
          <Button onClick={handleReconnect} className="w-full bg-transparent" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reconnect to Main App
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
