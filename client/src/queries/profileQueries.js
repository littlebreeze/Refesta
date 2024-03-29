import instance from '@util/token_interceptor';
import { useQuery } from 'react-query';

const getUserProfile = async () => {
  const response = await instance.get('/members');

  return response;
};

export const useProfileQuery = () => {
  return useQuery('getProfile', getUserProfile);
};

const postUserProfile = async (nickname, imgInfo) => {
  const formData = new FormData();
  formData.append('file', imgInfo.file);
  formData.append('nickname', nickname);

  const response = await instance.post('/members', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const useRegistProfileQuery = () => {
  return useQuery('postProfile', postUserProfile);
};
