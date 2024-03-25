import React from 'react';
import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import play_btn from '../../assets/play_btn.png';
import pause_btn from '../../assets/pause_btn.png';
import previous_btn from '../../assets/previous_btn.png';
import next_btn from '../../assets/next_btn.png';

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
        <button onClick={onClickPlayButton} className='w-12'>
          {playing ? <img src={pause_btn} /> : <img src={play_btn} />}
        </button>
      </>
    );
  };

  // 다음 곡 재생 버튼
  const NextButton = () => {
    const onClickNextButton = () => {};

    return (
      <>
        <button className='w-8'>
          <img src={next_btn} />
        </button>
      </>
    );
  };

  // 이전 곡 재생 버튼
  const PrevButton = () => {
    const onClickPrevButton = () => {};

    return (
      <>
        <button className='w-8'>
          <img src={previous_btn} />
        </button>
      </>
    );
  };

  return (
    <>
      <div>
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
      <div>
        <PrevButton />
        <PlayButton />
        <NextButton />
      </div>
    </>
  );
};

export default SetListPlayer;
