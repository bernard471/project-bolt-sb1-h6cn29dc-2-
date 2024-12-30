import { useState, useEffect } from 'react';
import { RealtimeService } from '../services/realtime.service';
import { useAuth } from './useAuth';

const realtimeService = new RealtimeService();

export function useCollaboration(roomId: string) {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !roomId) return;

    const channel = realtimeService.joinRoom(roomId, {
      onUserJoin: (newUsers) => {
        setParticipants(prev => [...prev, ...newUsers]);
      },
      onUserLeave: (leftUsers) => {
        setParticipants(prev => 
          prev.filter(p => !leftUsers.find((u: { id: any; }) => u.id === p.id))
        );
      },
      onMessage: (message) => {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      realtimeService.leaveRoom(roomId);
    };
  }, [roomId, user]);

  const sendMessage = (content: string) => {
    if (!user || !roomId) return;

    realtimeService.sendMessage(roomId, {
      userId: user.id,
      userName: user.displayName,
      content,
      timestamp: new Date().toISOString()
    });
  };

  return {
    participants,
    messages,
    sendMessage
  };
}