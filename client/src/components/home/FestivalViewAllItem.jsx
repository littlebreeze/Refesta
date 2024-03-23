const FestivalViewAllItem = ({ id, name, date, location, posterUrl, lineup }) => {
  return (
    <div className='flex gap-x-4'>
      <div className='flex items-center justify-center w-2/5'>
        <img className='object-cover w-full h-full rounded-md' src={posterUrl} />
      </div>
      <div>
        <div className='mb-4 text-lg font-semibold'>{name}</div>
        <div className='flex items-center'>
          <div className='text-sm font-semibold text-zinc-400'>일시 ♪ </div>
          <div className='ml-2'>{new Date(date).toLocaleDateString()}</div>
        </div>
        <div className='flex items-center mb-2'>
          <div className='text-sm font-semibold text-zinc-400'>장소 ♪ </div>
          <div className='ml-2 text-ourBrightIndigo'>{location}</div>
        </div>
        <div>
          <div className='text-sm text-zinc-500'>주요 라인업</div>
          <div className='font-medium text-pink-800'>{lineup}</div>
        </div>
      </div>
    </div>
  );
};
export default FestivalViewAllItem;
