import ArtistHomeItem from './ArtistHomeItem';

const ArtistHomeList = () => {
  return (
    <div className='bg-yellow-400 h-80'>
      <div>
        <div>
          <div>추천 아티스트</div>
          <div className='text-sm'>
            아티스트가 참여한 페스티벌을 알아보세요!
          </div>
        </div>
        <div>{`새로고침`}</div>
      </div>
      <ArtistHomeItem />
    </div>
  );
};
export default ArtistHomeList;
