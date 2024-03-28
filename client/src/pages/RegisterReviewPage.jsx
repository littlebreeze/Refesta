import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

import Header from './../components/common/Header';
import xBtn from './../assets/x_black.png';
import picture from './../assets/picture.png';
import useReviewStore from '../store/reviewStore';

const RegisterReview = ({ isOpen, onClose, selectedFile: propSelectedFile }) => {
  const inputFileRef = useRef(null);
  const nav = useNavigate();
  const { id } = useParams();
  const { registerReview, addReviews } = useReviewStore();
  const [isPlaying, setIsPlaying] = useState(true);

  const [newReview, setNewReview] = useState({});

  const [selectedFile, setSelectedFile] = useState(propSelectedFile);
  const [fileUrl, setFileUrl] = useState('');
  const [isImage, setIsImage] = useState();

  // 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 모달 닫힐때 url정리
  useEffect(() => {
    console.log(fileUrl);
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
        setFileUrl('');
      }
    };
  }, [fileUrl]);

  // newReview에 festivalId 할당
  useEffect(() => {
    setNewReview((prev) => ({
      ...prev,
      festivalId: id,
    }));
  }, [id]);

  const handleContentsChange = (e) => {
    const { value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      contents: value,
    }));
  };

  // 넘겨받은 file 세팅
  useEffect(() => {
    if (propSelectedFile) {
      setNewReview((prev) => ({
        ...prev,
        file: propSelectedFile,
      }));
      setIsImage(propSelectedFile.type.startsWith('image'));
      setSelectedFile(propSelectedFile);
      const newURL = URL.createObjectURL(propSelectedFile);
      setFileUrl(newURL);
    }
  }, [propSelectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setSelectedFile(file);
      setIsImage(file.type.startsWith('image'));
      const newURL = URL.createObjectURL(file);
      console.log(newURL);
      setFileUrl(newURL);

      setNewReview((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleImageChange = () => {
    inputFileRef.current.click();
  };

  const handleReviewSubmit = async () => {
    await registerReview(newReview, async () => {
      await addReviews(id);
      onClose();
    });
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
                  {isImage ? (
                    <img
                      key={`file-preview-${Date.now()}`}
                      className='object-cover w-full h-full'
                      src={fileUrl}
                    />
                  ) : (
                    <ReactPlayer
                      key={`file-preview-${Date.now()}`}
                      url={fileUrl}
                      muted={true}
                      playing={isPlaying}
                      playsinline={true}
                      loop={true}
                      controls={true}
                      width='100%'
                      height='100%'
                      className='bg-gray-800'
                    />
                  )}
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
                    accept='image/*, video/*'
                    onChange={handleFileChange}
                  />
                </div>
                <textarea
                  className='w-full h-40 mt-5 overflow-y-scroll px-7 mx-7 focus:outline-none scrollbar-hide'
                  name=''
                  id=''
                  placeholder='문구 작성...'
                  onChange={handleContentsChange}
                ></textarea>
                <button
                  className='flex items-center justify-center w-11/12 mt-3 text-white rounded-md bg-ourIndigo h-14'
                  onClick={handleReviewSubmit}
                >
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
