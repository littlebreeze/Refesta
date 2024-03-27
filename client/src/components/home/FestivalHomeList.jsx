import { Link } from 'react-router-dom';

import FestivalHomeItem from './FestivalHomeItem';
import ListTitle from './ListTitle';

const FestivalHomeList = ({ festivalData }) => {
  return (
    <div className='h-[271px]'>
      <ListTitle
        title={'추천 페스티벌'}
        description={'취향에 맞는 페스티벌을 추천해드려요!'}
        btn={
          <Link className='cursor-pointer' to='/festival/list/scheduled'>
            {`전체보기 >`}
          </Link>
        }
      />
      <div className='flex overflow-x-scroll scrollbar-hide whitespace-nowrap gap-x-3 px-7'>
        {festivalData.map((item) => (
          <FestivalHomeItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default FestivalHomeList;
