"use client"

import { useState, useEffect, useCallback } from "react"

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

interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar?: string
  participantRole: "user" | "worker"
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
  bookingId?: string
  serviceType?: string
}

export function useChat(currentUserId: string) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({})

  // Simulate WebSocket connection
  useEffect(() => {
    // In a real app, you would establish a WebSocket connection here
    setIsConnected(true)

    // Simulate receiving messages
    const interval = setInterval(() => {
      // Randomly simulate new messages
      if (Math.random() > 0.95) {
        simulateIncomingMessage()
      }
    }, 5000)

    return () => {
      clearInterval(interval)
      setIsConnected(false)
    }
  }, [])

  const simulateIncomingMessage = useCallback(() => {
    const mockMessage: Message = {
      id: Date.now().toString(),
      senderId: "mock-sender",
      senderName: "Mock User",
      content: "This is a simulated incoming message",
      timestamp: new Date(),
      type: "text",
      status: "delivered",
    }

    // Add to a random conversation
    const conversationId = "1" // In real app, this would be dynamic
    setMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), mockMessage],
    }))
  }, [])

  const sendMessage = useCallback(
    (conversationId: string, content: string, type: "text" | "image" | "file" = "text") => {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: "You",
        content,
        timestamp: new Date(),
        type,
        status: "sending",
      }

      setMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), message],
      }))

      // Simulate message delivery
      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [conversationId]:
            prev[conversationId]?.map((msg) => (msg.id === message.id ? { ...msg, status: "sent" } : msg)) || [],
        }))
      }, 500)

      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [conversationId]:
            prev[conversationId]?.map((msg) => (msg.id === message.id ? { ...msg, status: "delivered" } : msg)) || [],
        }))
      }, 1000)

      return message.id
    },
    [currentUserId],
  )

  const markAsRead = useCallback(
    (conversationId: string) => {
      setMessages((prev) => ({
        ...prev,
        [conversationId]:
          prev[conversationId]?.map((msg) => (msg.senderId !== currentUserId ? { ...msg, status: "read" } : msg)) || [],
      }))

      setConversations((prev) => prev.map((conv) => (conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv)))
    },
    [currentUserId],
  )

  const startTyping = useCallback(
    (conversationId: string) => {
      // In a real app, you would emit a typing event via WebSocket
      console.log(`User ${currentUserId} started typing in conversation ${conversationId}`)
    },
    [currentUserId],
  )

  const stopTyping = useCallback(
    (conversationId: string) => {
      // In a real app, you would emit a stop typing event via WebSocket
      console.log(`User ${currentUserId} stopped typing in conversation ${conversationId}`)
    },
    [currentUserId],
  )

  const createConversation = useCallback(
    (
      participantId: string,
      participantName: string,
      participantRole: "user" | "worker",
      bookingId?: string,
      serviceType?: string,
    ) => {
      const conversation: Conversation = {
        id: Date.now().toString(),
        participantId,
        participantName,
        participantRole,
        lastMessage: "",
        lastMessageTime: new Date(),
        unreadCount: 0,
        isOnline: false,
        bookingId,
        serviceType,
      }

      setConversations((prev) => [conversation, ...prev])
      return conversation.id
    },
    [],
  )

  return {
    conversations,
    messages,
    isConnected,
    typingUsers,
    sendMessage,
    markAsRead,
    startTyping,
    stopTyping,
    createConversation,
  }
}
