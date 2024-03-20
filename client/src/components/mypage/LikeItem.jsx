import heartFull from './../../assets/heart_full.png';
import heart from './../../assets/heart.png';

const LikeItem = ({ artist }) => {
  console.log(artist);
  const { id, name, url, isLike } = artist;
  return (
    <div className="relative flex flex-col w-full overflow-hidden rounded-2xl">
      <div className="h-44">
        <img
          className="object-cover w-full h-full"
          src={url}
        />
      </div>
      <div className="px-3 py-2 text-xs font-bold text-center truncate bg-white">{name}</div>
      <div
        className="absolute h-12 py-2.5 bottom-8 right-2"
        onClick={() => {
          console.log(id);
        }}
      >
        <img
          src={isLike ? `${heartFull}` : `${heart}`}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default LikeItem;
