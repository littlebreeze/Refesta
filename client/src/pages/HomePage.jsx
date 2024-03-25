import Carousel from '../components/home/Carousel';
import ArtistHomeList from '../components/home/ArtistHomeList';
import FestivalHomeList from '../components/home/FestivalHomeList';
import SetListHomeList from '../components/home/SetListHomeList';

import instance from '../util/token_interceptor';
import { useEffect, useState } from 'react';

const Home = () => {
  const [festivalData, setFestivalData] = useState([]);
  const [setListData, setSetListData] = useState([]);

  // 추천 페스티벌 정보 요청
  const getRecommendFestival = async () => {
    //const response = await instance.get('recommendations/festivals');
    const response = await instance.get('festivals/2');
    setFestivalData([
      { ...response.data.data, id: 1 },
      { ...response.data.data, id: 2 },
      { ...response.data.data, id: 3 },
    ]);
    setSetListData([
      { ...response.data.data, id: 1 },
      { ...response.data.data, id: 2 },
      { ...response.data.data, id: 3 },
    ]);
  };

  useEffect(() => {
    getRecommendFestival();
  }, []);

  return (
    <div>
      <div>
        <Carousel />
        <div className='pt-7 pl-7'>
          <FestivalHomeList festivalData={festivalData} />
        </div>
        <div className='pt-7 pl-7'>
          <ArtistHomeList />
        </div>
        <div className='py-7 pl-7'>
          <SetListHomeList setListData={setListData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
