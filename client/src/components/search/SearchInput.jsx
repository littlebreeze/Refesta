import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useSearchStore from '../../store/searchStore';

import backspace from '../../assets/backspace.png';
import x_btn from '../../assets/x_btn.png';

const SearchInput = () => {
  const { searchKeyword, changeSearchKeyword } = useSearchStore();

  const nav = useNavigate();
  const inputDiv = useRef();

  const onFocusInput = () => {
    nav('/search');
  };

  const onChangeInput = (e) => {
    changeSearchKeyword(e.target.value);
  };

  const onClickXBtn = () => {
    changeSearchKeyword('');
  };

  useEffect(() => {
    inputDiv.current.focus();
    return changeSearchKeyword('');
  }, []);

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
            value={searchKeyword}
            ref={inputDiv}
            onFocus={onFocusInput}
            onChange={onChangeInput}
            placeholder='검색어를 입력하세요'
            className='bg-[#102B6A] w-full h-full rounded-full text-white pl-5 pr-8 focus:outline-none'
          />
          <img className='absolute bottom-3 right-8' src={x_btn} onClick={onClickXBtn} />
        </div>
      </div>
    </header>
  );
};
export default SearchInput;
