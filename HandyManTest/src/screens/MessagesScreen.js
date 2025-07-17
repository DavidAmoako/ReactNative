"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, RefreshControl, Alert } from "react-native"
import { Card, Avatar, Chip, Searchbar, FAB } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useAuth } from "../contexts/AuthContext"
import { apiClient } from "../services/apiClient"
import { theme } from "../theme"

const MessagesScreen = ({ navigation }) => {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      participantName: "John Smith",
      participantRole: "worker",
      lastMessage: "I'll be there at 2 PM tomorrow for the plumbing work.",
      timestamp: "2024-01-15T14:30:00Z",
      unreadCount: 2,
      avatar: "JS",
      service: "Plumbing",
      status: "active",
    },
    {
      id: 2,
      participantName: "Maria Garcia",
      participantRole: "worker",
      lastMessage: "The cleaning service has been completed. Thank you!",
      timestamp: "2024-01-15T10:15:00Z",
      unreadCount: 0,
      avatar: "MG",
      service: "Cleaning",
      status: "completed",
    },
    {
      id: 3,
      participantName: "David Wilson",
      participantRole: "worker",
      lastMessage: "Can we reschedule the carpentry work to next week?",
      timestamp: "2024-01-14T16:45:00Z",
      unreadCount: 1,
      avatar: "DW",
      service: "Carpentry",
      status: "pending",
    },
    {
      id: 4,
      participantName: "Sarah Johnson",
      participantRole: "user",
      lastMessage: "Looking forward to the garden maintenance tomorrow.",
      timestamp: "2024-01-14T09:20:00Z",
      unreadCount: 0,
      avatar: "SJ",
      service: "Gardening",
      status: "confirmed",
    },
  ]

  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getConversations()

      if (response.success) {
        setConversations(response.data)
      } else {
        // Use mock data if API fails
        setConversations(mockConversations)
      }
    } catch (error) {
      setConversations(mockConversations)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadConversations()
    setRefreshing(false)
  }

  const handleConversationPress = (conversation) => {
    navigation.navigate("ChatDetail", { conversation })
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#10b981"
      case "pending":
        return "#f59e0b"
      case "completed":
        return "#6b7280"
      case "confirmed":
        return "#3b82f6"
      default:
        return "#6b7280"
    }
  }

  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.service.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderConversationItem = ({ item }) => (
    <Card style={styles.conversationCard} onPress={() => handleConversationPress(item)}>
      <Card.Content style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Avatar.Text size={48} label={item.avatar} />
          <View style={styles.conversationInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.participantName}>{item.participantName}</Text>
              {item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
            <View style={styles.serviceRow}>
              <Chip
                mode="outlined"
                textStyle={{ color: getStatusColor(item.status), fontSize: 12 }}
                style={[styles.serviceChip, { borderColor: getStatusColor(item.status) }]}
              >
                {item.service}
              </Chip>
              <Text style={styles.roleText}>{item.participantRole === "worker" ? "Professional" : "Client"}</Text>
            </View>
            <Text style={styles.lastMessage} numberOfLines={2}>
              {item.lastMessage}
            </Text>
          </View>
          <View style={styles.conversationMeta}>
            <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.onSurfaceVariant} />
          </View>
        </View>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>Stay connected with your service providers</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search conversations..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredConversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.conversationsList}
        contentContainerStyle={styles.conversationsContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="message-outline" size={64} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.emptyTitle}>No Messages Yet</Text>
            <Text style={styles.emptySubtitle}>Your conversations with service providers will appear here</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => Alert.alert("Info", "New conversation feature coming soon")}
        label="New Chat"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    elevation: 2,
  },
  conversationsList: {
    flex: 1,
  },
  conversationsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  conversationCard: {
    marginBottom: 12,
    elevation: 2,
  },
  conversationContent: {
    paddingVertical: 16,
  },
  conversationHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  conversationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  participantName: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.onSurface,
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  serviceChip: {
    marginRight: 8,
    height: 24,
  },
  roleText: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    fontStyle: "italic",
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
  conversationMeta: {
    alignItems: "flex-end",
    marginLeft: 12,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: theme.colors.onSurface,
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
})

export default MessagesScreen
