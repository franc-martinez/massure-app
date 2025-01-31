import { UserData } from "@/pages/auth/Register";
import { APICore } from "./apiCore";

const api = new APICore();

function login(params: { email: string; password: string }) {
  return api.create('/login', params);
}

function signup(params: UserData) {
  return api.create('/register', params);
}

function getAccount() {
  return api.get('/me');
}

function logout() {
  return api.create('/logout');
}

export { login, signup, getAccount, logout };
