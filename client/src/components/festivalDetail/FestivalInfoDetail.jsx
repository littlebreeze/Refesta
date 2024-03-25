const FestivalInfoDetail = ({ festivalInfoDetailData }) => {
  console.log('여기');
  console.log(festivalInfoDetailData);
  return (
    <>
      <img src={festivalInfoDetailData} alt='' />
      <div className='py-10'></div>
    </>
  );
};

export default FestivalInfoDetail;
