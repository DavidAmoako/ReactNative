class ApiClient {
  constructor() {
    this.baseURL = "https://api.handyman-app.com" // Replace with your actual API URL
    this.token = null
  }

  setToken(token) {
    this.token = token
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Request failed")
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Auth methods
  async login(email, password, role) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    })
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  // User methods
  async getProfile() {
    return this.request("/user/profile")
  }

  async updateProfile(data) {
    return this.request("/user/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Service methods
  async getServices() {
    return this.request("/services")
  }

  async bookService(serviceData) {
    return this.request("/bookings", {
      method: "POST",
      body: JSON.stringify(serviceData),
    })
  }

  async getBookings() {
    return this.request("/bookings")
  }

  // Worker methods
  async getWorkerJobs() {
    return this.request("/worker/jobs")
  }

  async updateJobStatus(jobId, status) {
    return this.request(`/worker/jobs/${jobId}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }

  // Messages
  async getConversations() {
    return this.request("/messages/conversations")
  }

  async getMessages(conversationId) {
    return this.request(`/messages/${conversationId}`)
  }

  async sendMessage(conversationId, message) {
    return this.request(`/messages/${conversationId}`, {
      method: "POST",
      body: JSON.stringify({ message }),
    })
  }
}

export const apiClient = new ApiClient()
