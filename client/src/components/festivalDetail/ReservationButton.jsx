import { useNavigate } from 'react-router-dom';

const ReservationButton = () => {
  const nav = useNavigate();
  const onClickReservation = () => {
    nav('/reservation');
  };

  return (
    <div className='py-3 max-w-[500px] fixed bottom-0 w-full bg-white shadow-lg px-10'>
      <button
        className='w-full py-3 font-semibold text-white rounded-lg 0 bg-ourPink h-14'
        onClick={onClickReservation}
      >
        예매하기
      </button>
    </div>
  );
};
export default ReservationButton;
