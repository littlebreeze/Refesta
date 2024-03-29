import { useEffect } from 'react';
import useLikeStore from '@store/likeStore';

import LikeList from '@components/mypage/LikeList';

const LikeFestival = () => {
  const { likeFestivalList, getLikeFestivalList } = useLikeStore();

  useEffect(() => {
    getLikeFestivalList();
  }, []);

  return (
    <div className='bg-gray-200 h-lvh'>
      <LikeList contents={likeFestivalList} />
    </div>
  );
};

export default LikeFestival;
