import BillingResult from "./../components/reservation/BillingResult";
import billImg from "./../assets/billImg.png";
import { useState } from "react";

const ReservationResultPage = () => {
  const [reservationNum, setReservationNum] = useState("2KB37452GD");

  return (
    <div className="flex-col justify-center text-center">
      <div className="h-[80px] w-full bg-slate-400">헤더</div>
      <div className="mt-10">
        <img className="w-full" src={billImg} />
      </div>
      <div className="mt-5 text-sm text-gray-400">
        예매번호 : {reservationNum}
      </div>
      <BillingResult />
    </div>
  );
};

export default ReservationResultPage;
