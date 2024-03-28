import React from 'react';
import ArtistSearchList from './ArtistSearchList';

// 통합검색 결과
const ArtistSearchWrapper = () => {
  return (
    <>
      <div className='flex flex-col'>
        <ArtistSearchList />
      </div>
    </>
  );
};
export default ArtistSearchWrapper;
