import axios
 from "axios";
export const submitApplication = async (jobId, applicationData) => {
  try {
    const response = await axios.post(`/applications/job/${jobId}`, applicationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getMyApplications = async (applicantId, filters = {}) => {
  try {
    const response = await axios.get(`/applications/applicant/${applicantId}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const getJobApplications = async (jobId, filters = {}) => {
  try {
    const response = await axios.get(`/applications/job/${jobId}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const getApplicationById = async (applicationId) => {
  try {
    const response = await axios.get(`/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};