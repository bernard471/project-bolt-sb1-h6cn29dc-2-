export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  displayName: string;
}