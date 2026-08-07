import client from "@/lib/api-client";
import { LoginRequest, LoginResponse } from "@/types/auth";

class AuthService {
  login(data: LoginRequest) {
    return client.post<LoginResponse>("/auth/login", data);
  }
}

export default new AuthService();
