interface User {
  id: string
  email: string
  name: string
  userType: "user" | "worker"
  profileImage?: string
  phone?: string
}

interface LoginResponse {
  user: User
  token: string
}

interface RegisterData {
  email: string
  password: string
  name: string
  userType: "user" | "worker"
  phone?: string
}

class AuthService {
  private baseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api"

  async login(email: string, password: string): Promise<LoginResponse> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock response
    return {
      user: {
        id: "1",
        email,
        name: "John Doe",
        userType: "user",
        phone: "+1234567890",
      },
      token: "mock-jwt-token",
    }
  }

  async register(userData: RegisterData): Promise<LoginResponse> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock response
    return {
      user: {
        id: "1",
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        phone: userData.phone,
      },
      token: "mock-jwt-token",
    }
  }

  async getCurrentUser(): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock response
    return {
      id: "1",
      email: "john@example.com",
      name: "John Doe",
      userType: "user",
      phone: "+1234567890",
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock response
    return {
      id: "1",
      email: "john@example.com",
      name: "John Doe",
      userType: "user",
      phone: "+1234567890",
      ...userData,
    }
  }

  async forgotPassword(email: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(`Password reset email sent to ${email}`)
  }
}

export const authService = new AuthService()
