import Carousel from '../components/home/Carousel';
import ArtistHomeList from '../components/home/ArtistHomeList';
import FestivalHomeList from '../components/home/FestivalHomeList';
import SetListHomeList from '../components/home/SetListHomeList';

const Home = () => {
  return (
    <div>
      <div>
        <Carousel />
        <FestivalHomeList />
        <ArtistHomeList />
        <SetListHomeList />
      </div>
    </div>
  );
};

export default Home;
