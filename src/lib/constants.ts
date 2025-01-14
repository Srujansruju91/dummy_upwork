export const API_ENDPOINTS = {
  AUTH: import.meta.env.VITE_AUTH_URL,
  JOBS: import.meta.env.VITE_JOBS_URL,
  PROPOSALS: import.meta.env.VITE_PROPOSALS_URL,
} as const;

export const JOB_STATUS = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const ERROR_MESSAGES = {
  FETCH_JOBS: 'Failed to fetch jobs. Please try again later.',
  UPDATE_JOB: 'Failed to update job status. Please try again.',
  CREATE_JOB: 'Failed to create job. Please try again.',
  UNAUTHORIZED: 'Please log in to continue.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const;