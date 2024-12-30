import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { LabGrid, LabFilters, LabSort, LabDetails } from '@/components/labs';
import { filterLabs } from '@/utils/labFilters';
import { sortLabs } from '@/utils/labSorting';
import { labs } from '@/data/labs';
import type { Lab, LabDifficulty, SortOption } from '@/types/lab';
import { Terminal } from '@/lib/terminal/Terminal';

const LabsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<LabDifficulty[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('points');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const filteredLabs = filterLabs(labs, searchQuery, selectedDifficulties);
  const sortedLabs = sortLabs(filteredLabs, sortOption);

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Hands-on Labs</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Practice your cybersecurity skills with real-world scenarios and earn points.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <LabFilters
            selectedDifficulties={selectedDifficulties}
            onDifficultyChange={setSelectedDifficulties}
          />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search labs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <LabSort
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />
              </div>
            </div>

            <LabGrid 
              labs={sortedLabs}
              onLabClick={setSelectedLab}
            />
          </div>
        </div>
      </div>

      {selectedLab && (
        <LabDetails
          lab={selectedLab}
          onClose={() => setSelectedLab(null)}
        />
      )}
      <Terminal />
    </div>
  );
};

export default LabsPage;