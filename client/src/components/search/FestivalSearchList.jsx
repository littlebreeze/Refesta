import useSearchResultStore from '@store/searchResultStore';

import FestivalSearchItem from '@components/search/FestivalSearchItem';

const FestivalSearchList = ({ isTotal, setOpenSearchTab }) => {
  const { festivalList, artistList, setFestivalList, setArtistList } = useSearchResultStore();

  let renderFestivalListData = festivalList;
  if (isTotal && renderFestivalListData.length > 6) {
    renderFestivalListData = festivalList.slice(0, 6);
  }

  const onClickTotalBtn = () => {
    setOpenSearchTab(2);
  };

  console.log(festivalList);

  return (
    <div className='mb-8'>
      <div className='text-base font-bold text-left'>
        <span>페스티벌 &nbsp;</span>
        <span className='text-lg font-bold text-ourPink'>{festivalList.length}</span>
        <span className='text-lg text-gray-400'>
          {isTotal && festivalList.length > 6 && <button onClick={onClickTotalBtn}>&nbsp; &gt;</button>}
        </span>
      </div>
      {renderFestivalListData.length === 0 ? (
        <div className='p-4 mt-4 text-lg font-bold text-center '>페스티벌 정보가 없습니다.</div>
      ) : (
        <div className='flex flex-wrap justify-between'>
          {renderFestivalListData.map((festival) => (
            <FestivalSearchItem key={festival.id} festival={festival} />
          ))}
        </div>
      )}
    </div>
  );
};
export default FestivalSearchList;
