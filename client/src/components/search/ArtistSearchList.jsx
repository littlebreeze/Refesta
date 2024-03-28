import React from 'react';
import ArtistSearchItem from './ArtistSearchItem';
import useSearchResultStore from '../../store/searchResultStore';

const ArtistSearchList = ({ artistListData, isTotal, setOpenSearchTab }) => {
  const { festivalList, artistList, setFestivalList, setArtistList } = useSearchResultStore();

  let renderArtistList = artistList;
  if (isTotal && renderArtistList.length > 3) {
    renderArtistList = artistList.slice(0, 3);
  }

  const onClickTotalBtn = () => {
    setOpenSearchTab(3);
  };

  return (
    <div>
      <div className='text-base font-bold text-left'>
        <span>아티스트 &nbsp;</span>
        <span className='text-lg font-bold text-ourPink'>{artistList.length}</span>
        <span className='text-lg text-gray-400'>
          {isTotal && artistList.length > 3 && <button onClick={onClickTotalBtn}>&nbsp; &gt;</button>}
        </span>
      </div>
      {renderArtistList.length === 0 ? (
        <div className='p-4 mt-4 text-lg font-bold text-center'>아티스트 정보가 없습니다.</div>
      ) : (
        <div className=''>
          {renderArtistList.map((item) => (
            <ArtistSearchItem key={item.id} artist={item} />
          ))}
        </div>
      )}
    </div>
  );
};
export default ArtistSearchList;
