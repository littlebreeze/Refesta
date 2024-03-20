import LikeList from '../components/mypage/LikeList';

const LikeArtist = () => {
  const likeArtistList = [
    {
      id: 1,
      name: '아이유',
      url: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20240228182045_500.jpg?6907454bacbbe9f73304a7ec614bb483/melon/resize/416/quality/80/optimize',
      isLike: true,
    },
    {
      id: 2,
      name: '임재현',
      url: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/020/87/273/2087273_20240111105714_500.jpg?43f9b44f059d6b0c44df7b88e9f0db5f/melon/resize/416/quality/80/optimize',
      isLike: true,
    },
    {
      id: 3,
      name: '너드커넥션',
      url: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/022/43/398/2243398_20231214165914_500.jpg?65c483f4fd42e924cf96dff64412104d/melon/resize/416/quality/80/optimize',
      isLike: true,
    },
    {
      id: 4,
      name: '박재정',
      url: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/007/38/480/738480_20230419182323_500.jpg?2400995b633343d70384a160993f6a88/melon/resize/416/quality/80/optimize',
      isLike: true,
    },
    {
      id: 5,
      name: '태연',
      url: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/36/797/236797_20231123151416_500.jpg?74fbab1be2a2b07390f87cf3b48e663e/melon/resize/416/quality/80/optimize',
      isLike: true,
    },
  ];

  return (
    <div className="bg-gray-200 h-lvh">
      <LikeList contents={likeArtistList} />
    </div>
  );
};

export default LikeArtist;
