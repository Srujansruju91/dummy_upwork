export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'client' | 'freelancer';
  country: string;
  phone_number?: string;
  title?: string;
  bio?: string;
  hourly_rate?: number;
  availability?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface SignUpData {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
  user_type: 'client' | 'freelancer';
}