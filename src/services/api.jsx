import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
};

export const getIncidents = async (token) => {
  return await axios.get(`${API_URL}/incidents`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getIncidentById = async (id, token) => {
  return await axios.get(`${API_URL}/incidents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createIncident = async (incidentData, token) => {
  return await axios.post(`${API_URL}/incidents`, incidentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateIncident = async (id, incidentData, token) => {
  return await axios.put(`${API_URL}/incidents/${id}`, incidentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteIncident = async (id, token) => {
  return await axios.delete(`${API_URL}/incidents/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
