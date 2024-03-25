import { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import useReviewStore from '../../store/reviewStore';

const ReviewList = () => {
  // const { reviewList } = useReviewStore();
  const { myReviewList, addMyReviews } = useReviewStore();

  useEffect(() => {
    addMyReviews();
  }, [addMyReviews]);

  return (
    <div className='flex flex-col'>
      {myReviewList && myReviewList.length > 0 ? (
        myReviewList.map((review) => (
          <ReviewItem
            key={review.reviewId}
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
