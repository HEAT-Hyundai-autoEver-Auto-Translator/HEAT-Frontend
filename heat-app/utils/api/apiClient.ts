import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import eventBus from 'utils/eventBus';

export const BACK_END_URL = process.env.NEXT_PUBLIC_BACK_END_URL;

const headers = {
  // 기본 헤더 설정 (옵션)
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const apiClient = axios.create({
  baseURL: BACK_END_URL,
  withCredentials: true,
  headers: headers,
});

// 서버와 클라이언트 모두에서 사용할 수 있는 useCookies 훅을 가져옵니다.

// Request interceptor
apiClient.interceptors.request.use(config => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = 'Bearer ' + accessToken;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // 쿠키가 있는 경우, 새로운 access token과 refresh token을 요청합.
        const refreshToken = getCookie('refreshToken');
        const res = await axios.post(
          BACK_END_URL + '/user/refresh-token',
          {
            refreshToken,
          },
          { withCredentials: true },
        );

        // 응답으로 받은 새로운 accessToken과 refreshToken을 쿠키에 저장함.
        setCookie('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);

        // 새로운 accessToken을 이용해 원래의 요청을다시 수행.
        originalRequest.headers['Authorization'] =
          'Bearer ' + res.data.accessToken;
        return apiClient(originalRequest);
      } catch (err) {
        // Refresh token이 만료되었거나, 서버에서 refreshToken을 확인할 수 없는 경우, 로그아웃하거나 에러 페이지로 리다이렉트 하도록 emit
        console.error('Refresh token is invalid. Please log in again.', err);
        eventBus.emit('logout');
      }
    }
    // 다른 에러의 경우 axios로 에러를 전달.
    return Promise.reject(error);
  },
);

export default apiClient;

/*
interceptor로 구현한 인증 방식에 대한 설명
-------------------------------------------
사용자가 처음 로그인하면 서버는 HTTP 응답의 Set-Cookie 헤더를 사용하여 accessToken과 refreshToken을 브라우저에 전달
브라우저는 이 쿠키를 자동으로 저장하고, 이후 서버에 요청을 보낼 때마다 쿠키를 자동으로 첨부 (withCredentials: true 설정 덕분).
accessToken이 만료될 경우, axios의 response 인터셉터는 401 응답을 감지하고 /refresh_token 엔드포인트를 호출하여 새로운 토큰을 요청. 
이 요청에도 쿠키가 자동으로 첨부, 이 쿠키에는 refreshToken이 포함됨.
서버는 refreshToken을 검증하고, 유효하다면 새로운 accessToken과 refreshToken을 Set-Cookie 헤더를 사용하여 응답에 포함시킴.
브라우저는 이 쿠키를 자동으로 저장하고, 다음 요청부터는 새로운 토큰을 사용하여 인증.
*/
