import { Link } from 'react-router-dom';
import SetListHomeItem from './SetListHomeItem';
import ListTitle from './ListTitle';

const SetListHomeList = () => {
  return (
    <div className='bg-green-400 h-[271px]'>
      <ListTitle
        title={'추천 셋리스트'}
        description={'셋리스트로 페스티벌을 알아보세요!'}
        btn={
          <Link className='cursor-pointer' to='/festival/list'>
            {`전체보기 >`}
          </Link>
        }
      />
      <SetListHomeItem />
    </div>
  );
};
export default SetListHomeList;
