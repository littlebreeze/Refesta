import useArtistStore from '../../store/artistStore';
import useLikeStore from '../../store/likeStore';

import heartFull from './../../assets/heart_full.png';
import heart from './../../assets/heart.png';

const LikeItem = ({ content, onClick }) => {
  const { id, name, url, like, type } = content;
  const { updateLike } = useArtistStore();
  const { toggleLike } = useLikeStore();

  const handleLikeBtn = () => {
    if (type === 'artist') {
      console.log(id, type);
      toggleLike(id);
      updateLike(id);
    }
  };

  return (
    <div
      className='relative flex flex-col w-full overflow-hidden rounded-2xl'
      onClick={onClick}
    >
      <div className='h-44'>
        <img
          className='object-cover w-full h-full'
          src={url}
        />
      </div>
      <div className='px-3 py-2 text-xs font-bold text-center truncate bg-white'>{name}</div>
      <div
        className='absolute h-12 py-2.5 bottom-8 right-2'
        onClick={(e) => {
          e.stopPropagation();
          handleLikeBtn();
        }}
      >
        <img
          src={like ? `${heartFull}` : `${heart}`}
          className='h-full'
        />
      </div>
    </div>
  );
};

export default LikeItem;
