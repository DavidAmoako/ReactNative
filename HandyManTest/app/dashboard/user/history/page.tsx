"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, Calendar, DollarSign, ArrowLeft, Download, MessageSquare, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function BookingHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const bookingHistory = [
    {
      id: 1,
      service: "Kitchen Cabinet Repair",
      provider: "Mike Johnson",
      providerAvatar: "/placeholder.svg?height=40&width=40",
      date: "December 10, 2024",
      completedDate: "December 10, 2024, 3:30 PM",
      status: "completed",
      amount: "$180",
      rating: 5,
      review: "Excellent work! Very professional and completed on time.",
      duration: "2 hours",
      bookingRef: "BK-001",
    },
    {
      id: 2,
      service: "Garden Maintenance",
      provider: "Sarah Wilson",
      providerAvatar: "/placeholder.svg?height=40&width=40",
      date: "November 28, 2024",
      completedDate: "November 28, 2024, 11:00 AM",
      status: "completed",
      amount: "$120",
      rating: 4,
      review: "Good work, garden looks much better now.",
      duration: "3 hours",
      bookingRef: "BK-002",
    },
    {
      id: 3,
      service: "Plumbing Repair",
      provider: "David Brown",
      providerAvatar: "/placeholder.svg?height=40&width=40",
      date: "November 15, 2024",
      completedDate: "November 15, 2024, 2:15 PM",
      status: "completed",
      amount: "$95",
      rating: 5,
      review: "Quick and efficient. Fixed the leak perfectly.",
      duration: "1.5 hours",
      bookingRef: "BK-003",
    },
    {
      id: 4,
      service: "Electrical Installation",
      provider: "Tom Anderson",
      providerAvatar: "/placeholder.svg?height=40&width=40",
      date: "October 22, 2024",
      completedDate: null,
      status: "cancelled",
      amount: "$150",
      rating: null,
      review: null,
      duration: null,
      bookingRef: "BK-004",
      cancellationReason: "Provider unavailable",
    },
  ]

  const upcomingBookings = [
    {
      id: 5,
      service: "Deck Staining",
      provider: "Sarah Wilson",
      providerAvatar: "/placeholder.svg?height=40&width=40",
      date: "December 18, 2024",
      scheduledTime: "10:00 AM",
      status: "confirmed",
      amount: "$200",
      bookingRef: "BK-005",
    },
    {
      id: 6,
      service: "Window Cleaning",
      provider: "Clean Team Pro",
      providerAvatar: "/placeholder.svg?height=40&width=40",
      date: "December 20, 2024",
      scheduledTime: "2:00 PM",
      status: "pending",
      amount: "$80",
      bookingRef: "BK-006",
    },
  ]

  const filteredBookings = bookingHistory.filter((booking) => {
    const matchesSearch =
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && booking.status === "completed"
    if (activeTab === "cancelled") return matchesSearch && booking.status === "cancelled"
    return matchesSearch
  })

  const totalSpent = bookingHistory
    .filter((b) => b.status === "completed")
    .reduce((sum, booking) => sum + Number.parseFloat(booking.amount.replace("$", "")), 0)

  const completedBookings = bookingHistory.filter((b) => b.status === "completed").length
  const averageRating =
    bookingHistory.filter((b) => b.rating).reduce((sum, booking) => sum + booking.rating!, 0) /
    bookingHistory.filter((b) => b.rating).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/user" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TH</span>
            </div>
            <span className="text-xl font-bold">TheHandyMan</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking History</h1>
          <p className="text-gray-600">View and manage all your past and upcoming bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold">${totalSpent}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold">{completedBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <RefreshCw className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>This Month</DropdownMenuItem>
                    <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                    <DropdownMenuItem>This Year</DropdownMenuItem>
                    <DropdownMenuItem>All Time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Lists */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="all">All ({bookingHistory.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedBookings})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled (1)</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.providerAvatar || "/placeholder.svg"} alt={booking.provider} />
                        <AvatarFallback>
                          {booking.provider
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{booking.service}</h3>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{booking.provider}</p>
                        <p className="text-sm text-gray-500">
                          {booking.date} at {booking.scheduledTime}
                        </p>
                        <p className="text-sm text-gray-500">Booking ID: {booking.bookingRef}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">{booking.amount}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={booking.providerAvatar || "/placeholder.svg"} alt={booking.provider} />
                        <AvatarFallback>
                          {booking.provider
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{booking.service}</h3>
                          <Badge
                            variant={
                              booking.status === "completed"
                                ? "default"
                                : booking.status === "cancelled"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{booking.provider}</p>
                        <p className="text-sm text-gray-500">{booking.completedDate || booking.date}</p>
                        {booking.duration && <p className="text-sm text-gray-500">Duration: {booking.duration}</p>}
                        <p className="text-sm text-gray-500">Booking ID: {booking.bookingRef}</p>

                        {booking.status === "cancelled" && booking.cancellationReason && (
                          <p className="text-sm text-red-600 mt-1">Cancelled: {booking.cancellationReason}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">{booking.amount}</p>
                      {booking.rating && (
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < booking.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      {booking.review && <p className="text-sm text-gray-600 mt-1 max-w-xs">"{booking.review}"</p>}
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {booking.status === "completed" && !booking.rating && (
                          <Button size="sm">
                            <Star className="mr-2 h-4 w-4" />
                            Rate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filteredBookings
              .filter((b) => b.status === "completed")
              .map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={booking.providerAvatar || "/placeholder.svg"} alt={booking.provider} />
                          <AvatarFallback>
                            {booking.provider
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{booking.service}</h3>
                          <p className="text-gray-600">{booking.provider}</p>
                          <p className="text-sm text-gray-500">{booking.completedDate}</p>
                          <p className="text-sm text-gray-500">Duration: {booking.duration}</p>
                          {booking.review && <p className="text-sm text-gray-700 mt-2 italic">"{booking.review}"</p>}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">{booking.amount}</p>
                        {booking.rating && (
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < booking.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Book Again
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {filteredBookings
              .filter((b) => b.status === "cancelled")
              .map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12 opacity-50">
                          <AvatarImage src={booking.providerAvatar || "/placeholder.svg"} alt={booking.provider} />
                          <AvatarFallback>
                            {booking.provider
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-600">{booking.service}</h3>
                          <p className="text-gray-500">{booking.provider}</p>
                          <p className="text-sm text-gray-500">{booking.date}</p>
                          <p className="text-sm text-red-600 mt-1">Cancelled: {booking.cancellationReason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-500">{booking.amount}</p>
                        <Badge variant="destructive" className="mt-1">
                          Cancelled
                        </Badge>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
