"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, X, Minimize2 } from "lucide-react"
import { ChatInterface } from "./chat-interface"

interface ChatWidgetProps {
  isOpen: boolean
  onToggle: () => void
  currentUserId: string
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  recipientRole: "user" | "worker"
  conversationId: string
}

export function ChatWidget({
  isOpen,
  onToggle,
  currentUserId,
  recipientId,
  recipientName,
  recipientAvatar,
  recipientRole,
  conversationId,
}: ChatWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false)

  if (!isOpen) {
    return (
      <Button onClick={onToggle} className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50" size="icon">
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isMinimized ? (
        <Card className="w-80 cursor-pointer" onClick={() => setIsMinimized(false)}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <CardTitle className="text-sm">{recipientName}</CardTitle>
                <Badge variant={recipientRole === "worker" ? "default" : "secondary"} className="text-xs">
                  {recipientRole === "worker" ? "Pro" : "Client"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle()
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      ) : (
        <div className="w-80">
          <div className="flex items-center justify-between bg-white border border-b-0 rounded-t-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span className="font-medium text-sm">{recipientName}</span>
              <Badge variant={recipientRole === "worker" ? "default" : "secondary"} className="text-xs">
                {recipientRole === "worker" ? "Pro" : "Client"}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(true)}>
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onToggle}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="border-t-0">
            <ChatInterface
              conversationId={conversationId}
              currentUserId={currentUserId}
              recipientId={recipientId}
              recipientName={recipientName}
              recipientAvatar={recipientAvatar}
              recipientRole={recipientRole}
              isOnline={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}
