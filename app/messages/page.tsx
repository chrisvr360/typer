"use client"
import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'host';
  timestamp: string;
}

interface Conversation {
  id: number;
  host: {
    name: string;
    avatar: string;
  };
  listing: {
    title: string;
    image: string;
  };
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

// Dummy data for demonstration
const dummyConversations: Conversation[] = [
  {
    id: 1,
    host: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    },
    listing: {
      title: "Luxury Beachfront Villa",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60",
    },
    lastMessage: "Looking forward to hosting you!",
    timestamp: "10:30 AM",
    messages: [
      {
        id: 1,
        text: "Hi, I'm interested in booking your villa for next weekend.",
        sender: "user",
        timestamp: "10:15 AM",
      },
      {
        id: 2,
        text: "Hello! Yes, the villa is available for next weekend.",
        sender: "host",
        timestamp: "10:20 AM",
      },
      {
        id: 3,
        text: "Great! What's the check-in time?",
        sender: "user",
        timestamp: "10:25 AM",
      },
      {
        id: 4,
        text: "Looking forward to hosting you!",
        sender: "host",
        timestamp: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    host: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
    },
    listing: {
      title: "Mountain View Cottage",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
    },
    lastMessage: "The cottage is ready for your stay!",
    timestamp: "Yesterday",
    messages: [
      {
        id: 1,
        text: "Is the cottage pet-friendly?",
        sender: "user",
        timestamp: "Yesterday",
      },
      {
        id: 2,
        text: "Yes, we welcome well-behaved pets!",
        sender: "host",
        timestamp: "Yesterday",
      },
      {
        id: 3,
        text: "Perfect! I'll bring my dog.",
        sender: "user",
        timestamp: "Yesterday",
      },
      {
        id: 4,
        text: "The cottage is ready for your stay!",
        sender: "host",
        timestamp: "Yesterday",
      },
    ],
  },
]

export default function MessagesPage() {
  const [conversations] = useState(dummyConversations)
  const [selectedConversation, setSelectedConversation] = useState(dummyConversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: selectedConversation.messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      selectedConversation.messages.push(newMsg)
      setNewMessage("")
    }
  }

  return (
    <div className="space-y-8">
      <div className="glass-card flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          Messages
        </h1>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-teal-500" />
          <span className="text-teal-500">{conversations.length} conversations</span>
        </div>
      </div>

      {conversations.length === 0 ? (
        <div className="glass-card text-center py-12">
          <Clock className="h-16 w-16 mx-auto text-teal-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No messages yet</h2>
          <p className="text-muted-foreground mb-6">
            Start a conversation with a host
          </p>
          <Link href="/" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-6 py-2 rounded-full text-teal-500 hover:bg-teal-500/10"
            >
              Explore Properties
            </motion.div>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1 glass-card">
            <div className="p-4 border-b border-teal-500/20">
              <h2 className="text-xl font-semibold text-white">Conversations</h2>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 p-2">
                {conversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedConversation.id === conversation.id
                          ? 'bg-teal-500/20'
                          : 'hover:bg-teal-500/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={conversation.host.avatar} />
                          <AvatarFallback>
                            {conversation.host.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white truncate">
                            {conversation.host.name}
                          </div>
                          <div className="text-sm text-teal-200/80 truncate">
                            {conversation.listing.title}
                          </div>
                          <div className="text-xs text-teal-200/60 truncate">
                            {conversation.lastMessage}
                          </div>
                        </div>
                        <div className="text-xs text-teal-200/60">
                          {conversation.timestamp}
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 glass-card">
            <div className="p-4 border-b border-teal-500/20">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={selectedConversation.host.avatar} />
                  <AvatarFallback>
                    {selectedConversation.host.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {selectedConversation.host.name}
                  </h2>
                  <p className="text-sm text-teal-200/80">
                    {selectedConversation.listing.title}
                  </p>
                </div>
              </div>
            </div>
            <ScrollArea className="h-[500px]">
              <div className="p-4 space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-teal-500/20 text-white'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className="text-xs text-teal-200/60 mt-1 block">
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-teal-500/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 glass px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
                <button
                  onClick={handleSendMessage}
                  className="glass-card p-2 rounded-full text-teal-500 hover:bg-teal-500/10"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 