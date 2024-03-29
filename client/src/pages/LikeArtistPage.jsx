import { useEffect } from 'react';
import useLikeStore from '@store/likeStore';

import LikeList from '@components/mypage/LikeList';

const LikeArtist = () => {
  const { likeArtistList, getLikeArtistList } = useLikeStore();

  useEffect(() => {
    getLikeArtistList();
    console.log(likeArtistList);
  }, []); //

  return (
    <div className='bg-gray-200 h-lvh'>
      <LikeList contents={likeArtistList} />
    </div>
  );
};

export default LikeArtist;
