import React, { useState } from 'react';
import SearchResultWrapper from './SearchResultWrapper';
import FestivalSearchWrapper from './FestivalSearchWrapper';
import ArtistSearchWrapper from './ArtistSearchWrapper';

const SearchResultContainer = () => {
  const [openSearchTab, setOpenSearchTab] = useState(1);

  return (
    <div className=''>
      <ul className='flex h-[40px]'>
        {/* 1번 탭 */}
        <li className='w-1/3 text-center '>
          <button
            className={'w-full h-full text-xs px-2 py-2'}
            onClick={() => {
              setOpenSearchTab(1);
            }}
            data-toggle='tab'
            href='#link1'
          >
            <span className={openSearchTab === 1 ? 'text-ourIndigo' : 'text-gray-400'}>1번 탭</span>
          </button>
        </li>
        {/* 2번 탭 */}
        <li className='w-1/3 text-center'>
          <button
            className={'w-full h-full text-xs px-5 py-2'}
            onClick={() => {
              setOpenSearchTab(2);
            }}
          >
            <span className={openSearchTab === 2 ? 'text-ourIndigo' : 'text-gray-400'}>2번 탭</span>
          </button>
        </li>
        {/* 3번 탭 */}
        <li className='w-1/3 text-center'>
          <button
            className={'w-full h-full px-5 py-2'}
            onClick={() => {
              setOpenSearchTab(3);
            }}
          >
            <span className={openSearchTab === 3 ? 'text-ourIndigo' : 'text-gray-400'}>3번 탭</span>
          </button>
        </li>
      </ul>
      <div className='relative flex flex-col h-64 min-w-0 text-3xl text-center break-words border-4 border-gray-500'>
        <div className='flex-auto'>
          <div className='tab-content tab-space'>
            <div className={openSearchTab === 1 ? 'block' : 'hidden'} id='link1'>
              1번 컴포넌트(통합검색)
              <SearchResultWrapper />
            </div>
            <div className={openSearchTab === 2 ? 'block' : 'hidden'} id='link2'>
              2번 컴포넌트(페스티벌상세)
              <FestivalSearchWrapper />
            </div>
            <div className={openSearchTab === 3 ? 'block' : 'hidden'} id='link3'>
              3번 컴포넌트(아티스트상세)
              <ArtistSearchWrapper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultContainer;
