import { create } from 'zustand';
import instance from '../util/token_interceptor';

const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}`;

const useReviewStore = create((set) => ({
  // 페스티벌 후기 리스트
  reviewList: [],
  addReviews: async (festivalId) => {
    try {
      const res = await instance.get(`${baseURL}/festivals/${festivalId}/reviews`);
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

      const res = await instance.post(`${baseURL}/reviews`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
      const res = await instance.get(`${baseURL}/members/reviews`);
      set((state) => ({
        myReviewList: res.data.data.reviewList,
      }));
    } catch (e) {
      console.log(e);
    }
  },

  // 후기 삭제
  removeReview: async (id) => {
    try {
      const res = await instance.delete(`${baseURL}/reviews/${id}`);
      set((state) => ({
        ...state,
        myReviewList: state.myReviewList.filter((review) => review.reviewId !== id),
      }));
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useReviewStore;
