import FestivalItem from '@components/artistDetail/FestivalItem';

const FestivalList = ({ festivalList }) => {
  if (festivalList && festivalList.length > 0) {
    return (
      <div className='grid grid-cols-2 gap-4 mt-4'>
        {festivalList.map((festival, index) => (
          <FestivalItem
            key={index}
            festival={festival}
          />
        ))}
      </div>
    );
  } else {
    return <div className='w-full mt-16 text-lg font-bold text-center'>아티스트가 참여한 페스티벌이 없습니다.</div>;
  }
};

export default FestivalList;
