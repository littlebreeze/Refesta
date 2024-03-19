import heart from '../../assets/heart.png';
import heart_full from '../../assets/heart_full.png';

// 페스티벌 상세 정보
// 1. 페스티벌 포스터
// 2. 페스티벌 정보
const FestivalInfo = () => {
  return (
    <article className='flex m-6 min-h-60'>
      <div className='flex items-center flex-1'>
        {/* 세로 이미지 */}
        {/* <img
          className='object-fill min-h-64'
          src='https://www.hbnews.kr/news/photo/202210/23161_26078_5317.jpg'
          alt=''
        /> */}
        {/* 1*1이미지 */}
        <img
          className='object-fill h-60'
          src='https://street.co.kr/wp-content/uploads/2024/02/%EC%A0%95%EB%B0%A9%ED%98%95-hpf-main-poster-final2402183-scaled.jpg'
          alt=''
        />
      </div>
      <div className='relative items-start flex-1 ml-2'>
        <div className='text-sm font-semibold'>워터밤 서울 2024 - 1일차</div>
        <div className='mt-2 border-b border-b-black'></div>
        <div className='p-2'>
          <div className='pb-1 text-sm'>장소</div>
          <div className='pb-4 pl-1 text-xs'>페스티벌 장소</div>
          <div className='pb-1 text-sm'>날짜</div>
          <div className='pb-4 pl-1 text-xs'>페스티벌 날짜</div>
          <div className='pb-1 text-sm'>가격</div>
          <div className='pb-4 pl-1 text-xs'>144,000 원</div>
        </div>
        <div className='absolute bottom-0 right-0 flex justify-end pr-1'>
          <img className='' src={heart_full} alt='' />
        </div>
      </div>
    </article>
  );
};

export default FestivalInfo;
