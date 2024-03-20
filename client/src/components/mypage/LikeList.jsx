import LikeItem from './../mypage/LikeItem';

const LikeList = ({ contents }) => {
  console.log(contents);
  return (
    <div className="grid grid-cols-2 gap-3 pt-3 mx-3 bg-gray-200">
      {contents && contents.length > 0 ? (
        contents.map((content) => (
          <LikeItem
            key={content.id}
            artist={content}
          />
        ))
      ) : (
        <div className="mt-10 text-xl font-bold text-center">좋아하는 아티스트가 없어요</div>
      )}
    </div>
  );
};

export default LikeList;
