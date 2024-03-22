import FestivalSearchItem from './FestivalSearchItem';

const FestivalSearchList = ({ festivalListData }) => {
  return (
    <div className='mx-auto'>
      <div className='flex flex-wrap justify-start'>
        {festivalListData.map((item) => (
          <FestivalSearchItem key={item.id} festival={item} />
        ))}
      </div>
    </div>
  );
};
export default FestivalSearchList;
