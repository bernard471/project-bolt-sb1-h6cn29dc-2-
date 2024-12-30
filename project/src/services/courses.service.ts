import { supabase } from '../lib/supabase/client';
import { Course } from '../types/course';

export const coursesService = {
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*');
    if (error) throw error;
    return data as Course[];
  },

  async getCourseById(id: number) {
    const { data, error } = await supabase
      .from('courses')
      .select('*, chapters(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Course;
  },

  async enrollInCourse(userId: string, courseId: number) {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        started_at: new Date().toISOString()
      });
    if (error) throw error;
  }
};