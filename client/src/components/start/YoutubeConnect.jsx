const YoutubeConnect = ({ setStep }) => {
  const onClickConnect = () => {
    alert('연동을 진행합니다');
  };
  const onClickSkip = () => {
    setStep('GENRE');
  };

  return (
    <div>
      <button onClick={onClickConnect}>연동하기</button>
      <div className='cursor-pointer' onClick={onClickSkip}>
        건너뛰기
      </div>
    </div>
  );
};
export default YoutubeConnect;
