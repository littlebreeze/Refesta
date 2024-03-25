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
  // 페스티벌 후기 리스트
  reviewList: [],
  addReviews: async (festivalId) => {
    try {
      const res = await axios.get(`${baseURL}/festivals/${festivalId}/reviews`, {
        headers: headers,
        withCredentials: true,
      });
      set((state) => {
        const existingIds = new Set(state.reviewList.map((review) => review.id));
        const newReviews = res.data.data.filter((review) => !existingIds.has(review.id));
        return {
          reviewList: [...state.reviewList, ...newReviews],
        };
      });
    } catch (e) {
      console.log(e);
    }
  },
  // 후기 작성
  registerReview: async (newReview, onSuccess) => {
    try {
      const formData = new FormData();
      formData.append('file', newReview.file);
      formData.append('festivalId', newReview.festivalId);
      formData.append('contents', newReview.contents);

      const config = {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const res = await axios.post(`${baseURL}/reviews`, formData, config);
      console.log(res);
      if (onSuccess) onSuccess();
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  // 내가쓴 후기 리스트
  myReviewList: [],
  addMyReviews: async () => {
    try {
      const res = await axios.get(`${baseURL}/members/reviews`, {
        headers: headers,
        withCredentials: true,
      });
      console.log(res);
      set((state) => ({
        myReviewList: [...state.myReviewList, ...res.data.data.reviewList],
      }));
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useReviewStore;
