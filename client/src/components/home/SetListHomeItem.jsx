import { useNavigate } from 'react-router';

const SetListHomeItem = ({ id, posterUrl, name, date, lineup }) => {
  const nav = useNavigate();

  const onClickItem = () => {
    nav(`/festival/${id}`);
  };

  if (!name) {
    return (
      <div className='flex w-[240px]'>
        <div className='w-[120px] motion-safe:animate-pulse h-[120px] mr-3 rounded-md bg-zinc-100'></div>
        <div className='w-[120px] motion-safe:animate-pulse'>
          <div className='w-full h-4 my-1 rounded-md bg-zinc-100'></div>
          <div className='w-full h-4 mb-3 rounded-md bg-zinc-100'></div>
          <div className='w-full rounded-md bg-zinc-100 h-[50px] overflow-hidden'></div>
        </div>
      </div>
    );
  }
  return (
    <div className='flex w-[240px]' onClick={onClickItem}>
      <div className='w-[120px] h-[120px] mr-3'>
        <img className='object-cover w-full h-full rounded-md' src={posterUrl} />
      </div>
      <div className='w-[120px] whitespace-normal '>
        <div className='truncate' title={name}>
          {name}
        </div>
        <div className='mb-2 text-sm text-zinc-500'>일시 : {new Date(date).toLocaleDateString()}</div>
        <div className='text-xs text-zinc-400 h-[50px] overflow-hidden'>{lineup}</div>
      </div>
    </div>
  );
};
export default SetListHomeItem;
