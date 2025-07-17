import { type NextRequest, NextResponse } from "next/server"
import type { User, ApiResponse } from "@/lib/types"

// Mock users data
const mockUsers: User[] = [
  {
    id: "user-1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    role: "user",
    verificationStatus: "verified",
    memberSince: "January 2024",
    completedBookings: 12,
    isActive: true,
    lastSeen: new Date(Date.now() - 1800000),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },
  {
    id: "user-2",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah@example.com",
    phone: "+1234567891",
    address: "456 Oak Ave",
    role: "user",
    verificationStatus: "verified",
    memberSince: "February 2024",
    completedBookings: 8,
    isActive: true,
    lastSeen: new Date(Date.now() - 3600000),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date(),
  },
  {
    id: "worker-1",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
    phone: "+1234567892",
    address: "789 Pine St",
    role: "worker",
    verificationStatus: "verified",
    memberSince: "January 2024",
    rating: 4.8,
    completedBookings: 47,
    isActive: true,
    lastSeen: new Date(Date.now() - 900000),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },
  {
    id: "worker-2",
    firstName: "David",
    lastName: "Brown",
    email: "david@example.com",
    phone: "+1234567893",
    address: "321 Elm St",
    role: "worker",
    verificationStatus: "pending",
    memberSince: "March 2024",
    rating: 4.6,
    completedBookings: 23,
    isActive: false,
    lastSeen: new Date(Date.now() - 7200000),
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""

    let filteredUsers = mockUsers

    // Filter by search
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role)
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    const response: ApiResponse<{ users: User[]; total: number }> = {
      success: true,
      data: {
        users: paginatedUsers,
        total: filteredUsers.length,
      },
      timestamp: new Date(),
    }

    return NextResponse.json(response)
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Internal server error",
      timestamp: new Date(),
    }
    return NextResponse.json(response, { status: 500 })
  }
}
