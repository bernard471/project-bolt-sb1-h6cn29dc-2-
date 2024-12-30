import { Lab, SortOption } from '../types/lab';

export const sortLabs = (labs: Lab[], sortOption: SortOption): Lab[] => {
  const sortedLabs = [...labs];
  
  switch (sortOption) {
    case 'points':
      return sortedLabs.sort((a, b) => b.points - a.points);
    case 'difficulty':
      const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
      return sortedLabs.sort((a, b) => 
        difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    case 'duration':
      return sortedLabs.sort((a, b) => 
        parseInt(a.duration) - parseInt(b.duration)
      );
    default:
      return sortedLabs;
  }
};