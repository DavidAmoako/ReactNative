"use client"

import { useState } from "react"
import { ConversationList } from "@/components/chat/conversation-list"
import { ChatInterface } from "@/components/chat/chat-interface"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your backend
const mockConversations = [
  {
    id: "1",
    participantId: "worker-1",
    participantName: "Mike Johnson",
    participantAvatar: "/placeholder.svg?height=40&width=40",
    participantRole: "worker" as const,
    lastMessage: "I can do Tuesday or Wednesday afternoon. Would you like me to send some photos?",
    lastMessageTime: new Date(Date.now() - 1800000),
    unreadCount: 0,
    isOnline: true,
    bookingId: "booking-1",
    serviceType: "Kitchen Cabinet Repair",
  },
  {
    id: "2",
    participantId: "worker-2",
    participantName: "Sarah Wilson",
    participantAvatar: "/placeholder.svg?height=40&width=40",
    participantRole: "worker" as const,
    lastMessage: "Perfect! I'll be there at 10 AM sharp. Should I bring my own tools?",
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 2,
    isOnline: false,
    bookingId: "booking-2",
    serviceType: "Garden Maintenance",
  },
  {
    id: "3",
    participantId: "user-1",
    participantName: "Emma Davis",
    participantAvatar: "/placeholder.svg?height=40&width=40",
    participantRole: "user" as const,
    lastMessage: "Thank you so much! The deck looks amazing. I'll leave a 5-star review.",
    lastMessageTime: new Date(Date.now() - 7200000),
    unreadCount: 0,
    isOnline: true,
    bookingId: "booking-3",
    serviceType: "Deck Staining",
  },
  {
    id: "4",
    participantId: "worker-3",
    participantName: "David Brown",
    participantAvatar: "/placeholder.svg?height=40&width=40",
    participantRole: "worker" as const,
    lastMessage: "I've fixed the leak. The issue was with the pipe connection. Everything should be working now.",
    lastMessageTime: new Date(Date.now() - 86400000),
    unreadCount: 1,
    isOnline: false,
    bookingId: "booking-4",
    serviceType: "Plumbing Repair",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [isMobileView, setIsMobileView] = useState(false)

  // Mock current user - in a real app, this would come from authentication
  const currentUserId = "current-user"
  const currentUserRole = "user" // This could be "user", "worker", or "admin"

  const handleConversationSelect = (conversation: (typeof mockConversations)[0]) => {
    setSelectedConversation(conversation)
    setIsMobileView(true)
  }

  const handleBackToList = () => {
    setIsMobileView(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/dashboard/${currentUserRole}`} className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TH</span>
              </div>
              <span className="text-xl font-bold">TheHandyMan</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href={`/dashboard/${currentUserRole}`}>
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">
            Communicate with your {currentUserRole === "user" ? "service providers" : "clients"}
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6">
          <ConversationList
            conversations={mockConversations}
            selectedConversationId={selectedConversation?.id}
            onConversationSelect={setSelectedConversation}
            currentUserRole={currentUserRole}
          />

          {selectedConversation ? (
            <div className="flex-1">
              <ChatInterface
                conversationId={selectedConversation.id}
                currentUserId={currentUserId}
                recipientId={selectedConversation.participantId}
                recipientName={selectedConversation.participantName}
                recipientAvatar={selectedConversation.participantAvatar}
                recipientRole={selectedConversation.participantRole}
                isOnline={selectedConversation.isOnline}
                lastSeen={selectedConversation.lastMessageTime}
              />
            </div>
          ) : (
            <Card className="flex-1 flex items-center justify-center">
              <CardContent className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {!isMobileView ? (
            <ConversationList
              conversations={mockConversations}
              selectedConversationId={selectedConversation?.id}
              onConversationSelect={handleConversationSelect}
              currentUserRole={currentUserRole}
            />
          ) : (
            <div>
              <div className="mb-4">
                <Button variant="ghost" onClick={handleBackToList} className="mb-2">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to conversations
                </Button>
              </div>
              {selectedConversation && (
                <ChatInterface
                  conversationId={selectedConversation.id}
                  currentUserId={currentUserId}
                  recipientId={selectedConversation.participantId}
                  recipientName={selectedConversation.participantName}
                  recipientAvatar={selectedConversation.participantAvatar}
                  recipientRole={selectedConversation.participantRole}
                  isOnline={selectedConversation.isOnline}
                  lastSeen={selectedConversation.lastMessageTime}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
