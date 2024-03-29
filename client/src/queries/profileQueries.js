import instance from '@util/token_interceptor';
import { useQuery, useMutation } from 'react-query';

const getUserProfile = async () => {
  const response = await instance.get('/members');

  return response;
};

export const useProfileQuery = () => {
  return useQuery('getProfile', getUserProfile);
};

const postUserProfile = async (formData) => {
  const response = await instance.post('/members', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const usePostProfileQuery = () => {
  return useMutation('postProfile', postUserProfile);
};
