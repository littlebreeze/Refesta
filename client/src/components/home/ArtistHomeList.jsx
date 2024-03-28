import { useEffect, useRef, useState } from 'react';
import instance from '../../util/token_interceptor';

import refresh from '../../assets/refresh.png';
import ArtistHomeItem from './ArtistHomeItem';
import ListTitle from './ListTitle';

const ArtistHomeList = () => {
  const [artistData, setArtistData] = useState([]);

  // 페이지 번호
  const [page, setPage] = useState(1);

  // 추천 아티스트 정보 요청
  const getRecommendArtists = async () => {
    const response = await instance.get('recommendations/artists', {
      //const response = await instance.get(`artists/${page}`, {
      params: { page },
    });
    setArtistData(response.data.data.artistInfoList);
  };

  useEffect(() => {
    getRecommendArtists();
  }, [page]);

  const onClickRefresh = () => {
    setPage(page + 1);
  };

  return (
    <div className='h-[283px]'>
      <ListTitle
        title={'추천 아티스트'}
        description={'아티스트로 페스티벌을 찾아보세요!'}
        btn={
          <div className='w-[30px] ml-auto'>
            <img src={refresh} onClick={onClickRefresh} />
          </div>
        }
      />
      <div className='flex overflow-x-scroll gap-x-3 scrollbar-hide px-7'>
        {artistData.map((item) => (
          <ArtistHomeItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default ArtistHomeList;
