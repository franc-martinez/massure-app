import { APICore } from "./apiCore";

const api = new APICore();

// account
function login(params: { username: string; password: string }) {
  const baseUrl = "/login/";
  return api.create(`${baseUrl}`, params);
}

export { login };
