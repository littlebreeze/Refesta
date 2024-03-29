import { useEffect, useState } from 'react';

import instance from '@util/token_interceptor';

import Carousel from '@components/home/Carousel';
import ArtistHomeList from '@components/home/ArtistHomeList';
import FestivalHomeList from '@components/home/FestivalHomeList';
import SetListHomeList from '@components/home/SetListHomeList';

const HomePage = () => {
  const [festivalData, setFestivalData] = useState([]);
  const [setListData, setSetListData] = useState([]);

  // 추천 페스티벌 정보 요청
  const getRecommendFestival = async () => {
    const response = await instance.get('recommendations/festivals');
    setFestivalData(response.data.data.scheduledFestivalList);
    setSetListData(response.data.data.endedFestivalList);
  };

  useEffect(() => {
    getRecommendFestival();
  }, []);

  return (
    <div>
      <div>
        <Carousel />
        <div className='pt-5'>
          <FestivalHomeList festivalData={festivalData} />
        </div>
        <div className='pt-7'>
          <ArtistHomeList />
        </div>
        <div className='py-7'>
          <SetListHomeList setListData={setListData} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
