import { Link } from 'react-router-dom';
import SetListHomeItem from './SetListHomeItem';
import SetListHomeColItem from './SetListHomeColItem';
import ListTitle from './ListTitle';
import { useEffect } from 'react';

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
        'https://ticketimage.interpark.com/Play/image/large/24/24001880_p.gif',
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
    {
      id: 7,
      posterUrl:
        'https://ticketimage.interpark.com/Play/image/large/24/24001880_p.gif',
      name: '2024 LOVESOME - 마음 방울 채집',
      date: new Date('2024-04-27').getTime(),
    },
  ];

  // 데이터를 2개씩 자른 새로운 배열을 만든다
  const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

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
      <div className='flex overflow-x-scroll gap-x-4 scrollbar-hide whitespace-nowrap'>
        {chunkArray(dummyData, 2).map((chunkItem, idx) => (
          // 2개씩 끊어서 보내줘야지
          <SetListHomeColItem key={idx} chunkItem={chunkItem} />
        ))}
      </div>
    </div>
  );
};
export default SetListHomeList;
