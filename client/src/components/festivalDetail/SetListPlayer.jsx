import { useState, useEffect } from 'react';
import useSetListStore from '@store/setListStore';

import instance from '@util/token_interceptor';
import ReactPlayer from 'react-player';

import play_btn from '@assets/play_btn.png';
import pause_btn from '@assets/pause_btn.png';
import previous_btn from '@assets/previous_btn.png';
import next_btn from '@assets/next_btn.png';
import default_album_poster from '@assets/default_album_poster.jpg';

const SetListPlayer = () => {
  const { playing, setPlaying, currSong, setCurrSong, currSongList } = useSetListStore();
  const [currSongIndex, setCurrSongIndex] = useState(0);

  useEffect(() => {
    if (currSongList && currSongList.length > 0) {
      const index = currSongList.findIndex((song) => song === currSong);
      setCurrSongIndex(index >= 0 ? index : 0);
    }
    console.log('현재곡', currSong.title);
  }, [currSongList, currSong]);

  // 재생 & 일시정지
  const onClickPlayButton = () => {
    setPlaying(!playing);
    if (!playing) {
      console.log('현재곡', currSong.title);
    }
  };

  // 이전 곡 재생
  const onClickPrevButton = () => {
    if (currSongList.length > 1) {
      let newIndex = currSongIndex - 1;
      if (newIndex < 0) {
        newIndex = currSongList.length - 1; // 범위를 벗어나면 맨 마지막 곡으로 이동
      }
      setCurrSongIndex(newIndex);
      setCurrSong(currSongList[newIndex]);
    }
  };

  // 다음 곡 재생
  const onClickNextButton = () => {
    if (currSongList.length > 1) {
      let newIndex = currSongIndex + 1;
      if (newIndex >= currSongList.length) {
        newIndex = 0; // 범위를 벗어나면 첫 번째 곡으로 이동
      }
      setCurrSongIndex(newIndex);
      setCurrSong(currSongList[newIndex]);
    }
  };

  const updateSongPreference = async () => {
    try {
      const response = await instance.patch(`recommendations/songs/${currSong.id}`);
      // if (response.data.status === 'success') {
      //   console.log(response.data);
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          url={currSong.audioUrl} // 현재 재생 곡
          playing={playing} // 재생
          onProgress={(progress) => {
            if (parseInt(progress.playedSeconds) !== 0 && parseInt(progress.playedSeconds) % 30 === 0) {
              updateSongPreference(); // 선호도 증가
            }
          }}
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
