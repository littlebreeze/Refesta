const BillingResult = ({ billingResult }) => {
  const festival = {
    name: '대구 힙합 페스티벌(1일차)',
    date: new Date('2024-05-04'),
    location: '대구스타디움 보조경기장',
    price: 110000,
    paymentDate: new Date(),
    cnt: 2,
  };

  // 천단위 콤마 넣기
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return returnString;
  };

  return (
    <div className='mx-5 mt-5'>
      <div className='px-5 py-3 bg-gray-100 rounded-md'>
        <div className='py-1 text-xl font-bold border-b-2 border-gray-400'>결제 내역</div>
        <div className='px-2 py-2'>
          <div className='flex justify-between text-xs'>
            <div>페스티별명</div>
            <div className='font-bold'>{billingResult.name}</div>
          </div>
          <div className='flex justify-between mt-2 text-xs'>
            <div>일시</div>
            <div className='font-bold'>{billingResult.festivalDate}</div>
          </div>
          <div className='flex justify-between mt-2 text-xs'>
            <div>장소</div>
            <div className='font-bold'>{billingResult.location}</div>
          </div>
          <div className='flex justify-between mt-2 text-xs'>
            <div>결제일시</div>
            <div className='font-bold'>
              {new Date(billingResult.paymentDate).getFullYear()}-
              {new Date(billingResult.paymentDate).getMonth() < 9
                ? `0${new Date(billingResult.paymentDate).getMonth() + 1}`
                : new Date(billingResult.paymentDate).getMonth() + 1}
              -
              {new Date(billingResult.paymentDate).getDate() < 10
                ? `0${new Date(billingResult.paymentDate).getDate()}`
                : new Date(billingResult.paymentDate).getDate()}
            </div>
          </div>
          <div className='flex justify-between mt-2 text-xs'>
            <div>티켓 수</div>
            <div className='font-bold'>{billingResult.count}</div>
          </div>
        </div>
      </div>
      <div className='pr-2 mt-3 text-3xl font-bold text-right'>{addComma(billingResult.price)}원</div>
    </div>
  );
};

export default BillingResult;
