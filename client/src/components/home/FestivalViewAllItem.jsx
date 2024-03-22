const FestivalViewAllItem = ({
  id,
  name,
  date,
  location,
  posterUrl,
  lineup,
}) => {
  return (
    <div className='flex gap-x-4'>
      <div className='flex items-center justify-center h-[190px] w-[190px]'>
        <img
          className='object-cover w-full h-full rounded-md'
          src={posterUrl}
        />
      </div>
      <div className='grid gap-y-1'>
        <div className='text-lg'>{name}</div>
        <div className='flex'>
          <div>일시 | </div>
          <div className='ml-2'>
            {new Date(date).toLocaleDateString()}
          </div>
        </div>
        <div className='flex'>
          <div>장소 | </div>
          <div className='ml-2'>{location}</div>
        </div>
        <div>
          <div className=''>주요 라인업</div>
          <div>{lineup}</div>
        </div>
      </div>
    </div>
  );
};
export default FestivalViewAllItem;
