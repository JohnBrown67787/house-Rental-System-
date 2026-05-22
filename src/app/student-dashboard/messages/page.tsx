'use client';
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { messagingApi } from "@/services/api";
import type { Conversation, Message } from "@/types";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MessagesContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const initialPropertyId = searchParams.get('propertyId');
  const initialLandlordId = searchParams.get('landlordId');
  const initialLandlordName = searchParams.get('landlordName');
  const initialPropertyTitle = searchParams.get('propertyTitle');

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Load conversations (and optionally create one from property page)
  useEffect(() => {
    if (!user) return;
    const fetchConvs = async () => {
      try {
        let convs = await messagingApi.getConversations(user.id);

        if (initialPropertyId && initialLandlordId && initialLandlordName && initialPropertyTitle) {
          const newConv = await messagingApi.getOrCreateConversation(
            user,
            initialLandlordId,
            initialLandlordName,
            initialPropertyId,
            initialPropertyTitle
          );
          if (!convs.find(c => c.id === newConv.id)) {
            convs = [newConv, ...convs];
          }
          setActiveChat(newConv.id);
        } else if (convs.length > 0 && !activeChat) {
          setActiveChat(convs[0].id);
        }
        setConversations(convs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchConvs();
  }, [user, initialPropertyId, initialLandlordId]);

  // Load messages when conversation changes
  useEffect(() => {
    if (!activeChat) return;
    messagingApi.getMessages(activeChat)
      .then(msgs => {
        setMessages(msgs);
        scrollToBottom();
      })
      .catch(console.error);
  }, [activeChat]);

  // SSE real-time stream
  useEffect(() => {
    if (!activeChat) return;

    // Close any previous connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource(`/api/messages/stream?conversationId=${activeChat}`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const msg: Message = JSON.parse(event.data);
        setMessages(prev => {
          // Skip duplicates (own optimistic messages already added)
          if (prev.some(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
        // Update sidebar preview
        setConversations(prev =>
          prev.map(c => c.id === activeChat
            ? { ...c, lastMessage: msg.text, lastMessageAt: msg.createdAt }
            : c
          )
        );
        scrollToBottom();
      } catch {}
    };

    es.onerror = () => {
      // Browser auto-reconnects SSE on errors
    };

    return () => {
      es.close();
    };
  }, [activeChat]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !user || sending) return;

    const text = newMessage.trim();
    setNewMessage('');
    setSending(true);

    // Optimistic update
    const optimisticMsg: Message = {
      id: `temp-${Date.now()}`,
      conversationId: activeChat,
      senderId: user.id,
      senderName: user.name,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);
    scrollToBottom();

    try {
      const saved = await messagingApi.sendMessage(activeChat, {
        senderId: user.id,
        senderName: user.name,
        text,
      });
      // Replace optimistic with real saved message
      setMessages(prev => prev.map(m => m.id === optimisticMsg.id ? saved : m));
    } catch (err) {
      console.error(err);
      setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
      setNewMessage(text);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e as any);
    }
  };

  const activeConv = conversations.find(c => c.id === activeChat);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-background-light dark:bg-background-dark p-6 gap-6">
      {/* Sidebar: Chat List */}
      <div className="w-80 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">Messages</h2>
            <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm p-6 text-center">
              <span className="material-symbols-outlined text-4xl mb-2">chat_bubble_outline</span>
              <p>No conversations yet</p>
              <p className="text-xs mt-1">Contact a landlord from a property page</p>
            </div>
          ) : (
            conversations.map(chat => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${activeChat === chat.id ? 'bg-primary/20 dark:bg-primary/10 border-l-2 border-blue-600' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm">
                  {chat.otherParticipantName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{chat.otherParticipantName}</p>
                    <p className="text-[10px] text-slate-500 shrink-0 ml-1">
                      {chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </p>
                  </div>
                  <p className="text-xs text-blue-600 mb-0.5 truncate">{chat.propertyTitle}</p>
                  <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                    {chat.lastMessage || 'No messages yet'}
                  </p>
                </div>
                {chat.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {chat.unreadCount}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0 text-sm">
                    {activeConv.otherParticipantName[0]}
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{activeConv.otherParticipantName}</p>
                  <p className="text-xs text-blue-600">{activeConv.propertyTitle}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-800/30">
              {messages.map(msg => {
                const isMe = msg.senderId === user?.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                      <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 mr-2 mt-1">
                        {msg.senderName?.[0]}
                      </div>
                    )}
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-bl-sm'} ${msg.id?.startsWith('temp-') ? 'opacity-70' : ''}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.id?.startsWith('temp-') && ' ✓'}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message... (Enter to send)"
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {sending
                    ? <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    : <span className="material-symbols-outlined">send</span>
                  }
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <span className="material-symbols-outlined text-6xl mb-4 block text-slate-200">forum</span>
              <p className="font-medium text-slate-500">Select a conversation</p>
              <p className="text-sm text-slate-400 mt-1">Messages are delivered in real-time</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="p-8 flex justify-center items-center h-screen">
        <span className="material-symbols-outlined animate-spin text-blue-600 text-3xl">progress_activity</span>
      </div>
    }>
      <MessagesContent />
    </Suspense>
  );
}
