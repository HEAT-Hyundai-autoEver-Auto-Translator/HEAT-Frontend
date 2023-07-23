/**
 * @description 주어진 Date 객체를 "YYYY-MM-DD HH:mm:ss" 형식의 문자열로 변환합니다. -> 데스크탑에 이용
 * @param dateObj 포맷팅할 Date 객체
 * @returns 포맷팅된 날짜 및 시간 문자열
 */
export const formatDateTime = (dateObj: Date) => {
  let date = new Date(dateObj);
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);
  let hours = ('0' + date.getHours()).slice(-2);
  let minutes = ('0' + date.getMinutes()).slice(-2);
  let seconds = ('0' + date.getSeconds()).slice(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * @description 주어진 Date 객체를 "YYYY-MM-DD" 형식의 문자열로 변환합니다. -> 모바일에 이용
 * @param dateObj 포맷팅할 Date 객체
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (dateObj: Date) => {
  let date = new Date(dateObj);
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
