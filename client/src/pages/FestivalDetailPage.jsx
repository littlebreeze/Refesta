import Header from '../components/common/Header';
import FestivalInfo from '../components/festivalDetail/FestivalInfo';
import FestivalInfoDetail from '../components/festivalDetail/FestivalInfoDetail';
import ReservationButton from '../components/festivalDetail/ReservationButton';

// 예정 페스티벌 상세 더미데이터
const festivalData = [
  {
    date: '2024-03-16',
    ended: false,
    liked: false,
    location: '일산 킨텍스 제2전시장 10홀',
    name: '스카 페스티벌 < Spin-off > 2024',
    posterUrl: 'https://image.toast.com/aaaaab/ticketlink/TKL_10/main0216(2).jpg',
    price: 121000,
  },
];

// 페스티벌 상세 진행중
const FestivalDetailPage = () => {
  return (
    <>
      <FestivalInfo />
      <FestivalInfoDetail />
      <ReservationButton />
    </>
  );
};

export default FestivalDetailPage;
