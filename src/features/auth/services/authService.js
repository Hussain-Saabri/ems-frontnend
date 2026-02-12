import apiClient from '../../../api/apiClient';

// services/authService.js
export const authService = {
  login: (data) => apiClient.post("/users/login", data),
  register: (data) => apiClient.post("/auth/users/register", data),
};
