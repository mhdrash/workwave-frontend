import apiClient from './api';

async function requestWithFallback(requests) {
  let lastError;

  for (const request of requests) {
    try {
      return await request();
    } catch (error) {
      lastError = error;

      if (error.response?.status !== 404) {
        throw error.response?.data || error.message;
      }
    }
  }

  throw lastError.response?.data || lastError.message;
}

function getRequestError(error) {
  return {
    message:
      error.response?.data?.err ||
      error.response?.data?.message ||
      error.message ||
      "Request failed.",
    status: error.response?.status,
    url: error.config?.url,
  };
}

export const submitApplication = async (jobId, applicationData) => {
  try {
    const payload = {
      applicantId: applicationData.applicantId,
      jobId,
    };
    const response = await requestWithFallback([
      () => apiClient.post('/applications', payload),
      () => apiClient.post('/applications/apply', payload),
      () => apiClient.post(`/applications/${jobId}`, payload),
      () => apiClient.post(`/applications/job/${jobId}`, payload),
      () => apiClient.post('/application', payload),
      () => apiClient.post('/application/apply', payload),
      () => apiClient.post(`/application/${jobId}`, payload),
      () => apiClient.post(`/application/job/${jobId}`, payload),
    ]);

    return response.data;
  } catch (error) {
    throw getRequestError(error);
  }
};

export const getMyApplications = async (applicantId, filters = {}) => {
  try {
    const response = await requestWithFallback([
      () => apiClient.get(`/applications/applicant/${applicantId}`, {
        params: filters,
      }),
      () => apiClient.get('/applications', {
        params: { ...filters, applicantId },
      }),
      () => apiClient.get(`/application/applicant/${applicantId}`, {
        params: filters,
      }),
      () => apiClient.get('/application', {
        params: { ...filters, applicantId },
      }),
    ]);

    return response.data;
  } catch (error) {
    throw getRequestError(error);
  }
};


export const getJobApplications = async (jobId, filters = {}) => {
  try {
    const response = await apiClient.get(`/applications/job/${jobId}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const getApplicationById = async (applicationId) => {
  try {
    const response = await apiClient.get(`/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
