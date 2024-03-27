import { useEffect, useState } from 'react';
import LikeList from '../components/mypage/LikeList';
import useLikeStore from '../store/likeStore';

const LikeArtist = () => {
  const { likeArtistList, getLikeArtistList } = useLikeStore();

  useEffect(() => {
    getLikeArtistList();
    console.log(likeArtistList);
  }, []); // likeArtistList 넣으면 무한루프.. 왜 ?

  return (
    <div className='bg-gray-200 h-lvh'>
      <LikeList contents={likeArtistList} />
    </div>
  );
};

export default LikeArtist;
