import { Course, SortOption } from '../types/course';

export const sortCourses = (courses: Course[], sortOption: SortOption): Course[] => {
  const sortedCourses = [...courses];
  
  switch (sortOption) {
    case 'newest':
      return sortedCourses.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'popular':
      return sortedCourses.sort((a, b) => b.popularity - a.popularity);
    case 'title':
      return sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
    case 'duration':
      return sortedCourses.sort((a, b) => 
        parseInt(a.duration) - parseInt(b.duration)
      );
    default:
      return sortedCourses;
  }
};