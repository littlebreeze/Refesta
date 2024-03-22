import { Link } from 'react-router-dom';
import FestivalHomeItem from './FestivalHomeItem';

const FestivalHomeList = () => {
  return (
    <div className='bg-blue-400 h-80'>
      <div>
        <div>
          <div>추천 페스티벌</div>
          <div className='text-sm'>
            취향에 맞는 페스티벌을 추천해드려요!
          </div>
        </div>
        <div>
          <Link className='cursor-pointer' to='/festival-list'>
            {`전체보기 >`}
          </Link>
        </div>
      </div>
      <FestivalHomeItem />
    </div>
  );
};
export default FestivalHomeList;
