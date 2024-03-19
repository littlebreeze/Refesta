import { getGenreImage } from '../../util/get-genre-image';

const GenreItem = ({ icon }) => {
  return (
    <div className={`h-32 bg-[#${icon.color}]`}>
      <img src={getGenreImage(icon.image)} />
      <div>{icon.title}</div>
    </div>
  );
};
export default GenreItem;
