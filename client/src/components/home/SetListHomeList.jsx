import { Link } from 'react-router-dom';
import SetListHomeItem from './SetListHomeItem';
import SetListHomeColItem from './SetListHomeColItem';
import ListTitle from './ListTitle';

const SetListHomeList = () => {
  const dummyData = [
    {
      id: 1,
      posterUrl:
        'https://ticketimage.interpark.com/Play/image/large/24/24001681_p.gif',
      name: '사운드 베리 THEATER 2024 - 1일차',
      date: new Date('2024-03-16').getTime(),
    },
    {
      id: 2,
      posterUrl:
        'https://ticketimage.interpark.com/Play/image/large/24/24001880_p.gif',
      name: '2024 LOVESOME - 마음 방울 채집',
      date: new Date('2024-04-27').getTime(),
    },
    {
      id: 3,
      posterUrl:
        'https://ticketimage.interpark.com/Play/image/large/24/24001681_p.gif',
      name: '사운드 베리 THEATER 2024 - 1일차',
      date: new Date('2024-03-16').getTime(),
    },
    {
      id: 4,
      posterUrl:
        'https://ticketimage.interpark.com/Play/image/large/24/24001880_p.gif',
      name: '2024 LOVESOME - 마음 방울 채집',
      date: new Date('2024-04-27').getTime(),
    },
    {
      id: 5,
      posterUrl:
        'https://ticketimage.interpark.com/Play/image/large/24/24001681_p.gif',
      name: '사운드 베리 THEATER 2024 - 1일차',
      date: new Date('2024-03-16').getTime(),
    },
    {
      id: 6,
      posterUrl:
        'https://ticketimage.interpark.com/Play/image/large/24/24001880_p.gif',
      name: '2024 LOVESOME - 마음 방울 채집',
      date: new Date('2024-04-27').getTime(),
    },
  ];
  return (
    <div className='h-[330px]'>
      <ListTitle
        title={'추천 셋리스트'}
        description={'셋리스트로 페스티벌을 알아보세요!'}
        btn={
          <Link className='cursor-pointer' to='/festival/list'>
            {`전체보기 >`}
          </Link>
        }
      />
      {/* <div className='flex gap-3 overflow-x-scroll bg-blue-600 scrollbar-hide whitespace-nowrap'>
        {dummyData.map((item) => (
          <SetListHomeItem key={item.id} {...item} />
        ))}
      </div> */}
      <div className='flex overflow-x-scroll gap-x-4 scrollbar-hide whitespace-nowrap'>
        {dummyData.map((item) => (
          // 2개씩 끊어서 보내줘야지
          <SetListHomeColItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default SetListHomeList;
