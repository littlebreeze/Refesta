import React from 'react';
import FestivalSearchList from './FestivalSearchList';
import ArtistSearchList from './ArtistSearchList';

// 통합검색 결과
const SearchResultWrapper = ({ festivalListData, artistListData, isTotal, openSearchTab, setOpenSearchTab }) => {
  return (
    <>
      <div className='flex flex-col'>
        <FestivalSearchList
          festivalListData={festivalListData}
          isTotal={isTotal}
          openSearchTab={openSearchTab}
          setOpenSearchTab={setOpenSearchTab}
        />
        <ArtistSearchList
          artistListData={artistListData}
          isTotal={isTotal}
          openSearchTab={openSearchTab}
          setOpenSearchTab={setOpenSearchTab}
        />
      </div>
    </>
  );
};
export default SearchResultWrapper;
