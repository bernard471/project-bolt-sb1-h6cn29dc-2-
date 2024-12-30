import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { MentorCard } from './MentorCard';
import { MentorshipRequestForm } from './MentorshipRequestForm';
import { mentorshipService } from '@/services/mentorship.service';
import type { Mentor } from '@/types/mentorship';
import { MentorExpertise } from '@/types/mentorship';

const MentorshipPage: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<MentorExpertise[]>([]);
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const data = await mentorshipService.getMentors();
        setMentors(data);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = 
      mentor.user?.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesExpertise = 
      selectedExpertise.length === 0 ||
      selectedExpertise.some(exp => mentor.expertise.includes(exp));
    
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Find Your Mentor</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Connect with experienced cybersecurity professionals for personalized guidance
            and accelerate your learning journey.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold">Expertise</h2>
            </div>
            {Object.values(MentorExpertise).map((expertise) => (
              <label key={expertise} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedExpertise.includes(expertise)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedExpertise([...selectedExpertise, expertise]);
                    } else {
                      setSelectedExpertise(selectedExpertise.filter(exp => exp !== expertise));
                    }
                  }}
                  className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
                <span className="text-gray-700">{expertise}</span>
              </label>
            ))}
          </div>

          {/* Mentor List */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    onRequestSession={setSelectedMentorId}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedMentorId && (
        <MentorshipRequestForm
          mentorId={selectedMentorId}
          onClose={() => setSelectedMentorId(null)}
          onSuccess={() => {
            setSelectedMentorId(null);
          }}
        />
      )}
    </div>
  );
};

export default MentorshipPage;