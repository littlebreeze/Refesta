import Header from '../components/common/Header';
import FestivalInfo from '../components/festivalDetail/FestivalInfo';
import SetListContainer from '../components/festivalDetail/SetListContainer';
import PlayList from '../components/festivalDetail/PlayList';
import PlayListItem from '../components/festivalDetail/PlayListItem';
import _ReactPlayer from '../components/festivalDetail/_ReactPlayer';

// 페스티벌 상세 완료
const FestivalDetailDonePage = () => {
  return (
    <>
      <FestivalInfo />
      <_ReactPlayer />
    </>
  );
};

export default FestivalDetailDonePage;
