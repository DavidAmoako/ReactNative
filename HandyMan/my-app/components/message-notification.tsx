"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, MessageSquare, Reply } from "lucide-react"
import Link from "next/link"

interface MessageNotificationProps {
  id: string
  senderName: string
  senderAvatar?: string
  senderRole: "user" | "worker"
  message: string
  timestamp: Date
  conversationId: string
  onDismiss: (id: string) => void
  onReply: (conversationId: string) => void
}

export function MessageNotification({
  id,
  senderName,
  senderAvatar,
  senderRole,
  message,
  timestamp,
  conversationId,
  onDismiss,
  onReply,
}: MessageNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onDismiss(id), 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, onDismiss])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss(id), 300)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card
      className={`fixed top-4 right-4 w-80 z-50 shadow-lg transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">New Message</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDismiss}>
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={senderAvatar || "/placeholder.svg"} alt={senderName} />
            <AvatarFallback>
              {senderName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <p className="font-medium text-sm">{senderName}</p>
              <Badge variant={senderRole === "worker" ? "default" : "secondary"} className="text-xs">
                {senderRole === "worker" ? "Pro" : "Client"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">{message}</p>
            <p className="text-xs text-gray-500 mt-1">{formatTime(timestamp)}</p>
          </div>
        </div>

        <div className="flex space-x-2 mt-3">
          <Button size="sm" onClick={() => onReply(conversationId)} className="flex-1">
            <Reply className="h-3 w-3 mr-1" />
            Reply
          </Button>
          <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
            <Link href="/messages">View All</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
