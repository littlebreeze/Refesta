import React from 'react';
import axios from 'axios';
import FestivalSearchList from './FestivalSearchList';
import ArtistSearchList from './ArtistSearchList';

// 통합검색 결과
const SearchResultWrapper = ({ festivalListData, artistSearchList }) => {
  return (
    <>
      <div>SearchResultWrapper</div>
      <FestivalSearchList festivalListData={festivalListData} />
      <ArtistSearchList artistSearchList={artistSearchList} />
    </>
  );
};
export default SearchResultWrapper;
