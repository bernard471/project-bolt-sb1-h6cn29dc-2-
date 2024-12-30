import React from 'react';
import { Filter } from 'lucide-react';
import type { LabDifficulty } from '@/types/lab';

interface LabFiltersProps {
  selectedDifficulties: LabDifficulty[];
  onDifficultyChange: (difficulties: LabDifficulty[]) => void;
}

const difficulties: LabDifficulty[] = ['Easy', 'Medium', 'Hard'];

const LabFilters: React.FC<LabFiltersProps> = ({
  selectedDifficulties,
  onDifficultyChange,
}) => {
  const toggleDifficulty = (difficulty: LabDifficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      onDifficultyChange(selectedDifficulties.filter(d => d !== difficulty));
    } else {
      onDifficultyChange([...selectedDifficulties, difficulty]);
    }
  };

  return (
    <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div>
        <h3 className="font-medium mb-3">Difficulty</h3>
        {difficulties.map((difficulty) => (
          <label key={difficulty} className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={selectedDifficulties.includes(difficulty)}
              onChange={() => toggleDifficulty(difficulty)}
              className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-gray-700">{difficulty}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LabFilters;