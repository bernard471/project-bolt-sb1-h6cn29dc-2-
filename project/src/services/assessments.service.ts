import { supabase } from '../lib/supabase/client';
import { Assessment, AssessmentSubmission } from '../types/assessment';

export const assessmentsService = {
  async getAssessments(courseId: number) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('course_id', courseId);
    if (error) throw error;
    return data as Assessment[];
  },

  async submitAssessment(submission: AssessmentSubmission) {
    const { error } = await supabase
      .from('assessment_submissions')
      .insert({
        user_id: submission.userId,
        assessment_id: submission.assessmentId,
        answers: submission.answers,
        score: submission.score,
        submitted_at: new Date().toISOString()
      });
    if (error) throw error;
  },

  async getAssessmentResults(userId: string, assessmentId: number) {
    const { data, error } = await supabase
      .from('assessment_submissions')
      .select('*')
      .eq('user_id', userId)
      .eq('assessment_id', assessmentId)
      .single();
    if (error) throw error;
    return data;
  }
};