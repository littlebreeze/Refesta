import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchStore from '@store/searchStore';

import instance from '@util/token_interceptor';

const AutoCompleteItem = ({ name, classification }) => {
  const { searchKeyword, changeSearchKeyword } = useSearchStore();

  const selectedKeyword = useRef();
  const nav = useNavigate();

  const parts = name.name.split(new RegExp(`(${searchKeyword})`, 'gi'));

  const onClickKeyword = () => {
    changeSearchKeyword(selectedKeyword.current.getAttribute('data-keyword'));
    // 검색 결과 요청
    const response = instance.patch(`recommendations/${classification}/${name.id}?point=5`);
    nav(`/search/result?word=${selectedKeyword.current.getAttribute('data-keyword')}`);
  };

  return (
    <div title={name.name} data-keyword={name.name} ref={selectedKeyword} onClick={onClickKeyword}>
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
