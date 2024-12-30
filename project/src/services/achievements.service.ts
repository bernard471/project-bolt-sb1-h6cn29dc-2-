import { supabase } from '../lib/supabase/client';

export const achievementsService = {
  async getAchievements(userId: string) {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },

  async awardAchievement(
    userId: string,
    achievementType: string,
    achievementId: string,
    metadata: Record<string, any> = {}
  ) {
    const { error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_type: achievementType,
        achievement_id: achievementId,
        metadata,
        earned_at: new Date().toISOString()
      });
    if (error) throw error;
  }
};