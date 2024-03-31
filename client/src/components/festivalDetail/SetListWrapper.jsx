import SetListPlayer from '@components/festivalDetail/SetListPlayer';
import ArtistList from '@components/festivalDetail/ArtistList';
import PlayList from '@components/festivalDetail/PlayList';

// 셋리스트를 관리하는 탭
const SetListWrapper = () => {
  return (
    <>
      <div className='min-h-[800px] bg-ourIndigo pb-8'>
        <ArtistList />
        <SetListPlayer />
        <PlayList />
      </div>
    </>
  );
};

export default SetListWrapper;
