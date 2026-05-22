export interface User {
  email: string;
  id: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SessionData {
  token: string;
  user: User;
}

export interface SessionResponse {
  token: string;
  userFromId: User;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload extends SignInPayload {
  name: string;
}
