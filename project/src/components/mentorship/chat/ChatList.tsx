import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { ChatWindow } from './ChatWindow';
import { mentorshipService } from '../../../services/mentorship.service';

export const ChatList: React.FC = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user) return;
      try {
        const sessions = await mentorshipService.getMentorshipSessions(user.id);
        // Group chats by mentee/mentor
        const uniqueChats = sessions.reduce((acc, session) => {
          const chatPartnerId = user.id === session.mentorId 
            ? session.menteeId 
            : session.mentorId;
          if (!acc.find(chat => chat.partnerId === chatPartnerId)) {
            acc.push({
              id: session.id,
              partnerId: chatPartnerId,
              lastMessage: session.lastMessage,
              updatedAt: session.updatedAt
            });
          }
          return acc;
        }, []);
        setChats(uniqueChats);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-3 h-[600px]">
        <div className="border-r">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(600px-65px)]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedChat?.id === chat.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${chat.partnerName}`}
                    alt={chat.partnerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{chat.partnerName}</h3>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          {selectedChat ? (
            <ChatWindow chatId={selectedChat.id} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};