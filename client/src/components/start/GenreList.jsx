import { useNavigate } from 'react-router';

const GenreList = ({ setStep, stepParam }) => {
  const nav = useNavigate();

  const onClickStart = () => {
    alert('서비스를 시작합니다');
    // 선택 데이터 백으로 보내주기
    nav('/', { replace: true });
  };
  const onClickSkip = () => {
    nav('/', { replace: true });
  };
  return (
    <div>
      <button onClick={onClickStart}>시작하기</button>
      <div className='cursor-pointer' onClick={onClickSkip}>
        건너뛰기
      </div>
    </div>
  );
};
export default GenreList;
