import React from 'react';
import ArtistSearchItem from './ArtistSearchItem';

const ArtistSearchList = ({ artistListData, isTotal, setOpenSearchTab }) => {
  let renderArtistListData = artistListData;
  if (isTotal && renderArtistListData.length > 3) {
    renderArtistListData = artistListData.slice(0, 3);
  }
  console.log(artistListData);

  const onClickTotalBtn = () => {
    setOpenSearchTab(3);
  };

  return (
    <div>
      <div className='text-base font-bold text-left'>
        <span>아티스트 &nbsp;</span>
        <span className='text-lg font-bold text-ourPink'>{artistListData.length}</span>
        <span className='text-lg text-gray-400'>
          {isTotal && artistListData.length > 3 && <button onClick={onClickTotalBtn}>&nbsp; &gt;</button>}
        </span>
      </div>
      <div className=''>
        {renderArtistListData.map((item) => (
          <ArtistSearchItem key={item.id} artist={item} />
        ))}
      </div>
    </div>
  );
};
export default ArtistSearchList;
