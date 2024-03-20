import { useState } from 'react';
import heartFull from './../../assets/heart_full.png';
import heart from './../../assets/heart.png';

const ArtistDetail = () => {
  const [artist, setArtist] = useState({
    id: 1,
    pictureUrl:
      'https://cdnimg.melon.co.kr/cm2/artistcrop/images/022/43/398/2243398_20231214165914_500.jpg?65c483f4fd42e924cf96dff64412104d/melon/resize/416/quality/80/optimize',
    name: '너드커넥션',
    genre: ['인디', '록메탈'],
    isLiked: false,
  });

  const handleLikeBtn = () => {
    setArtist({
      ...artist,
      isLiked: !artist.isLiked,
    });
  };

  return (
    <div className="flex-col">
      <section>
        <div className="flex-col justify-center mt-10 text-center">
          <div>
            <div className="relative">
              <div className="z-0 mx-20 overflow-hidden rounded-full w-13 h-13">
                <img
                  className="object-cover h-full"
                  src={artist.pictureUrl}
                  alt="사진"
                />
              </div>
              <div
                className="absolute w-12 h-12 py-2.5 bottom-0 right-12"
                onClick={handleLikeBtn}
              >
                <img
                  src={artist.isLiked ? `${heartFull}` : `${heart}`}
                  className="h-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="mt-5 text-2xl">{artist.name}</div>
            <div className="mt-4 text-sm text-gray-500">
              대표 장르 :{' '}
              {artist.genre.map((genre, index) => (
                <span key={index}>
                  {genre}
                  {index < artist.genre.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-5 mt-5">
        <div>참여 페스티벌</div>
        <div>리스트</div>
      </section>
    </div>
  );
};
export default ArtistDetail;
