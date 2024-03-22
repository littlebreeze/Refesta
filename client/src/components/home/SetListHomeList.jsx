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
        'https://scontent.cdninstagram.com/v/t39.30808-6/432650969_18424797904063392_192097024842722525_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=UXelEa8niSgAX-HcGTu&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMyMTgyNzU1MTMwNzIyODk4Mw%3D%3D.2-ccb7-5&oh=00_AfADS05bJlvRv8AjcwVpiV50syCkozIDyIwU0iUP8UoHPQ&oe=660042F5&_nc_sid=10d13b',
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
        'https://scontent.cdninstagram.com/v/t39.30808-6/432650969_18424797904063392_192097024842722525_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=UXelEa8niSgAX-HcGTu&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMyMTgyNzU1MTMwNzIyODk4Mw%3D%3D.2-ccb7-5&oh=00_AfADS05bJlvRv8AjcwVpiV50syCkozIDyIwU0iUP8UoHPQ&oe=660042F5&_nc_sid=10d13b',
      name: '2024 LOVESOME - 마음 방울 채집',
      date: new Date('2024-04-27').getTime(),
    },
    {
      id: 7,
      posterUrl:
        'https://scontent.cdninstagram.com/v/t39.30808-6/432650969_18424797904063392_192097024842722525_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4yMDQ4eDIwNDguc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=UXelEa8niSgAX-HcGTu&edm=APs17CUAAAAA&ccb=7-5&ig_cache_key=MzMyMTgyNzU1MTMwNzIyODk4Mw%3D%3D.2-ccb7-5&oh=00_AfADS05bJlvRv8AjcwVpiV50syCkozIDyIwU0iUP8UoHPQ&oe=660042F5&_nc_sid=10d13b',
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
