import { supabase } from '../lib/supabase/client';
import { Lab } from '../types/lab';

export const labsService = {
  async getLabs() {
    const { data, error } = await supabase
      .from('labs')
      .select('*');
    if (error) throw error;
    return data as Lab[];
  },

  async getLabById(id: number) {
    const { data, error } = await supabase
      .from('labs')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Lab;
  },

  async submitLabSolution(userId: string, labId: number, solution: string) {
    const { error } = await supabase
      .from('lab_submissions')
      .insert({
        user_id: userId,
        lab_id: labId,
        solution,
        submitted_at: new Date().toISOString()
      });
    if (error) throw error;
  }
};