import Carousel from '../components/home/Carousel';
import ArtistHomeList from '../components/home/ArtistHomeList';
import FestivalHomeList from '../components/home/FestivalHomeList';
import SetListHomeList from '../components/home/SetListHomeList';

import instance from '../util/token_interceptor';
import { useEffect } from 'react';

const Home = () => {
  const test = async () => {
    const response = await instance.get('festivals/2');
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <div>
      <div>
        <Carousel />
        <div className='pt-7 pl-7'>
          <FestivalHomeList />
        </div>
        <div className='pt-7 pl-7'>
          <ArtistHomeList />
        </div>
        <div className='py-7 pl-7'>
          <SetListHomeList />
        </div>
      </div>
    </div>
  );
};

export default Home;
