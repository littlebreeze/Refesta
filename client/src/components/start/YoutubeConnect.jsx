import yLogo from '../../assets/youtube_music_logo.png';
const YoutubeConnect = ({ setStep, stepParam }) => {
  const onClickConnect = () => {
    alert('연동을 진행합니다');
  };
  const onClickSkip = () => {
    setStep(stepParam.step3);
  };

  return (
    <div className='grid gap-y-5'>
      <div className='mb-5 text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>
        빠르게 시작하기
      </div>
      <img src={yLogo} />
      <div className='mb-20 text-sm text-center'>
        유튜브 재생 목록을 연동하고 <br />
        Refesta를 빠르게 시작해보세요. <br />
        취향에 맞는 페스티벌을 추천해드립니다.
      </div>
      <button
        className='flex items-center justify-center w-full font-semibold text-white rounded-md bg-ourIndigo h-14'
        onClick={onClickConnect}
      >
        연동하기
      </button>
      <div
        className='text-center underline cursor-pointer'
        onClick={onClickSkip}
      >
        건너뛰기
      </div>
    </div>
  );
};
export default YoutubeConnect;
