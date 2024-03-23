import React from 'react';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';

const SetListPlayer = () => {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [curr, setCurr] = useState([
    'https://www.youtube.com/watch?v=BedeHi2HkFs',
    'https://www.youtube.com/watch?v=iYu76OnDLhk',
    'https://www.youtube.com/watch?v=xFzSUBzhbE4',
  ]);

  // 재생 / 정지 버튼
  const PlayButton = () => {
    const onClickPlayButton = () => {
      setPlaying((prevPlaying) => !prevPlaying);
    };

    return (
      <>
        <button onClick={onClickPlayButton} className='bg-red-200'>
          {playing ? 'Pause' : 'Play'}
        </button>
      </>
    );
  };

  const NextButton = () => {
    const onClickNextButton = () => {};

    return (
      <>
        <button className='bg-blue-200'>이전</button>
      </>
    );
  };

  const PrevButton = () => {
    const onClickPrevButton = () => {};

    return (
      <>
        <button className='bg-gray-200'>이후</button>
      </>
    );
  };

  return (
    <>
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          width='350px' // 플레이어 크기 (가로)
          height='200px' // 플레이어 크기 (세로)
          url={curr}
          // muted={false}

          // width='1px' // 플레이어 크기 (가로)
          // height='1px' // 플레이어 크기 (세로)
          playing={playing} // 재생
          controls={false} // 유튜브 재생 컨트롤바 노출 여부
        />
      </div>
      <NextButton />
      <PlayButton />
      <PrevButton />
    </>
  );
};

export default SetListPlayer;
