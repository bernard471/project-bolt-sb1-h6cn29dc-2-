import { supabase } from '../lib/supabase/client';

export const progressService = {
  async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        courses:course_id(title, level),
        achievements:user_achievements(*)
      `)
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },

  async updateLessonProgress(
    userId: string, 
    courseId: number, 
    lessonId: number, 
    completed: boolean
  ) {
    const { data: existing, error: fetchError } = await supabase
      .from('user_progress')
      .select('completed_lessons')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
    
    if (fetchError) throw fetchError;

    const completedLessons = existing?.completed_lessons || [];
    const updatedLessons = completed
      ? [...completedLessons, lessonId]
      : completedLessons.filter(id => id !== lessonId);

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        completed_lessons: updatedLessons,
        last_accessed: new Date().toISOString()
      });
    
    if (error) throw error;
  }
};