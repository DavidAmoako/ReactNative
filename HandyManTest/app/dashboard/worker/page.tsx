"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  DollarSign,
  Star,
  Clock,
  Bell,
  User,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
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

export default function WorkerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const [bookingRequests, setBookingRequests] = useState([
    {
      id: 1,
      client: "Sarah Johnson",
      service: "Kitchen Cabinet Repair",
      date: "Dec 18, 2024",
      time: "2:00 PM",
      location: "Downtown",
      price: "$120",
      description: "Need to fix loose cabinet doors and replace hinges",
      status: "pending",
    },
    {
      id: 2,
      client: "Mike Davis",
      service: "Fence Installation",
      date: "Dec 20, 2024",
      time: "9:00 AM",
      location: "Suburbs",
      price: "$350",
      description: "Install wooden fence around backyard",
      status: "pending",
    },
  ])

  const [upcomingJobs, setUpcomingJobs] = useState([
    {
      id: 1,
      client: "Emma Wilson",
      service: "Deck Staining",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Oak Street",
      price: "$200",
      status: "confirmed",
    },
    {
      id: 2,
      client: "John Smith",
      service: "Shelf Installation",
      date: "Dec 19",
      time: "3:00 PM",
      location: "Pine Avenue",
      price: "$80",
      status: "confirmed",
    },
  ])

  const [recentReviews, setRecentReviews] = useState([
    {
      id: 1,
      client: "Lisa Brown",
      rating: 5,
      comment: "Excellent work! Very professional and completed on time.",
      service: "Bathroom Tile Repair",
      date: "2 days ago",
    },
    {
      id: 2,
      client: "Robert Taylor",
      rating: 4,
      comment: "Good quality work, would recommend.",
      service: "Door Installation",
      date: "1 week ago",
    },
  ])

  const stats = [
    { title: "Total Earnings", value: "$2,450", change: "+12%", icon: DollarSign },
    { title: "Completed Jobs", value: "47", change: "+8%", icon: CheckCircle },
    { title: "Average Rating", value: "4.8", change: "+0.2", icon: Star },
    { title: "Response Time", value: "15min", change: "-5min", icon: Clock },
  ]

  const handleAcceptBooking = (requestId: number) => {
    setBookingRequests((prev) => prev.filter((req) => req.id !== requestId))
    // Add to upcoming jobs
    const acceptedRequest = bookingRequests.find((req) => req.id === requestId)
    if (acceptedRequest) {
      setUpcomingJobs((prev) => [
        ...prev,
        {
          id: Date.now(),
          client: acceptedRequest.client,
          service: acceptedRequest.service,
          date: acceptedRequest.date,
          time: acceptedRequest.time,
          location: acceptedRequest.location,
          price: acceptedRequest.price,
          status: "confirmed",
        },
      ])
    }
  }

  const handleDeclineBooking = (requestId: number) => {
    setBookingRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

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
            <Badge variant="secondary">Professional</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/messages">
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Worker" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Mike Johnson</p>
                    <p className="text-xs leading-none text-muted-foreground">mike@example.com</p>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Mike!</h1>
          <p className="text-gray-600">Manage your bookings and grow your business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Jobs */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Jobs</CardTitle>
                  <CardDescription>Your confirmed bookings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingJobs.map((job) => (
                    <div key={job.id} className="border-l-4 border-green-500 pl-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{job.service}</h4>
                        <Badge variant="default">Confirmed</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{job.client}</p>
                      <p className="text-sm text-gray-500">
                        {job.date} at {job.time}
                      </p>
                      <p className="text-sm font-medium text-green-600">{job.price}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Jobs
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                  <CardDescription>What clients are saying</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{review.client}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">"{review.comment}"</p>
                      <p className="text-xs text-gray-500">
                        {review.service} • {review.date}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Reviews
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>New requests waiting for your response</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {bookingRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{request.service}</h3>
                        <p className="text-gray-600">Client: {request.client}</p>
                        <p className="text-sm text-gray-500">
                          {request.date} at {request.time}
                        </p>
                        <p className="text-sm text-gray-500">📍 {request.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">{request.price}</p>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{request.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleAcceptBooking(request.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeclineBooking(request.id)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Decline
                      </Button>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/messages?conversation=${request.id}`}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Schedule</CardTitle>
                <CardDescription>Manage your availability and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Calendar integration coming soon</p>
                  <Button>Set Availability</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Reviews</CardTitle>
                <CardDescription>Your complete review history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.client}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">"{review.comment}"</p>
                    <p className="text-sm text-gray-500">
                      {review.service} • {review.date}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
