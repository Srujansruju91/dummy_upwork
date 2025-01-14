import { supabase } from '../lib/supabase';
import type { TalentData } from '../types/talent';

export async function createTalent(talentData: TalentData) {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('users')
    .update({
      title: talentData.title,
      bio: talentData.bio,
      hourly_rate: talentData.hourlyRate,
      availability: talentData.availability
    })
    .eq('id', session.user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTalents() {
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      user_skills(
        skills(name)
      )
    `)
    .eq('user_type', 'freelancer')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}