import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // Mock real-time stats with some randomization
    const baseStats = {
      activeUsers: 1247,
      activeWorkers: 89,
      pendingBookings: 23,
      systemLoad: 45,
    }

    const realtimeStats = {
      activeUsers: baseStats.activeUsers + Math.floor(Math.random() * 20) - 10,
      activeWorkers: baseStats.activeWorkers + Math.floor(Math.random() * 10) - 5,
      pendingBookings: Math.max(0, baseStats.pendingBookings + Math.floor(Math.random() * 6) - 3),
      systemLoad: Math.min(100, Math.max(0, baseStats.systemLoad + Math.floor(Math.random() * 20) - 10)),
    }

    const response: ApiResponse<typeof realtimeStats> = {
      success: true,
      data: realtimeStats,
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
