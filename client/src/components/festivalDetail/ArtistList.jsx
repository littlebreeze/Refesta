import React, { useState, useEffect } from 'react';
import useSetListStore from '../../store/setListStore';
import all_album from '../../assets/all_album.jpg';
import select from '../../assets/select.png';
import ArtistItem from './ArtistItem';

const ArtistList = () => {
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

  // 라인업 전체 버튼을 관리하는 함수
  const toggleAllSelect = () => {
    // 라인업이 전체 선택되어 있을 때 전체 버튼을 누를 경우
    if (isAllSelected) {
      //  선택된 라인업 전체를 초기화
      setSelectedLineupList([]);
    }
    // 라인업이 일부만 선택되어 있을 때 전체 버튼을 누를 경우
    else {
      // 선택된 라인업을 전체 라인업으로 변경
      setSelectedLineupList([...lineupList]);
    }
    // 버튼 토글
    setAllSelected(!isAllSelected);
  };

  useEffect(() => {
    // lineupList와 selectedLineupList의 길이가 동일한 경우 isAllSelected를 true로 설정
    if (lineupList.length === selectedLineupList.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedLineupList, lineupList, setAllSelected]);

  return (
    <div>
      <ul className='flex p-4 overflow-x-auto text-white scrollbar-hide'>
        {/* 전체 가수 */}
        <li className='flex-col p-2'>
          <div onClick={toggleAllSelect} className='relative mb-2'>
            {isAllSelected && <img className='absolute w-12 rounded-full ' src={select} alt='' />}
            <img className='w-12 rounded-full' src={all_album} alt='' />
          </div>
          <div className='w-12 text-xs truncate'>전체</div>
        </li>
        {/* 개별 가수 */}
        {lineupList.map((artist) => (
          <ArtistItem key={artist.id} artist={artist} isSelected={selectedLineupList.includes(artist)} />
        ))}
      </ul>
    </div>
  );
};

export default ArtistList;
