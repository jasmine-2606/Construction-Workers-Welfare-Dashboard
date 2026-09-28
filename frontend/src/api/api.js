const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
  workers: `${API_BASE_URL}/workers/`,
  schemes: `${API_BASE_URL}/schemes/`,
  applications: `${API_BASE_URL}/applications/`,
  overview: `${API_BASE_URL}/dashboard/overview/`,
  demographics: `${API_BASE_URL}/dashboard/demographics/`,
  dashboardSchemes: `${API_BASE_URL}/dashboard/schemes/`,
  districts: `${API_BASE_URL}/dashboard/districts/`,
};

export const apiFetch = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const getDashboardOverview = () => {
  return apiFetch(API_ENDPOINTS.overview);
};

export const getDashboardDemographics = () => {
  return apiFetch(API_ENDPOINTS.demographics);
};

export const getDashboardSchemes = () => {
  return apiFetch(API_ENDPOINTS.dashboardSchemes);
};

export const getDashboardDistricts = () => {
  return apiFetch(API_ENDPOINTS.districts);
};

export const getApplications = () => {
  return apiFetch(API_ENDPOINTS.applications);
};