export interface User {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  userEmail: string;
}
