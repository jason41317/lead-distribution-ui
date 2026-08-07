import { ApiResponse } from "./api";

export interface User {
  id: number;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  token: string;
  user: User;
}

export type LoginResponse = ApiResponse<LoginData>;
