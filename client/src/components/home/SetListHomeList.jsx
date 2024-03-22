import { Link } from 'react-router-dom';
import SetListHomeItem from './SetListHomeItem';

const SetListHomeList = () => {
  return (
    <div className='bg-green-400 h-80'>
      <div>
        <div>
          <div>추천 셋리스트</div>
          <div className='text-sm'>
            셋리스트로 페스티벌을 알아보세요!
          </div>
        </div>
        <div>
          <Link className='cursor-pointer' to='/festival-list'>
            {' '}
            {`전체보기 >`}
          </Link>
        </div>
      </div>
      <SetListHomeItem />
    </div>
  );
};
export default SetListHomeList;
