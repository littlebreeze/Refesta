import { Link } from 'react-router-dom';

import backspace from '../../assets/backspace.png';
import x_btn from '../../assets/x_btn.png';
import { useState } from 'react';

const SearchInput = () => {
  const [keyword, setKeyword] = useState('');

  const onChangeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <header className='py-4 bg-ourIndigo'>
      <div className='flex items-center'>
        {/* 뒤로 가기 버튼 */}
        <div className='w-5 h-5 ml-5'>
          <Link to='/' className='cursor-pointer'>
            <img src={backspace} alt='Logo' />
          </Link>
        </div>
        {/* 검색 인풋 */}
        <div className='relative w-full px-5'>
          <input
            type='text'
            value={keyword}
            onChange={onChangeKeyword}
            placeholder='검색어를 입력하세요'
            className='bg-[#102B6A] w-full rounded-full text-white pl-5 pr-8'
          />
          <img className='absolute bottom-1 right-8' src={x_btn} />
        </div>
      </div>
    </header>
  );
};
export default SearchInput;
