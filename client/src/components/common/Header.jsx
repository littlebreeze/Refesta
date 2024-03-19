import React from 'react';
import { Link } from 'react-router-dom';
import text_logo from '../../assets/text_logo.png';
import search from '../../assets/search.png';
import menu from '../../assets/menu.png';

const Header = () => {
  return (
    <header className='py-4 bg-white-800'>
      <div className='container flex items-center justify-between mx-auto'>
        {/* 검색 버튼 */}
        <div className='flex text-center'>
          <Link to='/search' className='cursor-pointer'>
            <img src={search} alt='Logo' className='w-5 h-5 ml-5' />
          </Link>
        </div>

        {/* 로고 */}
        <div className='flex items-center'>
          <Link to='/' className='cursor-pointer'>
            <img src={text_logo} alt='Logo' className='w-20 h-9' />
          </Link>
        </div>

        {/* 햄버거 버튼 */}
        <div className='flex items-center'>
          <img src={menu} alt='Logo' className='w-5 h-5 mr-5' />
        </div>
      </div>
    </header>
  );
};
export default Header;
