import { supabase } from '../lib/supabase';
import type { JobPostingData, JobStatus } from '../types/job';

export async function createJob(jobData: JobPostingData) {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('jobs')
    .insert([{
      ...jobData,
      client_id: session.user.id,
      status: 'OPEN'
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      client:users(first_name, last_name)
    `)
    .eq('status', 'OPEN')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getMyJobs(status: JobStatus) {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('jobs')
    .select(`
      *,
      client:users(first_name, last_name)
    `)
    .eq('client_id', session.user.id)
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}