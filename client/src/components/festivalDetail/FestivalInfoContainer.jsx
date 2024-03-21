import React, { useState } from 'react';
import SetListWrapper from './SetListWrapper';
import ReviewWrapper from './ReviewWrapper';

const FestivalInfoContainer = () => {
  const [openInfoTab, setOpenInfoTab] = useState(1);

  return (
    <div className=''>
      <ul className='flex h-[40px]'>
        {/* 1번 탭 */}
        <li className='w-1/2 text-center '>
          <button
            className={'w-full h-full text-xs px-2 py-2'}
            onClick={() => {
              setOpenInfoTab(1);
            }}
          >
            <span className={openInfoTab === 1 ? 'text-ourIndigo' : 'text-gray-400'}>셋리스트</span>
          </button>
        </li>
        {/* 2번 탭 */}
        <li className='w-1/2 text-center'>
          <button
            className={'w-full h-full text-xs px-5 py-2'}
            onClick={() => {
              setOpenInfoTab(2);
            }}
          >
            <span className={openInfoTab === 2 ? 'text-ourIndigo' : 'text-gray-400'}>후기 게시판</span>
          </button>
        </li>
      </ul>
      <div className='flex flex-col min-w-0 text-3xl text-center break-words border-4 border-gray-500 h-[600px]'>
        <div className='flex-auto'>
          <div className='tab-content tab-space'>
            <div className={openInfoTab === 1 ? 'block' : 'hidden'} id='link1'>
              1번 컴포넌트(셋리스트)
              <SetListWrapper />
            </div>
            <div className={openInfoTab === 2 ? 'block' : 'hidden'} id='link2'>
              2번 컴포넌트(후기)
              <ReviewWrapper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FestivalInfoContainer;
