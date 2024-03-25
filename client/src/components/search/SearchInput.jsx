import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import backspace from "../../assets/backspace.png";
import x_btn from "../../assets/x_btn.png";

import AutoComplete from "./AutoComplete";

const SearchInput = () => {
  // 검색어는 쿼리스트링으로도 받는 거 같아서 이렇게 해둠
  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("searchkeyword"));
  const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);

  const onChangeInput = (e) => {
    setKeyword(e.target.value);
    setIsAutoCompleteOpen(e.target.value);
  };
  const onClickXBtn = () => {
    setKeyword("");
    setIsAutoCompleteOpen(false);
  };

  return (
    <header className='h-[70px] py-4 bg-ourIndigo'>
      <div className='flex items-center h-full'>
        {/* 뒤로 가기 버튼 */}
        <div className='w-5 h-5 ml-5'>
          <Link to='/' className='cursor-pointer'>
            <img src={backspace} alt='Logo' />
          </Link>
        </div>
        {/* 검색 인풋 */}
        <div className='relative w-full h-full px-5'>
          <input
            type='text'
            value={keyword}
            onChange={onChangeInput}
            placeholder='검색어를 입력하세요'
            className='bg-[#102B6A] w-full h-full rounded-full text-white pl-5 pr-8 focus:outline-none'
          />
          <img className='absolute bottom-3 right-8' src={x_btn} onClick={onClickXBtn} />
        </div>
      </div>
      <AutoComplete
        isAutoCompleteOpen={isAutoCompleteOpen}
        keyword={keyword}
        setKeyword={setKeyword}
        setIsAutoCompleteOpen={setIsAutoCompleteOpen}
      />
    </header>
  );
};
export default SearchInput;
