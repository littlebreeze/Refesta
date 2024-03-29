import { useEffect } from 'react';
import { useParams } from 'react-router';
import useReviewStore from '@store/reviewStore';

import ReviewItem from '@components/festivalDetail/ReviewItem';

const ReviewList = () => {
  const { addReviews, reviewList } = useReviewStore();
  const { id } = useParams();

  useEffect(() => {
    addReviews(id);
  }, [addReviews, id]);

  return (
    <div className='flex flex-col items-center'>
      {reviewList && reviewList.length > 0 ? (
        reviewList.map((review, index) => (
          <ReviewItem
            key={index}
            review={review}
          />
        ))
      ) : (
        <div className='mt-20 text-2xl font-bold text-center'>작성한 후기가 없어요 :(</div>
      )}
    </div>
  );
};

export default ReviewList;
