import { useState, useEffect } from 'react';
import useSetListStore from '@store/setListStore';
import ReactPlayer from 'react-player';

import play_btn from '@assets/play_btn.png';
import pause_btn from '@assets/pause_btn.png';
import previous_btn from '@assets/previous_btn.png';
import next_btn from '@assets/next_btn.png';
import default_album_poster from '@assets/default_album_poster.jpg';

const SetListPlayer = () => {
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
  } = useSetListStore();
  const [currSongIndex, setCurrSongIndex] = useState(0);

  useEffect(() => {
    if (currSongList && currSongList.length > 0) {
      const index = currSongList.findIndex((song) => song === currSong);
      setCurrSongIndex(index >= 0 ? index : 0); // 현재 곡이 있는 경우 해당 인덱스로 설정
    }
  }, [currSongList, currSong]);

  // 재생&일시정지
  const onClickPlayButton = () => {
    setPlaying(!playing);
  };

  // 이전 곡 재생
  const onClickPrevButton = () => {
    let newIndex = currSongIndex - 1;
    if (newIndex < 0) {
      newIndex = currSongList.length - 1; // 범위를 벗어나면 맨 마지막 곡으로 이동
    }
    setCurrSongIndex(newIndex);
    setCurrSong(currSongList[newIndex]);
  };

  // 다음 곡 재생
  const onClickNextButton = () => {
    let newIndex = currSongIndex + 1;
    if (newIndex >= currSongList.length) {
      newIndex = 0; // 범위를 벗어나면 첫 번째 곡으로 이동
    }
    setCurrSongIndex(newIndex);
    setCurrSong(currSongList[newIndex]);
  };

  // useEffect(() => {
  //   // currSong이 변경될 때마다 currSong을 출력합니다.
  //   console.log('Curr Song Updated:', currSong);
  // }, [currSong]); // currSong이 변경될 때마다 이 효과가 실행됩니다.

  return (
    <div className='flex justify-between mx-4 bg-white rounded-md'>
      <div className='flex m-2'>
        <div>
          <img className='w-12 rounded-md min-w-12' src={currSong.imageUrl || default_album_poster} alt='' />
        </div>
        <div className='ml-3'>
          <div className='text-left'>
            <div className='truncate max-w-28'>{currSong.title}</div>
            <div className='text-xs text-gray-400 truncate max-w-28'>{currSong.singer}</div>
          </div>
        </div>
      </div>
      <div className='m-2'>
        <ReactPlayer
          className='react-player'
          width='0px' // 플레이어 크기 (가로)
          height='0px' // 플레이어 크기 (세로)
          url={currSong.audioUrl}
          playing={playing} // 재생
          controls={false} // 유튜브 재생 컨트롤바 노출 여부
        />
      </div>
      <div className='flex justify-between pr-2 my-auto mr- min-w-20'>
        {/* 이전 곡 재생 */}
        <button className='w-4' onClick={onClickPrevButton}>
          <img src={previous_btn} />
        </button>
        {/* 재생&일시정지 */}
        <button onClick={onClickPlayButton} className='w-6'>
          {playing ? <img src={pause_btn} /> : <img src={play_btn} />}
        </button>
        {/* 다음 곡 재생 */}
        <button className='w-4' onClick={onClickNextButton}>
          <img src={next_btn} />
        </button>
      </div>
    </div>
  );
};

export default SetListPlayer;
