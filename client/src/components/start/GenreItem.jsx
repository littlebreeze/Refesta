import { getGenreImage } from '../../util/get-genre-image';

const GenreItem = ({ icon, onClickGenre }) => {
  const onClickItem = () => {
    onClickGenre(icon.id);
  };

  return (
    <div
      className='grid text-sm text-center place-items-center'
      onClick={onClickItem}
    >
      <div className='w-full mb-2'>
        <img className='w-full' src={getGenreImage(icon.image)} />
      </div>
      <div>{icon.title}</div>
    </div>
  );
};
export default GenreItem;
