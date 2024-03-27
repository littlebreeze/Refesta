import { useEffect } from 'react';
import AutoComplete from '../components/search/AutoComplete';
import useSearchStore from '../store/searchStore';

const Search = () => {
  const { searchKeyword, changeSearchKeyword } = useSearchStore();

  // 입력된 키워드가 없으면 영역 없앰
  if (!searchKeyword) return null;

  return (
    <>
      <AutoComplete />
    </>
  );
};

export default Search;
