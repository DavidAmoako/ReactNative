"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Calendar,
  MapPin,
  Star,
  Clock,
  Filter,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  MessageSquare,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Booking Confirmed",
      message: "Sarah Wilson confirmed your garden maintenance booking",
      time: new Date(Date.now() - 1800000),
      read: false,
      type: "booking",
    },
    {
      id: 2,
      title: "New Message",
      message: "Mike Johnson sent you a message about the kitchen repair",
      time: new Date(Date.now() - 3600000),
      read: false,
      type: "message",
    },
  ])

  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 1,
      service: "Kitchen Repair",
      provider: "Mike Johnson",
      date: "Dec 10, 2024",
      status: "Completed",
      rating: 5,
      amount: "$180",
    },
    {
      id: 2,
      service: "Deck Staining",
      provider: "Sarah Wilson",
      date: "Nov 28, 2024",
      status: "Completed",
      rating: 4,
      amount: "$200",
    },
  ])

  const services = [
    { name: "Gardening", icon: "🌱", providers: 24, avgPrice: "$45/hr" },
    { name: "Carpentry", icon: "🔨", providers: 18, avgPrice: "$55/hr" },
    { name: "Plumbing", icon: "🔧", providers: 15, avgPrice: "$65/hr" },
    { name: "Electrical", icon: "⚡", providers: 12, avgPrice: "$75/hr" },
    { name: "Painting", icon: "🎨", providers: 20, avgPrice: "$40/hr" },
    { name: "Cleaning", icon: "🧹", providers: 30, avgPrice: "$35/hr" },
  ]

  const featuredProviders = [
    {
      id: 1,
      name: "Mike Johnson",
      service: "Carpentry",
      rating: 4.9,
      reviews: 127,
      price: "$55/hr",
      image: "/placeholder.svg?height=40&width=40",
      badge: "Top Rated",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      service: "Gardening",
      rating: 4.8,
      reviews: 89,
      price: "$45/hr",
      image: "/placeholder.svg?height=40&width=40",
      badge: "Fast Response",
    },
    {
      id: 3,
      name: "David Brown",
      service: "Plumbing",
      rating: 4.7,
      reviews: 156,
      price: "$65/hr",
      image: "/placeholder.svg?height=40&width=40",
      badge: "Available Today",
    },
  ]

  const upcomingBookings = [
    {
      id: 1,
      service: "Garden Maintenance",
      provider: "Sarah Wilson",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      service: "Kitchen Cabinet Repair",
      provider: "Mike Johnson",
      date: "Dec 20",
      time: "2:00 PM",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TH</span>
              </div>
              <span className="text-xl font-bold">TheHandyMan</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.filter((n) => !n.read).length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Find the perfect professional for your home needs</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for services or professionals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location
                </Button>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Popular Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => (window.location.href = `/book-service?category=${service.name.toLowerCase()}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{service.icon}</div>
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.providers} providers</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-blue-600">{service.avgPrice}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Featured Providers */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Featured Professionals</h2>
              <div className="space-y-4">
                {featuredProviders.map((provider) => (
                  <Card key={provider.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={provider.image || "/placeholder.svg"} alt={provider.name} />
                            <AvatarFallback>
                              {provider.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{provider.name}</h3>
                              <Badge variant="secondary">{provider.badge}</Badge>
                            </div>
                            <p className="text-sm text-gray-600">{provider.service}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{provider.rating}</span>
                              <span className="text-sm text-gray-600">({provider.reviews} reviews)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{provider.price}</p>
                          <Button className="mt-2">Book Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/book-service">
                    <Plus className="mr-2 h-4 w-4" />
                    Book a Service
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/user/calendar">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Calendar
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/dashboard/user/history">
                    <Clock className="mr-2 h-4 w-4" />
                    Booking History
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/messages">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your scheduled services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{booking.service}</h4>
                      <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{booking.provider}</p>
                    <p className="text-sm text-gray-500">
                      {booking.date} at {booking.time}
                    </p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  View All Bookings
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Service completed</p>
                  <p className="text-gray-600">Kitchen repair by Mike Johnson</p>
                  <p className="text-gray-500">2 days ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Review submitted</p>
                  <p className="text-gray-600">5-star review for Sarah Wilson</p>
                  <p className="text-gray-500">1 week ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
