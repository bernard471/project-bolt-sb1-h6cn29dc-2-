import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Terminal, Trophy } from 'lucide-react';
import type { Lab } from '@/types/lab';

interface LabDetailsProps {
  lab: Lab;
  onClose: () => void;
}

const LabDetails: React.FC<LabDetailsProps> = ({ lab, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                ${lab.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  lab.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'}`}
              >
                {lab.difficulty}
              </span>
              <div className="flex items-center text-cyan-600 mt-2">
                <Trophy className="w-4 h-4 mr-1" />
                <span className="font-medium">{lab.points} pts</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-4">{lab.title}</h2>
          <p className="text-gray-600 mb-6">{lab.description}</p>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{lab.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-gray-400" />
              <span>Hands-on Lab</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {lab.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Tools Required</h3>
              <div className="flex flex-wrap gap-2">
                {lab.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
          <button 
            onClick={() => {
              onClose();
              navigate(`/labs/${lab.id}/terminal`);
            }}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
          >
            Start Lab
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDetails;