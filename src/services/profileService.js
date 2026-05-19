import apiClient from './api';

export const getJobSeekerProfile = async (jobSeekerId) => {
  try {
    const response = await apiClient.get(`/profiles/jobseeker/${jobSeekerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getEmployerProfile = async (employerId) => {
  try {
    const response = await apiClient.get(`/profiles/employer/${employerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateJobSeekerProfile = async (jobSeekerId, profileData) => {
  try {
    const response = await apiClient.put(
      `/profiles/jobseeker/${jobSeekerId}`,
      profileData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateEmployerProfile = async (employerId, profileData) => {
  try {
    const response = await apiClient.put(
      `/profiles/employer/${employerId}`,
      profileData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeSkill = async (jobSeekerId, skillId) => {
  try {
    const response = await apiClient.delete(
      `/profiles/jobseeker/${jobSeekerId}/skills/${skillId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateSkillLevel = async (jobSeekerId, skillId, level) => {
  try {
    const response = await apiClient.patch(
      `/profiles/jobseeker/${jobSeekerId}/skills/${skillId}`,
      { level }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addExperience = async (jobSeekerId, experienceData) => {
  try {
    const response = await apiClient.post(
      `/profiles/jobseeker/${jobSeekerId}/experience`,
      experienceData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeExperience = async (jobSeekerId, experienceId) => {
  try {
    const response = await apiClient.delete(
      `/profiles/jobseeker/${jobSeekerId}/experience/${experienceId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateExperience = async (jobSeekerId, experienceId, updateData) => {
  try {
    const response = await apiClient.put(
      `/profiles/jobseeker/${jobSeekerId}/experience/${experienceId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addEducation = async (jobSeekerId, educationData) => {
  try {
    const response = await apiClient.post(
      `/profiles/jobseeker/${jobSeekerId}/education`,
      educationData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeEducation = async (jobSeekerId, educationId) => {
  try {
    const response = await apiClient.delete(
      `/profiles/jobseeker/${jobSeekerId}/education/${educationId}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateEducation = async (jobSeekerId, educationId, updateData) => {
  try {
    const response = await apiClient.put(
      `/profiles/jobseeker/${jobSeekerId}/education/${educationId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const uploadProfilePicture = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiClient.post(
      `/profiles/${userId}/avatar`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};