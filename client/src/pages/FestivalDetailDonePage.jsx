import FestivalInfo from '../components/festivalDetail/FestivalInfo';
import ReviewContainer from '../components/festivalDetail/ReviewContainer';

// 페스티벌 상세 완료
const FestivalDetailDonePage = () => {
  return (
    <>
      <FestivalInfo />
      <div>
        <ReviewContainer />
      </div>
    </>
  );
};

export default FestivalDetailDonePage;
