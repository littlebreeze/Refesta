const PosterImage = ({ posterUrl }) => {
  return (
    <div className='relative flex justify-center w-full h-myVh'>
      <div
        className='flex justify-center w-full overflow-hidden opacity-30'
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
        }}
      ></div>
      <div className='absolute flex justify-center overflow-hidden w-myVw h-myVh'>
        <img
          className='object-cover h-full'
          src={posterUrl}
        />
      </div>
    </div>
  );
};

export default PosterImage;
