'use client';
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (!user) return;
    messagingApi.getConversations(user.id)
      .then(convs => {
        setConversations(convs);
        if (convs.length > 0 && !activeConvId) setActiveConvId(convs[0].id);
      })
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    if (!activeConvId) return;
    messagingApi.getMessages(activeConvId)
      .then(setMessages)
      .catch(console.error);
  }, [activeConvId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConvId || !user) return;
    
    try {
      const msg = await messagingApi.sendMessage(activeConvId, {
        senderId: user.id,
        senderName: user.name,
        text: newMessage
      });
      setMessages(prev => [...prev, msg]);
      setNewMessage('');
    } catch (err) {
      console.error(err);
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
          {conversations.map((conv) => (
            <div key={conv.id} onClick={() => setActiveConvId(conv.id)} className={`p-4 border-b border-slate-50 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${conv.id === activeConvId ? 'bg-primary/20 dark:bg-primary/5' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary shrink-0 overflow-hidden relative">
                  {conv.otherParticipantAvatar && <Image src={conv.otherParticipantAvatar} alt={conv.otherParticipantName} fill className="object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{conv.otherParticipantName}</p>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">{new Date(conv.lastMessageAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-blue-600 mb-1 truncate">{conv.propertyTitle}</p>
                  <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unreadCount > 0 && <span className="shrink-0 size-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{conv.unreadCount}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-slate-50 dark:bg-background-dark">
          {/* Chat Header */}
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary overflow-hidden relative">
                {activeConv.otherParticipantAvatar ? (
                  <Image src={activeConv.otherParticipantAvatar} alt={activeConv.otherParticipantName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">{activeConv.otherParticipantName[0]}</div>
                )}
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{activeConv.otherParticipantName}</p>
                <Link href={`/property/${activeConv.propertyId}`} className="text-xs text-blue-600 hover:underline">{activeConv.propertyTitle}</Link>
              </div>
            </div>
            <Link href={`/property/${activeConv.propertyId}`} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300">
              <span className="material-symbols-outlined text-sm">open_in_new</span> View Property
            </Link>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm rounded-bl-sm'}`}>
                    {msg.text}
                    <p className={`text-[10px] mt-1 ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Input */}
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type your reply..." className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20" />
              <button disabled={!newMessage.trim()} type="submit" className="px-5 py-3 bg-blue-600 disabled:opacity-50 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">send</span> Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400">
          <div className="text-center">
            <span className="material-symbols-outlined text-5xl mb-3">chat_bubble</span>
            <p>Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
