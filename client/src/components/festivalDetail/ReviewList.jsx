import useReviewStore from '../store/reviewStore';
import ReviewItem from './ReviewItem';

const ReviewList = () => {
  const { reviewList } = useReviewStore();

  return (
    <div className='flex flex-col'>
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
