import SetListPlayer from './SetListPlayer';
import ArtistList from '../festivalDetail/ArtistList';
import PlayList from '../festivalDetail/PlayList';

const SetListWrapper = () => {
  return (
    <>
      <ArtistList />
      <SetListPlayer />
      <PlayList />
    </>
  );
};

export default SetListWrapper;
