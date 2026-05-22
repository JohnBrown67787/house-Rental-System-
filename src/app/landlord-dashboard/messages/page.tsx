'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { messagingApi } from "@/services/api";
import type { Conversation, Message } from "@/types";

export default function LandlordMessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  // Load conversations
  useEffect(() => {
    if (!user) return;
    messagingApi.getConversations(user.id)
      .then(convs => {
        setConversations(convs);
        if (convs.length > 0 && !activeConvId) setActiveConvId(convs[0].id);
      })
      .catch(console.error);
  }, [user]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConvId) return;
    messagingApi.getMessages(activeConvId)
      .then(msgs => {
        setMessages(msgs);
        scrollToBottom();
      })
      .catch(console.error);
  }, [activeConvId]);

  // Set up SSE real-time stream whenever active conversation changes
  useEffect(() => {
    if (!activeConvId) return;

    // Close existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const es = new EventSource(`/api/messages/stream?conversationId=${activeConvId}`);
    eventSourceRef.current = es;

    es.onmessage = (event) => {
      try {
        const msg: Message = JSON.parse(event.data);
        setMessages(prev => {
          // Avoid duplicates (our own messages are already added optimistically)
          if (prev.some(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
        // Update last message preview in sidebar
        setConversations(prev =>
          prev.map(c => c.id === activeConvId
            ? { ...c, lastMessage: msg.text, lastMessageAt: msg.createdAt }
            : c
          )
        );
        scrollToBottom();
      } catch {}
    };

    es.onerror = () => {
      // SSE auto-reconnects on error, no action needed
    };

    return () => {
      es.close();
    };
  }, [activeConvId]);

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
    if (!newMessage.trim() || !activeConvId || !user || sending) return;

    const text = newMessage.trim();
    setNewMessage('');
    setSending(true);

    // Optimistic update — add message immediately to UI
    const optimisticMsg: Message = {
      id: `temp-${Date.now()}`,
      conversationId: activeConvId,
      senderId: user.id,
      senderName: user.name,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);
    scrollToBottom();

    try {
      const saved = await messagingApi.sendMessage(activeConvId, {
        senderId: user.id,
        senderName: user.name,
        text,
      });
      // Replace optimistic message with the real one
      setMessages(prev => prev.map(m => m.id === optimisticMsg.id ? saved : m));
    } catch (err) {
      console.error(err);
      // Remove failed optimistic message
      setMessages(prev => prev.filter(m => m.id !== optimisticMsg.id));
      setNewMessage(text); // Restore text
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSend(e as any);
    }
  };

  const activeConv = conversations.find(c => c.id === activeConvId);

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Conversation List */}
      <div className="w-80 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white text-base mb-3">Messages</h3>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input placeholder="Search conversations..." className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm p-6 text-center">
              <span className="material-symbols-outlined text-4xl mb-2">chat_bubble_outline</span>
              <p>No conversations yet</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`p-4 border-b border-slate-50 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${conv.id === activeConvId ? 'bg-primary/20 dark:bg-primary/5 border-l-2 border-l-blue-600' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary shrink-0 overflow-hidden relative flex items-center justify-center text-blue-700 font-bold text-sm">
                    {conv.otherParticipantAvatar
                      ? <Image src={conv.otherParticipantAvatar} alt={conv.otherParticipantName} fill className="object-cover" />
                      : conv.otherParticipantName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{conv.otherParticipantName}</p>
                      <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                        {conv.lastMessageAt ? new Date(conv.lastMessageAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 mb-1 truncate">{conv.propertyTitle}</p>
                    <p className="text-xs text-slate-500 truncate">{conv.lastMessage || 'No messages yet'}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="shrink-0 size-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{conv.unreadCount}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark">
          {/* Chat Header */}
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary overflow-hidden relative flex items-center justify-center text-blue-700 font-bold text-sm">
                  {activeConv.otherParticipantAvatar
                    ? <Image src={activeConv.otherParticipantAvatar} alt={activeConv.otherParticipantName} fill className="object-cover" />
                    : activeConv.otherParticipantName[0]}
                </div>
                {/* Online indicator */}
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{activeConv.otherParticipantName}</p>
                <Link href={`/property/${activeConv.propertyId}`} className="text-xs text-blue-600 hover:underline">{activeConv.propertyTitle}</Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Live
              </span>
              <Link href={`/property/${activeConv.propertyId}`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300">
                <span className="material-symbols-outlined text-sm">open_in_new</span> View Property
              </Link>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-blue-700 font-bold text-xs shrink-0 mr-2 mt-1">
                      {msg.senderName?.[0]}
                    </div>
                  )}
                  <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm rounded-bl-sm'} ${msg.id?.startsWith('temp-') ? 'opacity-70' : ''}`}>
                    {msg.text}
                    <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-200 text-right' : 'text-slate-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                      {msg.id?.startsWith('temp-') && <span className="ml-1">✓</span>}
                    </p>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your reply... (Enter to send)"
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
              <button
                disabled={!newMessage.trim() || sending}
                type="submit"
                className="px-5 py-3 bg-blue-600 disabled:opacity-50 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                {sending
                  ? <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                  : <span className="material-symbols-outlined text-sm">send</span>
                }
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl mb-4 block text-slate-200">chat_bubble</span>
            <p className="font-medium text-slate-500">Select a conversation to start messaging</p>
            <p className="text-sm text-slate-400 mt-1">Messages are delivered in real-time</p>
          </div>
        </div>
      )}
    </div>
  );
}
