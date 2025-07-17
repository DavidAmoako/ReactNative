"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Calendar,
  Search,
  Filter,
  Bell,
  Settings,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Shield,
  Activity,
  MessageSquare,
  Eye,
  UserX,
  RefreshCw,
  Download,
  Send,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { apiClient } from "@/lib/api-client"
import type { User, PlatformStats, SystemAlert } from "@/lib/types"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [users, setUsers] = useState<User[]>([])
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null)
  const [realtimeStats, setRealtimeStats] = useState({
    activeUsers: 0,
    activeWorkers: 0,
    pendingBookings: 0,
    systemLoad: 0,
  })
  const [alerts, setAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // Load initial data
  useEffect(() => {
    loadDashboardData()
  }, [])

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      loadRealtimeStats()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Load platform stats
      const statsResponse = await apiClient.getPlatformStats()
      if (statsResponse.success && statsResponse.data) {
        setPlatformStats(statsResponse.data)
      }

      // Load users
      const usersResponse = await apiClient.getUsers({ limit: 50 })
      if (usersResponse.success && usersResponse.data) {
        setUsers(usersResponse.data.users)
      }

      // Load alerts
      const alertsResponse = await apiClient.getAlerts()
      if (alertsResponse.success && alertsResponse.data) {
        setAlerts(alertsResponse.data)
      }

      // Load real-time stats
      await loadRealtimeStats()
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadRealtimeStats = async () => {
    try {
      const response = await apiClient.getRealtimeStats()
      if (response.success && response.data) {
        setRealtimeStats(response.data)
      }
    } catch (error) {
      console.error("Failed to load real-time stats:", error)
    }
  }

  const handleSuspendUser = async (userId: string) => {
    try {
      await apiClient.suspendUser(userId, "Suspended by admin")
      // Refresh users list
      const usersResponse = await apiClient.getUsers({ limit: 50 })
      if (usersResponse.success && usersResponse.data) {
        setUsers(usersResponse.data.users)
      }
    } catch (error) {
      console.error("Failed to suspend user:", error)
    }
  }

  const handleResolveAlert = async (alertId: string) => {
    try {
      await apiClient.updateAlert(alertId, "resolved")
      setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: "resolved" } : alert)))
    } catch (error) {
      console.error("Failed to resolve alert:", error)
    }
  }

  const handleBroadcastMessage = async () => {
    try {
      await apiClient.broadcastMessage("System maintenance scheduled for tonight at 2 AM EST")
      alert("Message broadcasted to all users")
    } catch (error) {
      console.error("Failed to broadcast message:", error)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-700 bg-red-100 border-red-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">TheHandyMan</span>
                <Badge variant="destructive" className="ml-2">
                  Admin Control Panel
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700">Connected to Main App</span>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {alerts.filter((a) => a.status === "active").length}
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="bg-red-100 text-red-700">AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">System Administrator</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@thehandyman.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Activity className="mr-2 h-4 w-4" />
                  <span>System Logs</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Secure Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Critical Alerts */}
        {alerts.filter((a) => a.severity === "critical" && a.status === "active").length > 0 && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-800">Critical System Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alerts
                  .filter((a) => a.severity === "critical" && a.status === "active")
                  .map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-3 bg-white rounded border-l-4 border-red-500"
                    >
                      <div>
                        <p className="font-medium text-red-800">{alert.title}</p>
                        <p className="text-sm text-red-600">{alert.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-red-500">{formatTimeAgo(alert.timestamp)}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-700 bg-transparent"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Control Center</h1>
          <p className="text-gray-600">Monitor and manage the TheHandyMan platform in real-time</p>
        </div>

        {/* Real-time Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{realtimeStats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600">+{platformStats?.growthRate.users}%</p>
                  <p className="text-xs text-gray-500 mt-1">Live count</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Workers</p>
                  <p className="text-2xl font-bold">{realtimeStats.activeWorkers}</p>
                  <p className="text-sm text-green-600">+{platformStats?.growthRate.workers}%</p>
                  <p className="text-xs text-gray-500 mt-1">Online now</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                  <p className="text-2xl font-bold">{realtimeStats.pendingBookings}</p>
                  <p className="text-sm text-yellow-600">Needs attention</p>
                  <p className="text-xs text-gray-500 mt-1">Real-time</p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Load</p>
                  <p className="text-2xl font-bold">{realtimeStats.systemLoad}%</p>
                  <p className={`text-sm ${realtimeStats.systemLoad > 80 ? "text-red-600" : "text-green-600"}`}>
                    {realtimeStats.systemLoad > 80 ? "High" : "Normal"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">CPU & Memory</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Live Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="monitoring">System Monitor</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health Metrics</CardTitle>
                  <CardDescription>Real-time performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platformStats && (
                    <>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">User Growth Rate</span>
                          <span className="font-medium text-green-600">+{platformStats.growthRate.users}%</span>
                        </div>
                        <Progress value={platformStats.growthRate.users * 5} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Revenue Growth</span>
                          <span className="font-medium text-green-600">+{platformStats.growthRate.revenue}%</span>
                        </div>
                        <Progress value={platformStats.growthRate.revenue * 3} className="h-2" />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">System Uptime</span>
                          <span className="font-medium text-green-600">{platformStats.uptime}%</span>
                        </div>
                        <Progress value={platformStats.uptime} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{platformStats.averageRating}</p>
                          <p className="text-sm text-gray-600">Avg Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{platformStats.responseTime}min</p>
                          <p className="text-sm text-gray-600">Response Time</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Active System Alerts</CardTitle>
                  <CardDescription>Monitor system health and security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {alerts
                      .filter((a) => a.status === "active")
                      .map((alert) => (
                        <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-sm">{alert.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {alert.severity.toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600">{alert.description}</p>
                              <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(alert.timestamp)}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs bg-transparent"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              Resolve
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management Interface</CardTitle>
                    <CardDescription>Manage users and workers from the main application</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button onClick={loadDashboardData}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.firstName} />
                              <AvatarFallback>
                                {user.firstName[0]}
                                {user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === "worker" ? "default" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${user.isActive ? "bg-green-500" : "bg-gray-400"}`}
                            ></div>
                            <Badge variant={user.isActive ? "default" : "secondary"}>
                              {user.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{formatTimeAgo(user.lastSeen)}</TableCell>
                        <TableCell>
                          <span className="font-medium">{user.completedBookings}</span>
                          {user.rating && (
                            <div className="flex items-center space-x-1 mt-1">
                              <span className="text-xs text-yellow-600">★ {user.rating}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-3 w-3" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              Message
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-300 bg-transparent"
                              onClick={() => handleSuspendUser(user.id)}
                            >
                              <UserX className="mr-1 h-3 w-3" />
                              Suspend
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance Monitor</CardTitle>
                <CardDescription>Real-time monitoring of the main application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm text-gray-600">{realtimeStats.systemLoad}%</span>
                      </div>
                      <Progress value={realtimeStats.systemLoad} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm text-gray-600">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Database Connections</span>
                        <span className="text-sm text-gray-600">45/100</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">API Response Times</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Authentication</span>
                          <span className="text-green-600">120ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>User Queries</span>
                          <span className="text-green-600">85ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Booking Operations</span>
                          <span className="text-yellow-600">340ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Communications</CardTitle>
                <CardDescription>Send messages and notifications to users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Broadcast Message</h4>
                  <p className="text-sm text-blue-600 mb-4">Send a message to all users or specific user groups</p>
                  <div className="flex space-x-2">
                    <Button onClick={handleBroadcastMessage}>
                      <Send className="mr-2 h-4 w-4" />
                      Send System Announcement
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Users
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Workers
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium mb-2">Email Notifications</h4>
                      <p className="text-2xl font-bold text-blue-600">1,247</p>
                      <p className="text-sm text-gray-600">Sent today</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium mb-2">Push Notifications</h4>
                      <p className="text-2xl font-bold text-green-600">892</p>
                      <p className="text-sm text-gray-600">Delivered</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-medium mb-2">SMS Messages</h4>
                      <p className="text-2xl font-bold text-purple-600">156</p>
                      <p className="text-sm text-gray-600">Sent today</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Generate comprehensive reports from the main application data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">User Analytics</h4>
                      <p className="text-sm text-gray-600 mb-4">Comprehensive user behavior and growth metrics</p>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Revenue Report</h4>
                      <p className="text-sm text-gray-600 mb-4">Financial performance and transaction analysis</p>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Booking Analytics</h4>
                      <p className="text-sm text-gray-600 mb-4">Service demand and completion statistics</p>
                      <Button className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
