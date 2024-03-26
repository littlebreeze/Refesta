import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoCompleteItem = ({
  name,
  keyword,
  setKeyword,
  setIsAutoCompleteOpen,
}) => {
  const selectedKeyword = useRef();
  const nav = useNavigate();
  4;
  const onClickKeyword = () => {
    setKeyword(selectedKeyword.current.getAttribute('data-keyword'));
    setIsAutoCompleteOpen(false);
    // 검색 결과 요청
    nav('/search/result');
  };
  return (
    <div
      title={name}
      data-keyword={name}
      ref={selectedKeyword}
      onClick={onClickKeyword}
    >
      {name.includes(keyword) ? (
        <>
          {name.split(keyword)[0]}
          <span className='font-semibold text-ourPink'>
            {keyword}
          </span>
          {name.split(keyword)[1]}
        </>
      ) : (
        name
      )}
    </div>
  );
};
export default AutoCompleteItem;
