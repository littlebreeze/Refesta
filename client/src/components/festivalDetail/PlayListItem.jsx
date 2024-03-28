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
    playing,
    setPlaying,
    currSong,
    setCurrSong,
    currSongList,
    setCurrSongList,
    currSinger,
    setCurrSinger,
  } = useSetListStore();

  // 노래 선택 핸들러
  const handleSongSelect = () => {
    setCurrSong(song);
  };

  return (
    <div
      className={`border-b border-y-gray-400 ${currSong === song ? 'bg-gray-200 transform scale-103' : ''}`} // 조건부 스타일링 적용
      onClick={handleSongSelect}
    >
      <li className='flex items-center py-2 ml-4'>
        <div>
          <img className={`w-12 rounded-md min-w-12`} src={song.imageUrl} alt='' />
        </div>
        <div>
          <div className='w-56 ml-2 overflow-hidden text-sm text-left whitespace-nowrap text-ellipsis'>
            {song.title}
          </div>
          <div className='mt-1 ml-2 text-xs text-left text-gray-400'>{artistName}</div>
        </div>
      </li>
    </div>
  );
};

export default PlayListItem;
