import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';
import { useAuth } from './useAuth';

export function useProgress(courseId: number) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    completedLessons: [] as number[],
    progressPercentage: 0,
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    if (!user) return;

    async function fetchProgress() {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_progress')
        .select('completed_lessons, progress_percentage')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .single();

      if (error) {
        setProgress(state => ({
          ...state,
          loading: false,
          error: error.message,
        }));
        return;
      }

      setProgress({
        completedLessons: data?.completed_lessons || [],
        progressPercentage: data?.progress_percentage || 0,
        loading: false,
        error: null,
      });
    }
    fetchProgress();
  }, [user, courseId]);

  const updateProgress = async (lessonId: number, completed: boolean, totalLessons: number) => {
    if (!user) return;

    const newCompletedLessons = completed
      ? [...progress.completedLessons, lessonId]
      : progress.completedLessons.filter(id => id !== lessonId);

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        course_id: courseId,
        completed_lessons: newCompletedLessons,
        progress_percentage: Math.round((newCompletedLessons.length / totalLessons) * 100),
        last_accessed: new Date().toISOString(),
      });

    if (!error) {
      setProgress(state => ({
        ...state,
        completedLessons: newCompletedLessons,
      }));
    }
  };
  return { ...progress, updateProgress };
}