import React from 'react';

const ArtistSearchItem = ({ artist }) => {
  return (
    <div className='flex mx-1 my-4'>
      <div className='w-20'>
        <img className='rounded-full aspect-square' src={artist.pictureUrl} alt={artist.name} />
      </div>
      <div className='mt-5 ml-3'>
        <div className='text-sm text-center '>{artist.name}</div>
        <div className='mt-1 text-xs text-gray-400'>장르</div>
      </div>
    </div>
  );
};
export default ArtistSearchItem;
