import { create } from 'zustand';
import { useNavigate } from 'react-router-dom';

import instance from '@util/token_interceptor';

const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}`;

const nav = useNavigate;

// approval_url => reservation/result
const useKakaoStore = create((set) => ({
  kakaoPay: async (festivalId, count) => {
    try {
      const res = await instance.post(`${baseURL}/reservations`, {
        festivalId: festivalId,
        count: count,
      });
      console.log(res);
      return res.data.data.redirect_url;
    } catch (e) {
      console.log(e);
    }
  },
  billingResult: {},
  getBillingResult: async (reservationId) => {
    try {
      const res = await instance.get(`${baseURL}/reservations/${reservationId}`);
      set((state) => ({
        billingResult: res.data.data,
      }));
    } catch (e) {
      nav('/Notfound');
      console.log(e);
    }
  },
  approvePayment: async (pgToken) => {
    try {
      const res = await instance.post(`${baseURL}/reservations/success`, pgToken);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
}));

export default useKakaoStore;
