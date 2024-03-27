import LikeItem from './../mypage/LikeItem';
import { useNavigate } from 'react-router';

const LikeList = ({ contents }) => {
  const nav = useNavigate();
  const handleItemClick = (id, type) => {
    if (type === 'festival') {
      nav(`/festival/${id}`);
    } else {
      nav(`/artist/${id}`);
    }
  };
  console.log(contents);

  return (
    <div className='grid grid-cols-2 gap-3 pt-3 mx-3 bg-gray-200'>
      {contents && contents.length > 0 ? (
        contents.map((content) => {
          const modifiedContents = {
            ...content,
            id: content.festivalId || content.artistId,
            url: content.posterUrl || content.pictureUrl,
            type: content.festivalId ? 'festival' : 'artist',
          };
          return (
            <LikeItem
              key={modifiedContents.id}
              content={modifiedContents}
              onClick={() => handleItemClick(modifiedContents.id, modifiedContents.type)}
            />
          );
        })
      ) : (
        <div className='mt-10 text-xl font-bold text-center'>좋아하는 아티스트가 없어요</div>
      )}
    </div>
  );
};

export default LikeList;
