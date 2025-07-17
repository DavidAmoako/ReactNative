"use client"

import { useAuth } from "../../src/contexts/AuthContext"
import UserDashboard from "../../src/screens/user/UserDashboard"
import WorkerDashboard from "../../src/screens/worker/WorkerDashboard"

export default function Dashboard() {
  const { user } = useAuth()

  if (user?.userType === "worker") {
    return <WorkerDashboard />
  }

  return <UserDashboard />
}
