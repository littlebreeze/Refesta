import { getGenreImage } from '../../util/get-genre-image';

const GenreItem = ({ icon }) => {
  return (
    <div className='justify-center h-32 text-sm text-center'>
      <img className='my-auto' src={getGenreImage(icon.image)} />
      <div>{icon.title}</div>
    </div>
  );
};
export default GenreItem;
