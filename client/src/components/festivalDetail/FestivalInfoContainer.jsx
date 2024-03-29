import { useState } from 'react';
import SetListWrapper from '@components/festivalDetail/SetListWrapper';
import ReviewWrapper from '@components/festivalDetail/ReviewWrapper';

// 완료된 페스티벌 탭(셋리스트/후기게시판)
const FestivalInfoContainer = ({ id }) => {
  const [openInfoTab, setOpenInfoTab] = useState(1);

  return (
    <div className=''>
      <ul className='flex h-full mx-4 '>
        {/* 셋리스트 */}
        <li
          className={`w-1/2 text-center ${openInfoTab === 1 ? 'border-t-2 border-r-2 border-l-2 border-ourIndigo' : 'border-b-2 border-ourIndigo'}`}
        >
          <button
            className={'w-full h-full text-xs px-2 py-2'}
            onClick={() => {
              setOpenInfoTab(1);
            }}
          >
            <span className={`${openInfoTab === 1 ? 'text-ourIndigo font-bold' : 'text-gray-400 font-bold'}`}>
              셋리스트
            </span>
          </button>
        </li>
        {/* 후기게시판 */}
        <li
          className={`w-1/2 text-center ${openInfoTab === 2 ? 'border-t-2 border-r-2 border-l-2 border-ourIndigo' : 'border-b-2 border-ourIndigo'}`}
        >
          <button
            className={'w-full h-full text-xs px-5 py-2'}
            onClick={() => {
              setOpenInfoTab(2);
            }}
          >
            <span className={`${openInfoTab === 2 ? 'text-ourIndigo font-bold' : 'text-gray-400 font-bold'}`}>
              후기리스트
            </span>
          </button>
        </li>
      </ul>
      <div className='flex flex-col h-full min-w-0 mx-4 mt-4 text-center break-words'>
        <div className='flex-auto'>
          <div className={openInfoTab === 1 ? 'block' : 'hidden'}>
            <SetListWrapper />
          </div>
          <div className={openInfoTab === 2 ? 'block' : 'hidden'}>
            <ReviewWrapper />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FestivalInfoContainer;
