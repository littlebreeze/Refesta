import ReviewList from './ReviewList';
import RegisterReview from '../../pages/RegisterReviewPage';
import { useEffect, useRef, useState } from 'react';
import plus from './../../assets/plus.png';

const ReviewContainer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handlePlusClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChangae = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setModalOpen(true);
    }
  };

  return (
    <div>
      <ReviewList />
      {isModalOpen ? (
        <></>
      ) : (
        <div
          className='absolute w-10 bg-gray-400 rounded-full opacity-60 bottom-3 right-3'
          onClick={handlePlusClick}
        >
          <img src={plus} />
          <input
            ref={fileInputRef}
            className='hidden'
            type='file'
            accept='image/*'
            onChange={handleFileChangae}
          />
        </div>
      )}

      <RegisterReview
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedFile={selectedFile}
      />
    </div>
  );
};

export default ReviewContainer;
