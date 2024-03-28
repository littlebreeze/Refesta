import React from 'react';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import play_btn from '../../assets/play_btn.png';
import pause_btn from '../../assets/pause_btn.png';
import default_album_poster from '../../assets/default_album_poster.jpg';
import previous_btn from '../../assets/previous_btn.png';
import next_btn from '../../assets/next_btn.png';
import useSetListStore from '../../store/setListStore';

const SetListPlayer = () => {
  // const [curr, setCurr] = useState([
  //   'https://www.youtube.com/watch?v=BedeHi2HkFs',
  //   'https://www.youtube.com/watch?v=iYu76OnDLhk',
  //   'https://www.youtube.com/watch?v=xFzSUBzhbE4',
  // ]);
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

  console.log('!!!!!!!!', currSong);

  // 재생&일시정지
  const onClickPlayButton = () => {
    setPlaying(!playing);
  };

  // 이전 곡 재생
  const onClickPrevButton = () => {
    console.log('이전 곡 재생');
  };

  // 다음 곡 재생
  const onClickNextButton = () => {
    console.log('다음 곡 재생');
  };

  return (
    <div className='flex justify-between mx-4 bg-white rounded-md'>
      <div className='flex m-2'>
        <div>
          <img className='w-12 rounded-md min-w-12' src={currSong.imageUrl || default_album_poster} alt='' />
        </div>
        <div className='ml-3'>
          <div className='text-left'>
            <div className='truncate max-w-28'>{currSong.title || '노래 선택'}</div>
            <div className='text-xs text-gray-400 truncate max-w-28'>가수명</div>
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
