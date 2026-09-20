import axios from "axios";

export const API_BASE = "http://localhost:4000";

export const getMenteeToken = () =>
  localStorage.getItem("mentorOneToken") || "";

export const menteeApi = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

menteeApi.interceptors.request.use((config) => {
  const token = getMenteeToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getApiError = (error, fallback = "Something went wrong.") =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;
