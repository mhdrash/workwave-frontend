import apiClient from './api';

const JOB_ENDPOINT = '/job-cards';

export const getAllJobs = async (filters = {}) => {
  try {
    const response = await apiClient.get(JOB_ENDPOINT, { params: filters });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await apiClient.get(`${JOB_ENDPOINT}/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const createJob = async (jobData) => {
  try {
    const response = await apiClient.post(JOB_ENDPOINT, jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateJob = async (jobId, updateData) => {
  try {
    const response = await apiClient.put(`${JOB_ENDPOINT}/${jobId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const response = await apiClient.delete(`${JOB_ENDPOINT}/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMyJobs = async (employerId, filters = {}) => {
  try {
    const response = await apiClient.get(`${JOB_ENDPOINT}/employer/${employerId}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const closeJob = async (jobId) => {
  try {
    const response = await apiClient.patch(`${JOB_ENDPOINT}/${jobId}/close`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const reopenJob = async (jobId) => {
  try {
    const response = await apiClient.patch(`${JOB_ENDPOINT}/${jobId}/reopen`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getJobsByLocation = async (location, filters = {}) => {
  try {
    const response = await apiClient.get(`${JOB_ENDPOINT}/location/${location}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
