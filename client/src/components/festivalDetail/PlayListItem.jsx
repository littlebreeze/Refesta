import React, { useState, useEffect } from 'react';
import useSetListStore from '../../store/setListStore';

const PlayListItem = ({ song, artistName }) => {
  const {
    lineupList,
    addLineupList,
    selectedLineupList,
    setSelectedLineupList,
    songInfoMap,
    addSongInfoMap,
    sortedSongInfoMap,
    sortSongInfoMapByLineupList,
    selectedSongInfoMap,
    setSelectedSongInfoMap,
    isAllSelected,
    setAllSelected,
  } = useSetListStore();

  return (
    <li className='flex items-center my-2'>
      <div>
        <img className='w-12 rounded-md min-w-12' src={song.imageUrl} alt='' />
      </div>
      <div>
        <div className='w-56 ml-2 overflow-hidden text-sm text-left whitespace-nowrap text-ellipsis'>{song.title}</div>
        <div className='mt-1 ml-2 text-xs text-left text-gray-400'>{artistName && artistName}</div>
      </div>
    </li>
  );
};

export default PlayListItem;
