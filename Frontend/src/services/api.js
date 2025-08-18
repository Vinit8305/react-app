import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
// const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
  initAdmin: () => api.post('/auth/init-admin'),
};

// Skills API
export const skillsAPI = {
  getSkills: () => api.get('/skills'),
  getAdminSkills: () => api.get('/skills/admin'),
  createSkill: (skillData) => api.post('/skills', skillData),
  updateSkill: (id, skillData) => api.put(`/skills/${id}`, skillData),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
  reorderSkills: (skills) => api.put('/skills/reorder', { skills }),
};

export const resumeAPI = {
  getResume: () => api.get('/resume'),
  downloadResume: (id) => api.get(`/resume/download/${id}`, { responseType: 'blob' }),
  getAdminResumes: () => api.get('/resume/admin'),
  uploadResume: (formData) => api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteResume: (id) => api.delete(`/resume/${id}`),
  activateResume: (id) => api.put(`/resume/${id}/activate`),
};

export default api;
