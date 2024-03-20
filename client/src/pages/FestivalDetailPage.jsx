import Header from '../components/common/Header';
import FestivalInfo from '../components/festivalDetail/FestivalInfo';
import FestivalInfoDetail from '../components/festivalDetail/FestivalInfoDetail';
import ReservationButton from '../components/festivalDetail/ReservationButton';

// 페스티벌 상세 진행중
const FestivalDetailPage = () => {
  return (
    <>
      <Header />
      <FestivalInfo />
      <FestivalInfoDetail />
      <ReservationButton />
    </>
  );
};

export default FestivalDetailPage;
