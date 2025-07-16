"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MessageSquare } from "lucide-react"

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

interface ConversationListProps {
  conversations: Conversation[]
  selectedConversationId?: string
  onConversationSelect: (conversation: Conversation) => void
  currentUserRole: "user" | "worker" | "admin"
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onConversationSelect,
  currentUserRole,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.serviceType?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return date.toLocaleDateString()
  }

  return (
    <Card className="h-[600px] w-80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Messages</span>
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No conversations yet</p>
              <p className="text-sm">Start chatting with {currentUserRole === "user" ? "professionals" : "clients"}</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                    selectedConversationId === conversation.id ? "bg-blue-50 border-l-blue-500" : "border-l-transparent"
                  }`}
                  onClick={() => onConversationSelect(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={conversation.participantAvatar || "/placeholder.svg"}
                          alt={conversation.participantName}
                        />
                        <AvatarFallback>
                          {conversation.participantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-sm truncate">{conversation.participantName}</h3>
                          <Badge
                            variant={conversation.participantRole === "worker" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {conversation.participantRole === "worker" ? "Pro" : "Client"}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">{formatTime(conversation.lastMessageTime)}</span>
                          {conversation.unreadCount > 0 && (
                            <Badge
                              variant="destructive"
                              className="text-xs min-w-[20px] h-5 flex items-center justify-center"
                            >
                              {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {conversation.serviceType && (
                        <p className="text-xs text-blue-600 mb-1">{conversation.serviceType}</p>
                      )}
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
