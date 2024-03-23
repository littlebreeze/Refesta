import React from 'react';
import ArtistSearchList from './ArtistSearchList';

// 통합검색 결과
const ArtistSearchWrapper = ({ artistListData }) => {
  return (
    <>
      <div className='flex flex-col'>
        <ArtistSearchList artistListData={artistListData} />
      </div>
    </>
  );
};
export default ArtistSearchWrapper;
