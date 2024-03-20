import { useNavigate } from 'react-router';
import GenreItem from './GenreItem';

const lists = [
  { id: 1, title: '랩/힙합', image: 'rap_hiphop', color: '727272' },
  { id: 2, title: '인디음악', image: 'indie', color: 'f3ab1f' },
  { id: 3, title: '록/메탈', image: 'rock_metal', color: '061E58' },
  {
    id: 4,
    title: '일렉트로니카',
    image: 'electronica',
    color: '0EDC9E',
  },
  { id: 5, title: '재즈', image: 'jazz', color: 'F6648B' },
  { id: 6, title: 'R&B/Soul', image: 'rb_soul', color: 'CD00EE' },
  { id: 7, title: '발라드', image: 'balad', color: '6BEE2E' },
  { id: 8, title: '댄스', image: 'dance', color: 'FF4E36' },
  {
    id: 9,
    title: '포크블루스',
    image: 'forks_blues',
    color: 'DD7022',
  },
];

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
    <div className='grid gap-y-5'>
      <div>
        <div className='text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>
          선호 장르 선택하기
        </div>
        <div className='mb-5 text-sm text-center'>
          3개까지 선택 가능
        </div>
      </div>
      <div className='grid grid-cols-3'>
        {lists.map((icon) => (
          <GenreItem key={icon.id} icon={icon} />
        ))}
      </div>
      <button
        className='flex items-center justify-center w-full font-semibold text-white rounded-md bg-ourIndigo h-14'
        onClick={onClickStart}
      >
        시작하기
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
export default GenreList;
