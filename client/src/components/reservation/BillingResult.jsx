const BillingResult = () => {
  const festival = {
    name: "대구 힙합 페스티벌(1일차)",
    date: new Date("2024-05-04"),
    location: "대구스타디움 보조경기장",
    price: 110000,
    paymentDate: new Date(),
    cnt: 2,
  };

  // 천단위 콤마 넣기
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  return (
    <div className="mx-5 mt-5">
      <div className="px-5 py-3 bg-gray-100 rounded-md">
        <div className="py-1 text-xl font-bold border-b-2 border-gray-400">
          결제 내역
        </div>
        <div className="px-2 py-2">
          <div className="flex justify-between text-xs">
            <div>페스티별명</div>
            <div className="font-bold">{festival.name}</div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div>일시</div>
            <div className="font-bold">
              {festival.date.getFullYear()}-
              {festival.date.getMonth() < 9
                ? `0${festival.date.getMonth() + 1}`
                : festival.date.getMonth() + 1}
              -
              {festival.date.getDay() < 10
                ? `0${festival.date.getDay()}`
                : festival.date.getDay()}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div>장소</div>
            <div className="font-bold">{festival.location}</div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div>결제일시</div>
            <div className="font-bold">
              {festival.paymentDate.getFullYear()}-
              {festival.paymentDate.getMonth() < 9
                ? `0${festival.paymentDate.getMonth() + 1}`
                : festival.paymentDate.getMonth() + 1}
              -
              {festival.paymentDate.getDay() < 10
                ? `0${festival.paymentDate.getDay()}`
                : festival.paymentDate.getDay()}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <div>티켓 수</div>
            <div className="font-bold">{festival.cnt}</div>
          </div>
        </div>
      </div>
      <div className="pr-2 mt-3 text-3xl font-bold text-right">
        {addComma(festival.cnt * festival.price)}원
      </div>
    </div>
  );
};

export default BillingResult;
