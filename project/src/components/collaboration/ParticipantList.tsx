import React from 'react';
import { User } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  status: 'online' | 'away' | 'busy';
}

interface ParticipantListProps {
  participants: Participant[];
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ participants }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Participants</h3>
      </div>
      <div className="p-4">
        <div className="space-y-3">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="font-medium text-gray-900">
                  {participant.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    participant.status === 'online'
                      ? 'bg-green-500'
                      : participant.status === 'away'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                <span className="text-sm text-gray-500">
                  {participant.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};