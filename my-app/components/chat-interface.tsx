"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Paperclip, Phone, Video, MoreVertical, ImageIcon, Check, CheckCheck, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  type: "text" | "image" | "file"
  status: "sending" | "sent" | "delivered" | "read"
  fileUrl?: string
  fileName?: string
}

interface ChatInterfaceProps {
  conversationId: string
  currentUserId: string
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  recipientRole: "user" | "worker"
  isOnline?: boolean
  lastSeen?: Date
}

export function ChatInterface({
  conversationId,
  currentUserId,
  recipientId,
  recipientName,
  recipientAvatar,
  recipientRole,
  isOnline = false,
  lastSeen,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: recipientId,
      senderName: recipientName,
      senderAvatar: recipientAvatar,
      content: "Hi! I saw your booking request for kitchen cabinet repair. I'm available this week.",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
      status: "read",
    },
    {
      id: "2",
      senderId: currentUserId,
      senderName: "You",
      content: "Great! What's your availability like? I'm flexible with timing.",
      timestamp: new Date(Date.now() - 3000000),
      type: "text",
      status: "read",
    },
    {
      id: "3",
      senderId: recipientId,
      senderName: recipientName,
      senderAvatar: recipientAvatar,
      content:
        "I can do Tuesday or Wednesday afternoon. Would you like me to send some photos of similar work I've done?",
      timestamp: new Date(Date.now() - 2400000),
      type: "text",
      status: "read",
    },
    {
      id: "4",
      senderId: currentUserId,
      senderName: "You",
      content: "Tuesday works perfect! And yes, I'd love to see some examples of your work.",
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
      status: "delivered",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isTyping])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sending",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "sent" } : msg)))
    }, 500)

    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)))
    }, 1000)

    // Simulate recipient typing
    setTimeout(() => {
      setIsTyping(true)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={recipientAvatar || "/placeholder.svg"} alt={recipientName} />
              <AvatarFallback>
                {recipientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <CardTitle className="text-lg">{recipientName}</CardTitle>
                <Badge variant={recipientRole === "worker" ? "default" : "secondary"}>
                  {recipientRole === "worker" ? "Professional" : "Client"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {isOnline ? (
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </span>
                ) : (
                  `Last seen ${lastSeen ? formatTime(lastSeen) : "recently"}`
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Block User</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete Conversation</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <Separator />

      {/* Messages Area */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUserId
              const showDate =
                index === 0 || formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp)

              return (
                <div key={message.id}>
                  {showDate && (
                    <div className="flex justify-center my-4">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(message.timestamp)}
                      </Badge>
                    </div>
                  )}
                  <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[70%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                          <AvatarFallback>
                            {message.senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center justify-end space-x-1 mt-1`}>
                          <span className={`text-xs ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}>
                            {formatTime(message.timestamp)}
                          </span>
                          {isCurrentUser && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={recipientAvatar || "/placeholder.svg"} alt={recipientName} />
                    <AvatarFallback>
                      {recipientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      <Separator />

      {/* Message Input */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleFileUpload}>
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={handleFileUpload}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => {
            // Handle file upload
            console.log("File selected:", e.target.files?.[0])
          }}
        />
      </div>
    </Card>
  )
}
