import axios from 'axios';
import { BACK_END_URL } from './apiClient';
import { getCookie, setCookie } from 'cookies-next';

//기본해더가 apllication/json이라서 formdata로 보내면 에러가 난다.
//그래서 기본해더를 multipart/form-data로 바꿔줘야한다.
//그리고 withCredentials를 true로 해줘야 쿠키가 전달된다.
const formClient = axios.create({
  baseURL: BACK_END_URL,
  withCredentials: true,
});

// Request interceptor
formClient.interceptors.request.use(config => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
});

// Response interceptor
formClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 쿠키가 있는 경우, 새로운 access token과 refresh token을 요청합.
        const refreshToken = getCookie('refreshToken');
        const res = await axios.post(
          BACK_END_URL + '/refresh-token',
          { refreshToken },
          { withCredentials: true },
        );

        // 응답으로 받은 새로운 accessToken과 refreshToken을 쿠키에 저장합니다.
        setCookie('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);

        // 새로운 accessToken을 이용해 원래의 요청을 다시 수행.
        originalRequest.headers['Authorization'] =
          'Bearer ' + res.data.accessToken;
        return formClient(originalRequest);
      } catch (err) {
        // Refresh token이 만료되었거나, 서버에서 refreshToken을 확인할 수 없는 경우, 로그아웃하거나 에러 페이지로 리다이렉트.
        console.error('Refresh token is invalid. Please log in again.', err);
      }
    }
    // 다른 에러의 경우 axios로 에러를 전달.
    return Promise.reject(error);
  },
);

export default formClient;
