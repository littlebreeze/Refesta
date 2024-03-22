import React from 'react';

const FestivalSearchItem = ({ festival }) => {
  return (
    <div className='w-1/4 mb-4 mr-4'>
      <div>
        <img className='rounded-md aspect-square ' src={festival.posterUrl} alt={festival.name} />
        <div className='mt-2 text-sm '>{festival.name}</div>
      </div>
    </div>
  );
};
export default FestivalSearchItem;
