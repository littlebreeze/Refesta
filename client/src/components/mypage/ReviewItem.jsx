import { useState } from 'react';
import ReactPlayer from 'react-player';
import DeleteReview from './DeleteReview';

const ReviewItem = ({ review }) => {
  const { id, name, date, location, contents, attachmentUrl, type } = review;
  const [isPlaying, setPlaying] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className='flex flex-col pb-5 mx-5 mb-5 border-b-2'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <div className='text-lg font-bold'>{name}</div>
          <div className='flex text-sm text-gray-400'>
            <div className='mr-3'>
              {date.getFullYear()}-{date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-
              {date.getDay() < 10 ? `0${date.getDay()}` : date.getDay()}
            </div>
            <div>| {location}</div>
          </div>
        </div>
        <button
          className='text-xs text-gray-400'
          onClick={() => setModalOpen(true)}
        >
          삭제
        </button>
      </div>
      <div className='flex items-center justify-center mt-2 overflow-hidden w-80 h-80'>
        {type === 'IMAGE' ? (
          <img
            className='object-cover w-full h-full'
            src={attachmentUrl}
          />
        ) : (
          <ReactPlayer
            url={attachmentUrl}
            muted={true}
            playing={isPlaying}
            loop={true}
            controls={true}
            width='100%'
            height='270px'
            className='bg-gray-800'
          />
        )}
      </div>
      <div className='px-1 mt-2 text-sm'>{contents}</div>
      <DeleteReview
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        id={id}
      />
    </div>
  );
};

export default ReviewItem;
