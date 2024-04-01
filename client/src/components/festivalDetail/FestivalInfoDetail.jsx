import useFestivalInfoStore from '@store/festivalInfoStore';

// 예정 페스티벌의 상세 이미지 정보
const FestivalInfoDetail = () => {
  const { festivalInfoDetailData } = useFestivalInfoStore();

  return (
    <>
      <img src={festivalInfoDetailData} alt='' />
      <div className='py-10'></div>
    </>
  );
};

export default FestivalInfoDetail;
