import React from 'react';
import FestivalSearchItem from './FestivalSearchItem';

const FestivalSearchList = ({ festivalListData, isTotal, setOpenSearchTab }) => {
  let renderFestivalListData = festivalListData;
  if (isTotal && renderFestivalListData.length > 6) {
    renderFestivalListData = festivalListData.slice(0, 6);
  }

  const onClickTotalBtn = () => {
    setOpenSearchTab(2);
  };

  return (
    <div className='mb-8'>
      <div className='text-base font-bold text-left'>
        <span>페스티벌 &nbsp;</span>
        <span className='text-lg font-bold text-ourPink'>{festivalListData.length}</span>
        <span className='text-lg text-gray-400'>
          {isTotal && festivalListData.length > 6 && <button onClick={onClickTotalBtn}>&nbsp; &gt;</button>}
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
