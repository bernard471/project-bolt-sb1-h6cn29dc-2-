export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseDuration = '0-2 hours' | '2-4 hours' | '4-8 hours' | '8+ hours';
export type CourseTopic = 'Network Security' | 'Web Security' | 'Cryptography' | 'Malware Analysis' | 'Incident Response' | 'Forensics';
export type SortOption = 'newest' | 'popular' | 'title' | 'duration';

export interface Course {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  duration: string;
  durationCategory: CourseDuration;
  topics: CourseTopic[];
  image: string;
  createdAt: string;
  popularity: number;
  chapters: CourseChapter[];
}

export interface CourseChapter {
  id: number;
  title: string;
  duration: string;
  description: string;
}