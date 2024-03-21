import Carousel from '../components/home/Carousel';
import ArtistHomeList from '../components/home/ArtistHomeList';
import FestivalHomeList from '../components/home/FestivalHomeList';
import SetListHomeList from '../components/home/SetListHomeList';

import instance from '../util/token_interceptor';
import { useEffect } from 'react';
const headers = {
  'Content-Type': 'application/json',
};
const Home = () => {
  const test = async () => {
    const response = await instance.get('festivals/2', {
      withCredentials: true,
    });
    console.log(response);
  };

  useEffect(() => {
    test();
  }, []);

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
