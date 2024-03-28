import React, { useEffect, useState } from 'react';
import heart from '../../assets/heart.png';
import heart_full from '../../assets/heart_full.png';
import instance from '../../util/token_interceptor';

// 페스티벌 상세 정보
// 1. 페스티벌 포스터
// 2. 페스티벌 정보
const FestivalInfo = ({ festivalInfoData }) => {
  const [likedFestival, setLikedFestival] = useState(festivalInfoData && festivalInfoData.liked); // 좋아요 상태를 저장하는 상태 변수

  useEffect(() => {
    // festivalInfoData가 변경될 때 likedFestival 상태 업데이트
    if (festivalInfoData) {
      setLikedFestival(festivalInfoData.liked);
    }
  }, [festivalInfoData]);

  const handleLike = async () => {
    try {
      const response = await instance.patch(`festivals/${festivalInfoData.id}`);
      if (response.data.status === 'success') {
        setLikedFestival((prevLiked) => !prevLiked);
      }
    } catch (error) {
      console.error('페스티벌 좋아요 실패', error);
    }
  };

  return (
    <article className='m-6 mb-12 min-h-60'>
      {festivalInfoData && (
        <div className='flex'>
          <div className='flex items-center flex-1'>
            <img className='object-fill h-60' src={festivalInfoData.posterUrl} alt='' />
          </div>
          <div className='relative items-start flex-1 ml-2'>
            <div className='text-sm font-semibold'>{festivalInfoData.name}</div>
            <div className='mt-2 border-b border-b-black'></div>
            <div className='p-2'>
              <div className='pb-1 text-sm'>장소</div>
              <div className='pb-4 pl-1 text-xs'>{festivalInfoData.location}</div>
              <div className='pb-1 text-sm '>날짜</div>
              <div className='pb-4 pl-1 text-xs'>{festivalInfoData.date}</div>
              <div className='pb-1 text-sm'>가격</div>
              <div className='pb-4 pl-1 text-xs'>{festivalInfoData.price.toLocaleString()}원</div>
            </div>
            <div className='absolute bottom-0 right-0 flex justify-end w-12 h-12 pr-1'>
              <img
                className=''
                src={likedFestival ? heart_full : heart}
                alt='페스티벌 좋아요 버튼'
                onClick={handleLike}
              />
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default FestivalInfo;
