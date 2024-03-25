import { useNavigate } from 'react-router';

const SetListHomeItem = ({ id, posterUrl, name, date }) => {
  const nav = useNavigate();

  const onClickItem = () => {
    nav(`/festival/${id}`);
  };
  return (
    <div className='flex w-[240px]' onClick={onClickItem}>
      <div className='w-[120px] h-[120px] mr-3'>
        <img
          className='object-cover w-full h-full rounded-md'
          src={posterUrl}
        />
      </div>
      <div className='w-[120px] whitespace-normal'>
        <div className='overflow-clip'>{name}</div>
        <div className='text-sm text-zinc-500'>
          일시 : {new Date(date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
export default SetListHomeItem;
