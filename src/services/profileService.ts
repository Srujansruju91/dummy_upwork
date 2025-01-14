import { supabase } from '../lib/supabase';

export async function updateProfile(profileData: any) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('users')
    .update(profileData)
    .eq('id', user.id);

  if (error) throw error;
}

export async function uploadResume(formData: FormData) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const file = formData.get('resume') as File;
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}-${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('resumes')
    .upload(fileName, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('resumes')
    .getPublicUrl(fileName);

  await updateProfile({ resume_url: publicUrl });

  return publicUrl;
}

export async function getProfileDetails() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}