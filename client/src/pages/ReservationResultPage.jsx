import BillingResult from './../components/reservation/BillingResult';
import billImg from './../assets/billImg.png';
import Header from './../components/common/Header';
import Button from './../components/common/Button';
import { useState } from 'react';

const ReservationResultPage = () => {
  const [reservationNum, setReservationNum] = useState('2KB37452GD');

  return (
    <div className="flex-col justify-center h-screen text-center">
      <div className="mt-10">
        <img
          className="w-full"
          src={billImg}
        />
      </div>
      <div className="mt-5 text-sm text-gray-400">예매번호 : {reservationNum}</div>
      <BillingResult />
      <div className="">
        <Button />
      </div>
    </div>
  );
};

export default ReservationResultPage;
