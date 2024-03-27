import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useSearchStore from '../../store/searchStore';

const AutoCompleteItem = ({ name }) => {
  const { searchKeyword, changeSearchKeyword } = useSearchStore();

  const selectedKeyword = useRef();
  const nav = useNavigate();

  const parts = name.split(new RegExp(`(${searchKeyword})`, 'gi'));

  const onClickKeyword = () => {
    console.log('push push');
    changeSearchKeyword(selectedKeyword.current.getAttribute('data-keyword'));
    // 검색 결과 요청
    nav(`/search/result?word=${searchKeyword}`);
  };

  return (
    <div title={name} data-keyword={name} ref={selectedKeyword} onClick={onClickKeyword}>
      {parts.map((part, index) =>
        part.toLowerCase() === searchKeyword.toLowerCase() ? (
          <span className='font-semibold text-ourPink' key={index}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </div>
  );
};
export default AutoCompleteItem;
