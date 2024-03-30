import useFestivalInfoStore from '@store/festivalInfoStore';

const FestivalInfoDetail = () => {
  const { festivalInfoData, setFestivalInfoData, festivalInfoDetailData, setFestivalInfoDetailData } =
    useFestivalInfoStore();

  return (
    <>
      <img src={festivalInfoDetailData} alt='' />
      <div className='py-10'></div>
    </>
  );
};

export default FestivalInfoDetail;
