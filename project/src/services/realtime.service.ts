import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase/client';

export class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  joinRoom(roomId: string, callbacks: {
    onUserJoin?: (user: any) => void;
    onUserLeave?: (user: any) => void;
    onMessage?: (message: any) => void;
  }) {
    const channel = supabase.channel(`room:${roomId}`)
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        callbacks.onUserJoin?.(newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        callbacks.onUserLeave?.(leftPresences);
      })
      .on('broadcast', { event: 'message' }, ({ payload }) => {
        callbacks.onMessage?.(payload);
      })
      .subscribe();

    this.channels.set(roomId, channel);
    return channel;
  }

  leaveRoom(roomId: string) {
    const channel = this.channels.get(roomId);
    if (channel) {
      channel.unsubscribe();
      this.channels.delete(roomId);
    }
  }

  sendMessage(roomId: string, message: any) {
    const channel = this.channels.get(roomId);
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'message',
        payload: message
      });
    }
  }
}