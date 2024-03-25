import { getGenreImage } from "../../util/get-genre-image";

const GenreItem = ({ icon }) => {
  return (
    <div className='grid text-sm text-center place-items-center'>
      <div className='w-full mb-2'>
        <img className='w-full' src={getGenreImage(icon.image)} />
      </div>
      <div>{icon.title}</div>
    </div>
  );
};
export default GenreItem;
