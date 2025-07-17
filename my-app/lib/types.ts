export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  address: string
  bio?: string
  role: "user" | "worker" | "admin"
  verificationStatus: "pending" | "verified" | "rejected"
  memberSince: string
  rating?: number
  completedBookings: number
  isActive: boolean
  lastSeen: Date
  createdAt: Date
  updatedAt: Date
}

export interface Worker extends User {
  role: "worker"
  services: string[]
  hourlyRate: number
  availability: {
    [key: string]: { start: string; end: string; available: boolean }
  }
  portfolio: {
    id: string
    title: string
    description: string
    images: string[]
    completedDate: Date
  }[]
  certifications: {
    id: string
    name: string
    issuer: string
    expiryDate?: Date
    verified: boolean
  }[]
  responseTime: number // in minutes
  acceptanceRate: number // percentage
}

export interface Booking {
  id: string
  userId: string
  workerId: string
  serviceType: string
  title: string
  description: string
  scheduledDate: Date
  estimatedDuration: number
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  amount: number
  address: string
  coordinates?: { lat: number; lng: number }
  paymentStatus: "pending" | "paid" | "refunded"
  rating?: number
  review?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  cancelledAt?: Date
  cancellationReason?: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: "user" | "worker" | "admin"
  content: string
  type: "text" | "image" | "file" | "system"
  timestamp: Date
  status: "sending" | "sent" | "delivered" | "read"
  fileUrl?: string
  fileName?: string
}

export interface SystemAlert {
  id: string
  type: "security" | "payment" | "system" | "user" | "booking"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: Date
  status: "active" | "investigating" | "resolved" | "dismissed"
  affectedUsers?: string[]
  metadata?: Record<string, any>
}

export interface PlatformStats {
  totalUsers: number
  totalWorkers: number
  activeUsers: number
  activeWorkers: number
  totalBookings: number
  completedBookings: number
  totalRevenue: number
  averageRating: number
  responseTime: number
  uptime: number
  growthRate: {
    users: number
    workers: number
    bookings: number
    revenue: number
  }
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: Date
}
