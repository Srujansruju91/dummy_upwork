export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone_number: string | null
          country: string
          user_type: 'client' | 'freelancer'
          hourly_rate: number | null
          title: string | null
          bio: string | null
          availability: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone_number?: string | null
          country: string
          user_type: 'client' | 'freelancer'
          hourly_rate?: number | null
          title?: string | null
          bio?: string | null
          availability?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone_number?: string | null
          country?: string
          user_type?: 'client' | 'freelancer'
          hourly_rate?: number | null
          title?: string | null
          bio?: string | null
          availability?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          description: string
          budget: number
          experience_level: 'ENTRY' | 'INTERMEDIATE' | 'EXPERT'
          status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          client_id: string
          freelancer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          budget: number
          experience_level: 'ENTRY' | 'INTERMEDIATE' | 'EXPERT'
          status?: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          client_id: string
          freelancer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          budget?: number
          experience_level?: 'ENTRY' | 'INTERMEDIATE' | 'EXPERT'
          status?: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
          client_id?: string
          freelancer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}