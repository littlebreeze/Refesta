import { create } from 'zustand';

import instance from '@util/token_interceptor';

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjpbIlJPTEVfQURNSU4iXSwiYXVkIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwic3ViIjoiMTA3OTQ4MDU4MzM1NzA4NjY1MjYwIiwiaXNzIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwiaWF0IjoxNzExMDA0MzM2LCJleHAiOjE3MTI4MDQzMzZ9.vZzSd4v5rA1pGDeWNpkFt5HpMzYzAdFZUJIHKKwIl80KaI6rheI1fXiaQIQV9RGvDDdy-snwVOSmmZ2a0CAoUA';
const accessToken = `Bearer ${token}`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: accessToken,
};
const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}`;

const useArtistStore = create((set) => ({
  // 아티스트 상세 가져오기
  artist: {},
  addArtist: async (artistId) => {
    try {
      const res = await instance.get(`${baseURL}/artists/${artistId}`);
      set(() => ({
        artist: res.data.data,
      }));
    } catch (e) {
      console.log(e);
    }
  },
  // 아티스트 좋아요 버튼
  toggleLike: () =>
    set((state) => ({
      artist: {
        ...state.artist,
        liked: !state.artist.liked,
      },
    })),
  // 아티스트 좋아요 버튼
  updateLike: async (artistId) => {
    try {
      const res = await instance.patch(`${baseURL}/artists/${artistId}`);
    } catch (e) {
      console.log('아티스트 좋아요 실패', e);
    }
  },
}));

export default useArtistStore;
