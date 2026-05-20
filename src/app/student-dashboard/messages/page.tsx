'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
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

  useEffect(() => {
    if (!user) return;
    const fetchConvs = async () => {
      try {
        let convs = await messagingApi.getConversations(user.id);
        
        // If coming from property page, initialize/find conversation
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

  useEffect(() => {
    if (!activeChat) return;
    messagingApi.getMessages(activeChat).then(setMessages).catch(console.error);
  }, [activeChat]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !user) return;
    try {
      const msg = await messagingApi.sendMessage(activeChat, {
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

  const activeConv = conversations.find(c => c.id === activeChat);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-background-light dark:bg-background-dark p-6 gap-6">
      {/* Sidebar: Chat List */}
      <div className="w-80 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden shrink-0">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-bold text-lg text-slate-900 dark:text-white">Messages</h2>
          <div className="mt-4 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <input type="text" placeholder="Search conversations..." className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-600/50" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
          {conversations.map(chat => (
            <button key={chat.id} onClick={() => setActiveChat(chat.id)} className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${activeChat === chat.id ? 'bg-primary/20 dark:bg-primary/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
                {chat.otherParticipantName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{chat.otherParticipantName}</p>
                  <p className="text-[10px] text-slate-500">{chat.lastMessageAt ? new Date(chat.lastMessageAt).toLocaleDateString() : ''}</p>
                </div>
                <p className="text-xs text-blue-600 mb-0.5 truncate">{chat.propertyTitle}</p>
                <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}>{chat.lastMessage}</p>
              </div>
              {chat.unreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {chat.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold shrink-0">
              {activeConv?.otherParticipantName[0]}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{activeConv?.otherParticipantName}</p>
              <p className="text-xs text-slate-500">{activeConv?.propertyTitle}</p>
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
                <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-bl-sm'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSend} className="flex gap-2">
            <button type="button" className="p-3 text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 rounded-xl transition-colors">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <input 
              type="text" 
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/50"
            />
            <button type="submit" disabled={!newMessage.trim()} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors">
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-blue-600 text-3xl">progress_activity</span></div>}>
      <MessagesContent />
    </Suspense>
  );
}
