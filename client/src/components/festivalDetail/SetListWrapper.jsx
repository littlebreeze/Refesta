import _ReactPlayer from './_ReactPlayer';
import ArtistList from '../festivalDetail/ArtistList';
import PlayList from '../festivalDetail/PlayList';

const SetListWrapper = () => {
  return (
    <>
      <ArtistList />
      <_ReactPlayer />
      <PlayList />
    </>
  );
};

export default SetListWrapper;
