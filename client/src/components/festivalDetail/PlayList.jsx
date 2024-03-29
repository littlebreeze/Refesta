import { useEffect } from 'react';
import useSetListStore from '@store/setListStore';
import PlayListItem from '@components/festivalDetail/PlayListItem';

const PlayList = () => {
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

  // selectedLineupList가 변경될 때마다 해당하는 노래 정보를 가져와 selectedSongInfoMap에 저장
  useEffect(() => {
    const updatedSelectedSongInfoMap = selectedLineupList.map((artist) => {
      return songInfoMap[artist.id] || []; // 해당 아티스트의 노래가 없을 경우 빈 배열 반환
    });
    setSelectedSongInfoMap(updatedSelectedSongInfoMap);
  }, [selectedLineupList]);

  return (
    <div className='h-full m-4 bg-white'>
      {selectedSongInfoMap.length > 0 && (
        <div className='overflow-x-auto whitespace-nowrap'>
          {selectedSongInfoMap.map((songs, index) => (
            <div key={index} className='my-2'>
              <ul className=''>
                {songs.map((song, idx) => (
                  <PlayListItem key={idx} song={song} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayList;
