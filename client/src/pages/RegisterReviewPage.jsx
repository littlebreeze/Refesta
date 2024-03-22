import React, { useRef, useEffect } from 'react';

import Header from './../components/common/Header';
import xBtn from './../assets/x_black.png';
import picture from './../assets/picture.png';

const RegisterReview = ({ isOpen, onClose, selectedFile }) => {
  const inputFileRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (selectedFile && isOpen) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imageRef.current) {
          imageRef.current.src = e.target.result;
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (imageRef.current) {
          imageRef.current.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = () => {
    inputFileRef.current.click();
  };

  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {isOpen && (
        <div className='w-full h-full max-w-[500px] bg-white'>
          <Header />
          <button
            className='absolute m-4 mt-6 right-1 top-16'
            onClick={onClose}
          >
            <span>
              <img src={xBtn} />
            </span>
          </button>
          <div className='w-full h-full'>
            <div className='flex items-center justify-center h-10 text-lg font-bold py-7 border-y-2'>후기 작성</div>
            <section className='flex flex-col'>
              <div className='flex my-5 px-7'>
                <div className='overflow-hidden h-14 w-9'>
                  <img
                    className='object-cover h-full'
                    src='https://www.seouljazz.co.kr/data/editor/2312/20231205173920_7006427c7339d61b9ea55f8db36041fc_9r59.jpg'
                  />
                </div>
                <div className='flex flex-col justify-center px-3'>
                  <div className='font-bold'>제 15회 서울 재즈 페스티벌</div>
                  <div className='flex text-gray-500'>
                    <div>2023.07.07</div>
                    <div className='ml-2'>| 올림픽 공원</div>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <div className='relative flex items-center justify-center w-full overflow-hidden h-72 px-7'>
                  <img
                    ref={imageRef}
                    className='object-cover w-full'
                    src=''
                  />
                  <div
                    className='absolute flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full bottom-3 right-10'
                    onClick={handleImageChange}
                  >
                    <img
                      className='w-2/3'
                      src={picture}
                    />
                  </div>
                  <input
                    ref={inputFileRef}
                    className='hidden'
                    type='file'
                    name='file'
                    accept='image/*'
                    onChange={handleFileChange}
                  />
                </div>
                <textarea
                  className='w-full h-40 mt-5 overflow-y-scroll px-7 mx-7 focus:outline-none scrollbar-hide'
                  name=''
                  id=''
                  placeholder='문구 작성...'
                ></textarea>
                <button className='flex items-center justify-center w-11/12 mt-3 text-white rounded-md bg-ourIndigo h-14'>
                  등록하기
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterReview;
