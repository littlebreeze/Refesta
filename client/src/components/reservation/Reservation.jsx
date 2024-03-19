import { useState } from "react";
import PosterImage from "./PosterImage";

const Reservation = () => {
  const festival = {
    genre: ["랩", "힙합"],
    name: "대구 힙합 페스티벌(1일차)",
    date: new Date("2024-05-04"),
    location: "대구스타디움 보조경기장",
    price: 110000,
  };

  // 주문 수량
  const [cnt, setCnt] = useState(1);

  // 천단위 콤마 넣기
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  return (
    <div className="flex-col">
      <div className="h-[80px] w-full bg-slate-400">헤더</div>
      <PosterImage />
      <section className="flex-col mx-5 my-4">
        <div>
          <div className="text-gray-400 text-xs">
            {festival.genre.map((genre, index) => (
              <span key={index}>
                {genre}
                {index < festival.genre.length - 1 ? "/" : ""}
              </span>
            ))}
          </div>
          <div className="text-xl font-bold">{festival.name}</div>
        </div>
        <div className="mt-4 font-semibold">
          <div className="flex justify-between">
            <div>일시</div>
            <div>
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
          <div className="flex justify-between mt-2">
            <div>장소</div>
            <div>장충체육관</div>
          </div>
          <div className="flex justify-between mt-2">
            <div>가격</div>
            <div>성인 1매 {addComma(festival.price)}원</div>
          </div>
        </div>
        <div className="flex mt-10 justify-between bg-gray-200 rounded-md py-2 px-3">
          <div className="text-sm">주문 수량</div>
          <div className="flex bg-white px-2">
            <button
              className="px-1"
              onClick={() => {
                cnt > 1 ? setCnt(cnt - 1) : cnt;
              }}
            >
              -
            </button>
            <div className="px-2">{cnt}</div>
            <button
              className="px-1"
              onClick={() => {
                setCnt(cnt + 1);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className="mt-3 flex justify-between font-bold">
          <div>총 상품 금액 :</div>
          <div>{addComma(cnt * festival.price)}원</div>
        </div>
        <div className="flex justify-between w-full min-h-14 mt-3">
          <button className="mr-1 flex-1 bg-gray-300 rounded-md">취소</button>
          <button className="ml-1 flex-1 bg-yellow-300 rounded-md">
            카카오결제
          </button>
        </div>
      </section>
    </div>
  );
};

export default Reservation;
