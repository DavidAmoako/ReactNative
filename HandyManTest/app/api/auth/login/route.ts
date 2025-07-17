import { type NextRequest, NextResponse } from "next/server"
import type { User, ApiResponse } from "@/lib/types"

// Mock database - in production, this would be a real database
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
    lastSeen: new Date(),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },
  {
    id: "worker-1",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike@example.com",
    phone: "+1234567891",
    address: "456 Oak Ave",
    role: "worker",
    verificationStatus: "verified",
    memberSince: "February 2024",
    rating: 4.8,
    completedBookings: 47,
    isActive: true,
    lastSeen: new Date(),
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date(),
  },
  {
    id: "admin-1",
    firstName: "Admin",
    lastName: "User",
    email: "admin@thehandyman.com",
    phone: "+1234567892",
    address: "Admin Office",
    role: "admin",
    verificationStatus: "verified",
    memberSince: "January 2024",
    completedBookings: 0,
    isActive: true,
    lastSeen: new Date(),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password, role } = await request.json()

    // Mock authentication - in production, verify password hash
    const user = mockUsers.find((u) => u.email === email && u.role === role)

    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Invalid credentials",
        timestamp: new Date(),
      }
      return NextResponse.json(response, { status: 401 })
    }

    // Generate mock JWT token - in production, use proper JWT
    const token = `mock-jwt-token-${user.id}-${Date.now()}`

    const response: ApiResponse<{ user: User; token: string }> = {
      success: true,
      data: { user, token },
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
