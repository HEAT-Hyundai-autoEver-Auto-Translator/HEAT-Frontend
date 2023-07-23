// utils/api.ts
// axios client를 이용한 api 요청 함수들을 정의한 템플릿 파일입니다.
import apiClient from './apiClient';

// POST
export const postDataWithBody = async (endpoint: string, body: any) => {
  const { data } = await apiClient.post(endpoint, body);
  return data;
};

// GET
export const getDataWithParams = async (endpoint: string, params: any) => {
  const { data } = await apiClient.get(endpoint, { params });
  return data;
};

// GET
export const getData = async (endpoint: string) => {
  const { data } = await apiClient.get(endpoint);
  return data;
};

// PUT
export const putDataWithBody = async (endpoint: string, body: any) => {
  const { data } = await apiClient.put(endpoint, body);
  return data;
};

export const putDataWithParams = async (endpoint: string, params: any) => {
  const { data } = await apiClient.put(endpoint, null, { params });
  return data;
};

// PATCH
export const patchDataWithBody = async (endpoint: string, body: any) => {
  const { data } = await apiClient.patch(endpoint, body);
  return data;
};

export const patchDataWithParams = async (endpoint: string, params: any) => {
  const { data } = await apiClient.patch(endpoint, null, { params });
  return data;
};

// DELETE
export const deleteDataWithBody = async (endpoint: string, body: any) => {
  const { data } = await apiClient.delete(endpoint, { data: body });
  return data;
};

export const deleteDataWithParams = async (endpoint: string, params: any) => {
  const { data } = await apiClient.delete(endpoint, { params });

  return data;
};
