import React from 'react';

const FestivalSearchItem = ({ festival }) => {
  return (
    <div className='w-[29%] mx-1 my-4'>
      <div className=''>
        <img className='rounded-md aspect-square' src={festival.posterUrl} alt={festival.name} />
      </div>
      <div className='mt-2 text-sm text-center'>{festival.name}</div>
    </div>
  );
};
export default FestivalSearchItem;
