import ArtistHomeItem from './ArtistHomeItem';
import ListTitle from './ListTitle';

const ArtistHomeList = () => {
  const dummyData = [
    {
      id: 1,
      pictureUrl:
        'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20240228182045_500.jpg?6907454bacbbe9f73304a7ec614bb483/melon/resize/416/quality/80/optimize',
      name: '아이유',
    },
    {
      id: 2,
      pictureUrl:
        'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/36/797/236797_20231123151416_500.jpg?74fbab1be2a2b07390f87cf3b48e663e/melon/resize/416/quality/80/optimize',
      name: '태연',
    },
    {
      id: 3,
      pictureUrl:
        'https://cdnimg.melon.co.kr/cm2/artistcrop/images/031/58/525/3158525_20230428165453_500.jpg?b5beeb53312fd9fe9a08faa366f3a136/melon/resize/416/quality/80/optimize',
      name: 'Snake Chicken Soup',
    },
    {
      id: 4,
      pictureUrl:
        'https://cdnimg.melon.co.kr/cm2/artistcrop/images/007/52/425/752425_20231218182329_500.jpg?7cce68d824b86307520ac75c02fce00d/melon/resize/416/quality/80/optimize',
      name: '폴킴',
    },
    {
      id: 5,
      pictureUrl:
        'https://cdnimg.melon.co.kr/cm2/artistcrop/images/021/38/620/2138620_20231213114228_500.jpg?1307c444104a5a0524f338cb17402b00/melon/resize/416/quality/80/optimize',
      name: '이무진',
    },
    {
      id: 6,
      pictureUrl:
        'https://cdnimg.melon.co.kr/cm2/artistcrop/images/000/30/358/30358_20230127103808_500.jpg?238180d5647fedf781baecafe22f024c/melon/resize/416/quality/80/optimize',
      name: '거미',
    },
  ];
  return (
    <div className='bg-yellow-400 h-[271px]'>
      <ListTitle
        title={'추천 아티스트'}
        description={'아티스트가 참여한 페스티벌을 알아보세요!'}
        btn={<button>새로고침</button>}
      />
      <div className='flex overflow-x-scroll bg-blue-400 scrollbar-hide whitespace-nowrap gap-x-3'>
        {dummyData.map((item) => (
          <ArtistHomeItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default ArtistHomeList;
