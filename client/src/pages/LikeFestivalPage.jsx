import { useEffect } from 'react';
import LikeList from '../components/mypage/LikeList';
import useLikeStore from '../store/likeStore';

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
