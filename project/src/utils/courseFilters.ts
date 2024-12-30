import { Course, CourseTopic, CourseLevel, CourseDuration } from '../types/course';

export const filterCourses = (
  courses: Course[],
  searchQuery: string,
  selectedLevels: CourseLevel[],
  selectedTopics: CourseTopic[],
  selectedDurations: CourseDuration[]
): Course[] => {
  return courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
    
    const matchesTopics = selectedTopics.length === 0 || 
                         course.topics.some(topic => selectedTopics.includes(topic));
    
    const matchesDuration = selectedDurations.length === 0 || 
                           selectedDurations.includes(course.durationCategory);
    
    return matchesSearch && matchesLevel && matchesTopics && matchesDuration;
  });
};