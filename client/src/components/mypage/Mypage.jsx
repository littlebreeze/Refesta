import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import xBtn from './../../assets/x_bold.png';
import defaultImg from './../../assets/default_img.jpg';
import likeArtist from './../../assets/like_artist.png';
import likeFesta from './../../assets/like_festa.png';
import myReivew from './../../assets/my_review.png';
import dropdown from './../../assets/dropdown.png';
import dropup from './../../assets/dropup.png';
import wave from './../../assets/wave.png';
const Mypage = ({ isOpen, onClose }) => {
  const nav = useNavigate();
  const [toggle, setToggle] = useState(false);
  if (!isOpen) return null;

  const handleGoLikeFesta = () => {
    nav('/like-festival');
    onClose();
  };
  const handleGoLikeArtist = () => {
    nav('/like-artist');
    onClose();
  };

  const reservationResults = [
    {
      name: '사운드베리 2024',
      date: new Date(),
      location: 'KBS 아레나홀',
    },
    {
      name: '워터밤 서울 2023',
      date: new Date(),
      location: '잠실 종합운동장 보조 경기장',
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isOpen ? 'animate-modalAnimation' : ''
      }`}
    >
      {isOpen && (
        <div className='w-full h-full max-w-[500px] bg-white'>
          <button
            className='absolute top-0 right-0 mt-6 mr-4 '
            onClick={onClose}
          >
            <span>
              <img src={xBtn} />
            </span>
          </button>
          <div className='w-full h-full'>
            <header className='w-full h-[80px] bg-ourIndigo flex items-center'>
              <div className='w-12 h-12 mx-5 overflow-hidden rounded-full'>
                <img className='h-full' src={defaultImg} />
              </div>
              <div className='text-lg text-white'>홍길동</div>
            </header>
            <section>
              <div className='flex my-5'>
                <div
                  className='flex flex-col items-center flex-1 text-center'
                  onClick={handleGoLikeFesta}
                >
                  <div className='flex items-center justify-center w-[4.5rem] h-[4.5rem] border-2 border-gray-300 border-solid rounded-full'>
                    <img
                      className='object-scale-down w-4/5'
                      src={likeArtist}
                    />
                  </div>
                  <div className='mt-3 text-xs font-bold'>
                    좋아요한 페스티벌
                  </div>
                </div>
                <div
                  className='flex flex-col items-center flex-1 text-center'
                  onClick={handleGoLikeArtist}
                >
                  <div className='flex items-center justify-center w-[4.5rem] h-[4.5rem] border-2 border-gray-300 border-solid rounded-full'>
                    <img
                      className='object-scale-down w-4/5'
                      src={likeFesta}
                    />
                  </div>
                  <div className='mt-3 text-xs font-bold'>
                    좋아요한 아티스트
                  </div>
                </div>
                <div className='flex flex-col items-center flex-1 text-center'>
                  <div className='flex items-center justify-center w-[4.5rem] h-[4.5rem] border-2 border-gray-300 border-solid rounded-full'>
                    <img
                      className='object-scale-down w-4/5'
                      src={myReivew}
                    />
                  </div>
                  <div className='mt-3 text-xs font-bold'>
                    내가 작성한 후기
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center w-full h-16 text-xs font-bold border-t-2 border-b-2'>
                예정 페스티벌
              </div>
              <div className='flex items-center justify-center w-full h-16 text-xs font-bold border-b-2'>
                지난 페스티벌
              </div>
              <div>
                <div
                  className='relative flex'
                  onClick={() => setToggle(!toggle)}
                >
                  <div className='flex items-center justify-center w-full h-16 text-xs font-bold border-b-2'>
                    예매 내역
                  </div>
                  <button className='absolute right-0 top-3'>
                    {toggle ? (
                      <img src={dropup} />
                    ) : (
                      <img src={dropdown} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                {toggle &&
                reservationResults &&
                reservationResults.length > 0 ? (
                  reservationResults.map((reservation, index) => (
                    <div key={index} className='flex h-16 px-6 mt-1'>
                      <div className='flex items-center justify-center w-10 border-2'>
                        <img className='h-3/5' src={wave} />
                      </div>
                      <div className='w-full px-4 py-2 text-white rounded-ee-xl bg-ourPink'>
                        <div className='text-xs font-bold'>
                          {reservation.name}
                        </div>
                        <div className='mt-1 text-[0.6rem]'>
                          {reservation.date.getFullYear()}-
                          {reservation.date.getMonth() < 9
                            ? `0${reservation.date.getMonth() + 1}`
                            : reservation.date.getMonth() + 1}
                          -
                          {reservation.date.getDay() < 10
                            ? `0${reservation.date.getDay()}`
                            : reservation.date.getDay()}
                        </div>
                        <div className='text-[0.6rem]'>
                          {reservation.location}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
