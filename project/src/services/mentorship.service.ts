import { supabase } from '@/lib/supabase/client';
import type { Mentor, MentorshipSession, MentorshipRequest } from '@/types/mentorship';

export const mentorshipService = {
  async getMentors() {
    const { data, error } = await supabase
      .from('mentor_profiles')
      .select('*');

    if (error) throw error;
    return data as Mentor[];
  },

  async getMentorById(mentorId: string) {
    const { data, error } = await supabase
      .from('mentor_profiles')
      .select('*')
      .eq('id', mentorId)
      .single();

    if (error) throw error;
    return data as Mentor;
  },

  async createMentorshipRequest(request: Partial<MentorshipRequest>) {
    const { error } = await supabase
      .from('mentorship_requests')
      .insert(request);

    if (error) throw error;
  },

  async getMentorshipSessions(userId: string) {
    const { data, error } = await supabase
      .from('mentorship_sessions')
      .select('*')
      .or(`mentor_id.eq.${userId},mentee_id.eq.${userId}`);

    if (error) throw error;
    return data as MentorshipSession[];
  },

  async updateSessionStatus(sessionId: string, status: string) {
    const { error } = await supabase
      .from('mentorship_sessions')
      .update({ status })
      .eq('id', sessionId);

    if (error) throw error;
  }
};