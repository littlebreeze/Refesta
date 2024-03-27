import { create } from 'zustand';

const useSearchStore = create((set) => ({
  searchKeyword: '',
  changeSearchKeyword: (keyword) => set((state) => ({ searchKeyword: keyword })),
  autoCompleteList: {
    artistWordList: [],
    festivalWordList: [],
  },
  setAutoCompleteList: (list) => set((state) => ({ autoCompleteList: list })),
}));

export default useSearchStore;
