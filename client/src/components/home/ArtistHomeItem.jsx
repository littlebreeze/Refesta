const ArtistHomeItem = ({ id, name, pictureUrl }) => {
  return (
    <div className='relative text-center'>
      <div className='absolute w-full h-full rounded-full bg-gradient-to-t from-stone-800 to-25%'></div>
      <div className='w-[120px] h-[200px] '>
        <img
          className='object-cover w-full h-full rounded-full '
          src={pictureUrl}
        />
      </div>
      <div className='absolute w-1/2 text-white truncate bottom-2 left-7'>
        {name}
      </div>
    </div>
  );
};
export default ArtistHomeItem;
