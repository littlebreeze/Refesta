import LikeList from '../components/mypage/LikeList';

const LikeFestival = () => {
  const likeFestivalList = [
    {
      id: 1,
      name: '버저비트 페스티벌 2024',
      url: 'https://cdn.imweb.me/upload/S20200106a105fd03f4b57/0298d73a6c2a5.png',
      isLike: true,
    },
    {
      id: 2,
      name: '서울 재즈 페스티벌 2024',
      url: 'https://www.seouljazz.co.kr/data/editor/2312/20231205173920_7006427c7339d61b9ea55f8db36041fc_9r59.jpg',
      isLike: true,
    },
    {
      id: 3,
      name: '힙합플레이야 페스티벌 2024',
      url: 'https://cdn.imweb.me/upload/S20200106a105fd03f4b57/b5f745990e7bd.jpg',
      isLike: true,
    },
    {
      id: 4,
      name: '뷰티풀 민트 라이프 2024',
      url: 'https://cdn.imweb.me/upload/S20200106a105fd03f4b57/6bef8c28513b8.jpg',
      isLike: true,
    },
    {
      id: 5,
      name: '라운드 브릿지 페스티벌 2024',
      url: 'https://cdn.imweb.me/upload/S20200106a105fd03f4b57/4eff26aba9125.jpg',
      isLike: true,
    },
  ];
  return (
    <div className="bg-gray-200 h-lvh">
      <LikeList contents={likeFestivalList} />
    </div>
  );
};

export default LikeFestival;
