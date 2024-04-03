import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

import instance from '@util/token_interceptor';

const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}`;

const nav = useNavigate;

// approval_url => reservation/result
const useKakaoStore = create((set) => ({
  kakaoPay: async (festivalId, count) => {
    try {
      const response = await instance.post(`${baseURL}/reservations`, {
        festivalId: festivalId,
        count: count,
      });
      return response.data.data.redirect_url;
    } catch (error) {
      console.log('예매 실패:', error);
    }
  },
  billingResult: {},
  getBillingResult: async (reservationId) => {
    try {
      const response = await instance.get(`${baseURL}/reservations/${reservationId}`);
      set((state) => ({
        billingResult: response.data.data,
      }));
    } catch (error) {
      nav('/Notfound');
      console.log('영수증 가져오기 실패:', error);
    }
  },
  approvePayment: async (pgToken) => {
    try {
      const response = await instance.post(`${baseURL}/reservations/success`, pgToken);
      return response.data;
    } catch (error) {
      console.log('결제 승인 실패:', error);
    }
  },
}));

export default useKakaoStore;
