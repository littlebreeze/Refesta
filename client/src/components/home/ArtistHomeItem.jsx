const ArtistHomeItem = ({ id, name, pictureUrl }) => {
  return (
    <div className='relative bg-red-400 w-[120px] h-[200px] text-center'>
      <img
        className='object-cover h-full rounded-full'
        src={pictureUrl}
      />
      <div className='absolute bottom-0 w-full truncate '>{name}</div>
    </div>
  );
};
export default ArtistHomeItem;
