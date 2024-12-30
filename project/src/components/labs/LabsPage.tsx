import React, { useState } from 'react';
import { Search } from 'lucide-react';
import LabGrid from './LabGrid';
import LabFilters from './LabFilters';
import LabSort from './LabSort';
import LabDetails from './LabDetails';
import { filterLabs } from '../../utils/labFilters';
import { sortLabs } from '../../utils/labSorting';
import { Lab, LabDifficulty, SortOption } from '../../types/lab';
import { labs } from '../../data/labs';
import { Terminal } from '../../lib/terminal/Terminal';
const LabsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<LabDifficulty[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('points');
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);

  const filteredLabs = filterLabs(labs, searchQuery, selectedDifficulties);
  const sortedLabs = sortLabs(filteredLabs, sortOption);

  return (
    <section className="py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Practical Labs</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Put your skills to the test with our hands-on cybersecurity labs.
            Practice in real-world scenarios and earn points.
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
    </section>
  );
};
export default LabsPage;