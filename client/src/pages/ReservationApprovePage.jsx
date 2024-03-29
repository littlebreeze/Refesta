import { useEffect } from 'react';
import useKakaoStore from '../store/kakaoStore';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ReservationApprovePage = () => {
  const { approvePayment } = useKakaoStore();
  const [searchParams] = useSearchParams();
  const pgToken = searchParams.get('pg_token');
  const nav = useNavigate();

  useEffect(() => {
    if (pgToken) {
      approvePayment(pgToken)
        .then((data) => {
          nav(`/reservation/result/${data.data.reservation_id}`);
        })
        .catch((e) => {
          console.log('결제 승인 오류', e);
        });
    }
  }, []);

  return <div>결제 진행중</div>;
};

export default ReservationApprovePage;
