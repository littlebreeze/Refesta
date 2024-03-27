import React, { useEffect } from 'react';
import FestivalSearchList from './FestivalSearchList';

// 통합검색 결과
const FestivalSearchWrapper = ({ festivalListData }) => {
  return (
    <>
      <div className='flex flex-col'>
        <FestivalSearchList festivalListData={festivalListData} />
      </div>
    </>
  );
};
export default FestivalSearchWrapper;
