import type { User, Worker, Booking, Message, SystemAlert, PlatformStats, ApiResponse } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "API request failed")
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  // Authentication
  async login(email: string, password: string, role: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    })

    if (response.success && response.data) {
      this.token = response.data.token
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.data.token)
      }
    }

    return response
  }

  async logout(): Promise<void> {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  // Users
  async getUsers(params?: { page?: number; limit?: number; search?: string; role?: string }): Promise<
    ApiResponse<{ users: User[]; total: number }>
  > {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.search) searchParams.append("search", params.search)
    if (params?.role) searchParams.append("role", params.role)

    return this.request<{ users: User[]; total: number }>(`/users?${searchParams}`)
  }

  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`)
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async suspendUser(id: string, reason: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/users/${id}/suspend`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    })
  }

  // Workers
  async getWorkers(params?: { page?: number; limit?: number; search?: string; service?: string }): Promise<
    ApiResponse<{ workers: Worker[]; total: number }>
  > {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.search) searchParams.append("search", params.search)
    if (params?.service) searchParams.append("service", params.service)

    return this.request<{ workers: Worker[]; total: number }>(`/workers?${searchParams}`)
  }

  async verifyWorker(id: string): Promise<ApiResponse<Worker>> {
    return this.request<Worker>(`/workers/${id}/verify`, {
      method: "POST",
    })
  }

  // Bookings
  async getBookings(params?: {
    page?: number
    limit?: number
    status?: string
    userId?: string
    workerId?: string
  }): Promise<ApiResponse<{ bookings: Booking[]; total: number }>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append("page", params.page.toString())
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.status) searchParams.append("status", params.status)
    if (params?.userId) searchParams.append("userId", params.userId)
    if (params?.workerId) searchParams.append("workerId", params.workerId)

    return this.request<{ bookings: Booking[]; total: number }>(`/bookings?${searchParams}`)
  }

  async getBooking(id: string): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${id}`)
  }

  async updateBookingStatus(id: string, status: Booking["status"], reason?: string): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status, reason }),
    })
  }

  // Messages
  async getConversations(
    userId?: string,
  ): Promise<
    ApiResponse<{ conversationId: string; participants: User[]; lastMessage: Message; unreadCount: number }[]>
  > {
    const params = userId ? `?userId=${userId}` : ""
    return this.request(`/messages/conversations${params}`)
  }

  async getMessages(conversationId: string): Promise<ApiResponse<Message[]>> {
    return this.request<Message[]>(`/messages/${conversationId}`)
  }

  async sendMessage(
    conversationId: string,
    content: string,
    type: Message["type"] = "text",
  ): Promise<ApiResponse<Message>> {
    return this.request<Message>(`/messages/${conversationId}`, {
      method: "POST",
      body: JSON.stringify({ content, type }),
    })
  }

  // System Alerts
  async getAlerts(params?: { severity?: string; status?: string; type?: string }): Promise<ApiResponse<SystemAlert[]>> {
    const searchParams = new URLSearchParams()
    if (params?.severity) searchParams.append("severity", params.severity)
    if (params?.status) searchParams.append("status", params.status)
    if (params?.type) searchParams.append("type", params.type)

    return this.request<SystemAlert[]>(`/admin/alerts?${searchParams}`)
  }

  async updateAlert(id: string, status: SystemAlert["status"]): Promise<ApiResponse<SystemAlert>> {
    return this.request<SystemAlert>(`/admin/alerts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }

  // Platform Stats
  async getPlatformStats(): Promise<ApiResponse<PlatformStats>> {
    return this.request<PlatformStats>("/admin/stats")
  }

  async getRealtimeStats(): Promise<
    ApiResponse<{
      activeUsers: number
      activeWorkers: number
      pendingBookings: number
      systemLoad: number
    }>
  > {
    return this.request("/admin/stats/realtime")
  }

  // Admin Actions
  async broadcastMessage(message: string, targetRole?: "user" | "worker"): Promise<ApiResponse<void>> {
    return this.request<void>("/admin/broadcast", {
      method: "POST",
      body: JSON.stringify({ message, targetRole }),
    })
  }

  async generateReport(
    type: "users" | "bookings" | "revenue",
    dateRange: { start: Date; end: Date },
  ): Promise<ApiResponse<{ reportUrl: string }>> {
    return this.request<{ reportUrl: string }>("/admin/reports", {
      method: "POST",
      body: JSON.stringify({ type, dateRange }),
    })
  }
}

export const apiClient = new ApiClient()
