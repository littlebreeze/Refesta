import ArtistSearchList from '@components/search/ArtistSearchList';

// 통합검색 결과
const ArtistSearchWrapper = () => {
  return (
    <>
      <div className='flex flex-col'>
        <ArtistSearchList />
      </div>
    </>
  );
};
export default ArtistSearchWrapper;
