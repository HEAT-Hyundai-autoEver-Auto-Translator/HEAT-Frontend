import { useQuery } from 'react-query';
import { getData } from '../api';

export const getLanguageList = () => {
  const data = useQuery('getLanguageList', () => getData('/language'));
  return data;
};
