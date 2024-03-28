import React from 'react';
import FestivalSearchItem from './FestivalSearchItem';
import useSearchResultStore from '../../store/searchResultStore';

const FestivalSearchList = ({ isTotal, setOpenSearchTab }) => {
  const { festivalList, artistList, setFestivalList, setArtistList } = useSearchResultStore();

  let renderFestivalListData = festivalList;
  if (isTotal && renderFestivalListData.length > 6) {
    renderFestivalListData = festivalList.slice(0, 6);
  }

  const onClickTotalBtn = () => {
    setOpenSearchTab(2);
  };

  console.log(festivalList);

  return (
    <div className='mb-8'>
      <div className='text-base font-bold text-left'>
        <span>페스티벌 &nbsp;</span>
        <span className='text-lg font-bold text-ourPink'>{festivalList.length}</span>
        <span className='text-lg text-gray-400'>
          {isTotal && festivalList.length > 6 && <button onClick={onClickTotalBtn}>&nbsp; &gt;</button>}
        </span>
      </div>
      <div className='flex flex-wrap justify-between'>
        {renderFestivalListData.map((item) => (
          <FestivalSearchItem key={item.id} festival={item} />
        ))}
      </div>
    </div>
  );
};
export default FestivalSearchList;
