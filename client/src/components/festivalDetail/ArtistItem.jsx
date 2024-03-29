import { useEffect } from 'react';
import useSetListStore from '@store/setListStore';

import select from '@assets/select.png';

const ArtistItem = ({ artist }) => {
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
    currSong,
    setCurrSong,
    currSongList,
    setCurrSongList,
    currSinger,
    setCurrSinger,
  } = useSetListStore();

  useEffect(() => {
    if (lineupList.length === selectedLineupList.length) {
      setAllSelected(true);
    } else {
      setAllSelected(false);
    }
  }, [selectedLineupList]);

  // 요소 하나 선택
  const isSelected = selectedLineupList.includes(artist);

  const toggleSelect = () => {
    if (!isSelected) {
      setSelectedLineupList([...selectedLineupList, artist]); // 선택된 아티스트 목록에 추가
      const additionalCurrSongList = [];
      songInfoMap[artist.id].forEach((song) => additionalCurrSongList.push(song));
      setCurrSongList([...currSongList, ...additionalCurrSongList]);
    } else {
      setSelectedLineupList(selectedLineupList.filter((item) => item !== artist)); // 선택된 아티스트 목록에서 제거
      setCurrSongList(currSongList.filter((song) => !songInfoMap[artist.id].includes(song)));
    }
  };

  return (
    <li className='flex-col p-2'>
      <div className='relative mb-2' onClick={toggleSelect}>
        {isSelected && <img className='absolute w-12 rounded-full ' src={select} alt='' />}
        <img className='w-12 rounded-full' src={artist.pictureUrl} alt='' />
      </div>
      <div className='w-12 text-xs truncate'>{artist.name}</div>
    </li>
  );
};

export default ArtistItem;
