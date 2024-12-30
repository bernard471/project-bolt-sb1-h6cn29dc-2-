import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { labsService } from '../services/labs.service';
import { Lab } from '../types/lab';
import { Terminal, Trophy, Clock } from 'lucide-react';
import { TerminalLab } from '../components/labs/TerminalLab';
import { useNavigate } from 'react-router-dom';


const LabDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lab, setLab] = useState<Lab | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const data = await labsService.getLabById(Number(id));
        setLab(data);
      } catch (error) {
        console.error('Failed to fetch lab:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Lab not found</h2>
      </div>
    );
  }

  if (started) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TerminalLab
          lab={lab}
          onComplete={(success) => {
            if (success) {
              // Handle lab completion
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{lab.title}</h1>
          <p className="text-gray-600 mb-8">{lab.description}</p>

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
              <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {lab.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Tools Required</h2>
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
              onClick={() => setStarted(true)}
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

export default LabDetailPage;