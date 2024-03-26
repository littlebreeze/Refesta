import { create } from 'zustand';

const useSearchStore = create((set) => ({
  searchKeyword: '',
  changeSearchKeyword: (keyword) => set((state) => ({ searchKeyword: keyword })),
}));

export default useSearchStore;
