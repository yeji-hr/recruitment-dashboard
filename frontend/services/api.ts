import axios from 'axios';
import { API_BASE_URL } from '@/utils/constants';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 필요시 토큰 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버 응답 에러
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없음
      console.error('No response from server');
    } else {
      // 요청 설정 중 에러
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

