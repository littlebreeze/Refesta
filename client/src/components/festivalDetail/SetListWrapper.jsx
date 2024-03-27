import SetListPlayer from './SetListPlayer';
import ArtistList from '../festivalDetail/ArtistList';
import PlayList from '../festivalDetail/PlayList';

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
