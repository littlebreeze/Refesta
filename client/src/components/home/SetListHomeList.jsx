import { Link } from 'react-router-dom';
import SetListHomeColItem from './SetListHomeColItem';
import ListTitle from './ListTitle';

const SetListHomeList = ({ setListData }) => {
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
          <Link className='cursor-pointer' to='/festival/list/ended'>
            {`전체보기 >`}
          </Link>
        }
      />
      <div className='flex overflow-x-scroll gap-x-4 scrollbar-hide whitespace-nowrap px-7'>
        {chunkArray(setListData, 2).map((chunkItem, idx) => (
          // 2개씩 끊어서 보내줘야지
          <SetListHomeColItem key={idx} chunkItem={chunkItem} />
        ))}
      </div>
    </div>
  );
};
export default SetListHomeList;
