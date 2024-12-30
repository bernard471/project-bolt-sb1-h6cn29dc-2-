import { Lab, LabDifficulty } from '../types/lab';

export const filterLabs = (
  labs: Lab[],
  searchQuery: string,
  selectedDifficulties: LabDifficulty[]
): Lab[] => {
  return labs.filter((lab) => {
    const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = selectedDifficulties.length === 0 || 
                             selectedDifficulties.includes(lab.difficulty);
    
    return matchesSearch && matchesDifficulty;
  });
};