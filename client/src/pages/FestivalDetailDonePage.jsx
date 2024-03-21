import FestivalInfo from '../components/festivalDetail/FestivalInfo';
import SetListContainer from '../components/festivalDetail/SetListContainer';
import PlayList from '../components/festivalDetail/PlayList';
import PlayListItem from '../components/festivalDetail/PlayListItem';
import _ReactPlayer from '../components/festivalDetail/_ReactPlayer';
import ReviewContainer from '../components/festivalDetail/ReviewContainer';

// 페스티벌 상세 완료
const FestivalDetailDonePage = () => {
  return (
    <>
      <FestivalInfo />
      <_ReactPlayer />
      <div>
        <ReviewContainer />
      </div>
    </>
  );
};

export default FestivalDetailDonePage;
