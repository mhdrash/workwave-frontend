import axios from "axios";

export const getAllJobs = async () => {
  try {
    
    const response = await axios.get('/jobs');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getJobById = async (jobId) => {
  try {
    const response = await apiClient.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const createJob = async (jobData) => {
  try {
    const response = await apiClient.post('/jobs', jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateJob = async (jobId, updateData) => {
  try {
    const response = await apiClient.put(`/jobs/${jobId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const response = await apiClient.delete(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMyJobs = async (employerId, filters = {}) => {
  try {
    const response = await apiClient.get(`/jobs/employer/${employerId}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const closeJob = async (jobId) => {
  try {
    const response = await apiClient.patch(`/jobs/${jobId}/close`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const reopenJob = async (jobId) => {
  try {
    const response = await apiClient.patch(`/jobs/${jobId}/reopen`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getJobsByLocation = async (location, filters = {}) => {
  try {
    const response = await apiClient.get(`/jobs/location/${location}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

