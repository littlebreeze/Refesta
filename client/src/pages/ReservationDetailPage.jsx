import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useKakaoStore from '@store/kakaoStore';

import PosterImage from '@components/reservation/PosterImage';
import BillingResult from '@components/reservation/BillingResult';

const ReservationDetail = () => {
  const { billingResult, getBillingResult } = useKakaoStore();
  const { id } = useParams();
  useEffect(() => {
    getBillingResult(id);
  }, [id]);

  return (
    <div>
      <PosterImage posterUrl={billingResult.posterUrl} />
      <BillingResult billingResult={billingResult} />
    </div>
  );
};

export default ReservationDetail;
