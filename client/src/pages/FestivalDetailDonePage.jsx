import FestivalInfo from '../components/festivalDetail/FestivalInfo';
import FestivalInfoContainer from '../components/festivalDetail/FestivalInfoContainer';

// 완료 페스티벌 상세 더미데이터
const festivalDoneData = [
  {
    date: '2024-03-16',
    ended: true,
    liked: false,
    location: '일산 킨텍스 제2전시장 10홀',
    name: '스카 페스티벌 < Spin-off > 2024',
    posterUrl: 'https://image.toast.com/aaaaab/ticketlink/TKL_10/main0216(2).jpg',
    price: 121000,
  },
];

// 페스티벌 상세 완료
const FestivalDetailDonePage = () => {
  return (
    <>
      <FestivalInfo />
      <FestivalInfoContainer />
    </>
  );
};

export default FestivalDetailDonePage;
