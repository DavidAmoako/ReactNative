"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  Bell,
  Settings,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Shield,
  Activity,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [realtimeStats, setRealtimeStats] = useState({
    activeUsers: 1247,
    activeWorkers: 89,
    pendingBookings: 23,
    revenue: 45230,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeStats((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        activeWorkers: prev.activeWorkers + Math.floor(Math.random() * 3) - 1,
        pendingBookings: prev.pendingBookings + Math.floor(Math.random() * 3) - 1,
        revenue: prev.revenue + Math.floor(Math.random() * 100),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      realtime: realtimeStats.activeUsers + " active",
    },
    {
      title: "Total Revenue",
      value: `$${realtimeStats.revenue.toLocaleString()}`,
      change: "+8%",
      icon: DollarSign,
      realtime: "$1,247 today",
    },
    {
      title: "Active Bookings",
      value: "156",
      change: "+23%",
      icon: Calendar,
      realtime: `${realtimeStats.pendingBookings} pending`,
    },
    {
      title: "Platform Health",
      value: "99.9%",
      change: "+0.1%",
      icon: Activity,
      realtime: "All systems operational",
    },
  ]

  const criticalAlerts = [
    {
      id: 1,
      type: "security",
      severity: "high",
      title: "Multiple failed login attempts detected",
      description: "User account john.doe@email.com has 5 failed login attempts in the last 10 minutes",
      timestamp: new Date(Date.now() - 600000),
      status: "active",
    },
    {
      id: 2,
      type: "payment",
      severity: "medium",
      title: "Payment processing delay",
      description: "Payment gateway response time increased by 200%",
      timestamp: new Date(Date.now() - 1800000),
      status: "investigating",
    },
    {
      id: 3,
      type: "system",
      severity: "low",
      title: "Database connection pool utilization high",
      description: "Connection pool utilization at 85%",
      timestamp: new Date(Date.now() - 3600000),
      status: "monitoring",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "user_registration",
      user: "Sarah Johnson",
      action: "New user registered",
      timestamp: new Date(Date.now() - 300000),
      details: "Email: sarah.j@email.com, Location: Seattle",
    },
    {
      id: 2,
      type: "booking_completed",
      user: "Mike Wilson (Worker)",
      action: "Completed booking #BK-1247",
      timestamp: new Date(Date.now() - 600000),
      details: "Service: Kitchen Repair, Amount: $180",
    },
    {
      id: 3,
      type: "payment_processed",
      user: "System",
      action: "Payment processed",
      timestamp: new Date(Date.now() - 900000),
      details: "Amount: $125.50, Booking: #BK-1244",
    },
    {
      id: 4,
      type: "dispute_raised",
      user: "Emma Davis",
      action: "Raised dispute",
      timestamp: new Date(Date.now() - 1200000),
      details: "Booking: #BK-1240, Reason: Service quality",
    },
  ]

  const platformMetrics = {
    userGrowth: 12.5,
    workerGrowth: 8.3,
    bookingSuccess: 94.2,
    averageRating: 4.7,
    responseTime: "< 2min",
    uptime: 99.94,
  }

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
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_registration":
        return <Users className="h-4 w-4 text-green-600" />
      case "booking_completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "payment_processed":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "dispute_raised":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
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
                  Admin Panel
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-50 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-700">System Operational</span>
            </div>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {criticalAlerts.filter((a) => a.status === "active").length}
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
        {criticalAlerts.filter((a) => a.severity === "high").length > 0 && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <CardTitle className="text-red-800">Critical Alerts Require Attention</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {criticalAlerts
                  .filter((a) => a.severity === "high")
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
                        <Button size="sm" variant="outline" className="border-red-300 text-red-700 bg-transparent">
                          Investigate
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Administration</h1>
          <p className="text-gray-600">Monitor and manage the TheHandyMan platform</p>
        </div>

        {/* Real-time Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.realtime}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Real-time Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="monitoring">System Monitor</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Platform Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Health</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">User Growth Rate</span>
                      <span className="font-medium text-green-600">+{platformMetrics.userGrowth}%</span>
                    </div>
                    <Progress value={platformMetrics.userGrowth * 5} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Booking Success Rate</span>
                      <span className="font-medium text-green-600">{platformMetrics.bookingSuccess}%</span>
                    </div>
                    <Progress value={platformMetrics.bookingSuccess} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Uptime</span>
                      <span className="font-medium text-green-600">{platformMetrics.uptime}%</span>
                    </div>
                    <Progress value={platformMetrics.uptime} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{platformMetrics.averageRating}</p>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{platformMetrics.responseTime}</p>
                      <p className="text-sm text-gray-600">Response Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Activity Feed</CardTitle>
                  <CardDescription>Real-time platform activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.user}</p>
                          <p className="text-xs text-gray-500">{activity.details}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(activity.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>System Alerts & Notifications</CardTitle>
                <CardDescription>Monitor system health and security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {criticalAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.severity === "high"
                          ? "border-red-500 bg-red-50"
                          : alert.severity === "medium"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-blue-500 bg-blue-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{alert.title}</h4>
                            <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="secondary">{alert.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{alert.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(alert.timestamp)}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Acknowledge
                          </Button>
                          <Button size="sm">Resolve</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Advanced User Management</CardTitle>
                    <CardDescription>Comprehensive user administration and analytics</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search users..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Advanced Filter
                    </Button>
                    <Button>Export Data</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced User Management</h3>
                  <p className="text-gray-600 mb-4">
                    Comprehensive user analytics, behavior tracking, and management tools
                  </p>
                  <Button>Access User Management Suite</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance Monitor</CardTitle>
                <CardDescription>Real-time system metrics and performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">System Monitoring Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    Server metrics, database performance, API response times, and more
                  </p>
                  <Button>View Monitoring Dashboard</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Intelligence & Analytics</CardTitle>
                <CardDescription>Comprehensive platform analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Suite</h3>
                  <p className="text-gray-600 mb-4">
                    Revenue analytics, user behavior, market trends, and predictive insights
                  </p>
                  <Button>Access Analytics Dashboard</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>System-wide settings and configuration management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Platform Settings</h3>
                  <p className="text-gray-600 mb-4">
                    Payment gateways, notification settings, security policies, and more
                  </p>
                  <Button>Access Settings Panel</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
