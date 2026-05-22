import { EventEmitter } from 'events';

// Global singleton EventEmitter to broadcast new messages across SSE connections
// Works within a single Next.js process (development and single-instance production)
declare global {
  var __messageEmitter: EventEmitter | undefined;
}

if (!global.__messageEmitter) {
  global.__messageEmitter = new EventEmitter();
  global.__messageEmitter.setMaxListeners(100); // Support many concurrent connections
}

export const messageEmitter = global.__messageEmitter;

// Emit a new message to all listeners of a conversation
export function emitNewMessage(conversationId: string, message: object) {
  messageEmitter.emit(`message:${conversationId}`, message);
}

// Emit a conversation update (e.g. new conversation created)
export function emitConversationUpdate(userId: string, conversation: object) {
  messageEmitter.emit(`conversation:${userId}`, conversation);
}
