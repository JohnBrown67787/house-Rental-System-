import { messageEmitter } from '@/lib/messageEmitter';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return new Response('conversationId is required', { status: 400 });
  }

  const eventName = `message:${conversationId}`;

  const stream = new ReadableStream({
    start(controller) {
      // Send an initial keep-alive comment so the client knows the connection is open
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(': ping\n\n'));
        } catch {
          clearInterval(keepAlive);
        }
      }, 20000); // ping every 20s to prevent timeout

      const onMessage = (message: object) => {
        try {
          const data = `data: ${JSON.stringify(message)}\n\n`;
          controller.enqueue(new TextEncoder().encode(data));
        } catch {
          // Client disconnected
          cleanup();
        }
      };

      const cleanup = () => {
        clearInterval(keepAlive);
        messageEmitter.off(eventName, onMessage);
        try { controller.close(); } catch {}
      };

      messageEmitter.on(eventName, onMessage);

      // Clean up when the client disconnects
      req.signal.addEventListener('abort', cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering if behind proxy
    },
  });
}
