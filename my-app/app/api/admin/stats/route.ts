import { type NextRequest, NextResponse } from "next/server"
import type { PlatformStats, ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // Mock platform stats - in production, this would query the database
    const stats: PlatformStats = {
      totalUsers: 2847,
      totalWorkers: 456,
      activeUsers: 1247,
      activeWorkers: 89,
      totalBookings: 3421,
      completedBookings: 3156,
      totalRevenue: 245670,
      averageRating: 4.7,
      responseTime: 1.8,
      uptime: 99.94,
      growthRate: {
        users: 12.5,
        workers: 8.3,
        bookings: 15.7,
        revenue: 18.2,
      },
    }

    const response: ApiResponse<PlatformStats> = {
      success: true,
      data: stats,
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
