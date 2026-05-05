import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:8080/api/auth",
  headers: { "Content-Type": "application/json" },
});
 
export const loginUser = async ({ email, password }) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};
 
export const registerUser = async ({ login, email, password }) => {
  const response = await api.post("/registry", { login, email, password });
  return response.data;
};