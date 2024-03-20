import { getGenreImage } from '../../util/get-genre-image';

const GenreItem = ({ icon }) => {
  return (
    <div className='grid h-32 text-sm text-center place-items-center'>
      <img src={getGenreImage(icon.image)} />
      <div>{icon.title}</div>
    </div>
  );
};
export default GenreItem;
