import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL

// إنشاء instance من axios مع إعدادات افتراضية
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة Interceptor لإرسال التوكن في كل request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// التعامل مع الـ Response Errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // إذا انتهت صلاحية التوكن، قم بحذفه وإعادة التوجيه للـ Login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
