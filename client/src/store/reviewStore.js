import { create } from 'zustand';
import axios from 'axios';

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjpbIlJPTEVfQURNSU4iXSwiYXVkIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwic3ViIjoiMTA3OTQ4MDU4MzM1NzA4NjY1MjYwIiwiaXNzIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwiaWF0IjoxNzExMDA0MzM2LCJleHAiOjE3MTI4MDQzMzZ9.vZzSd4v5rA1pGDeWNpkFt5HpMzYzAdFZUJIHKKwIl80KaI6rheI1fXiaQIQV9RGvDDdy-snwVOSmmZ2a0CAoUA';
const accessToken = `Bearer ${token}`;
const headers = {
  'Content-Type': 'application/json',
  Authorization: accessToken,
};
const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}`;

const useReviewStore = create((set) => ({
  reviewList: [],
  addReviews: async (festivalId) => {
    try {
      const res = await axios.get(`${baseURL}/festivals/${festivalId}/reviews`, {
        headers: headers,
        withCredentials: true,
      });
      set((state) => ({
        reviewList: [...state.reviewList, ...res.data.data],
      }));
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useReviewStore;
