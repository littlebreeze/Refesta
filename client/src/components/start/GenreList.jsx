import { useState } from 'react';
import { useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import instance from '@util/token_interceptor';
import { useGenreQuery } from '@/queries/startPagesQueries';

import GenreItem from '@components/start/GenreItem';
import loading from '../../assets/loading.png';

const lists = [
  { id: 1, title: '랩/힙합', image: 'rap_hiphop', color: '727272' },
  { id: 2, title: '인디음악', image: 'indie', color: 'f3ab1f' },
  { id: 3, title: '록/메탈', image: 'rock_metal', color: '061E58' },
  {
    id: 4,
    title: '일렉트로니카',
    image: 'electronica',
    color: '0EDC9E',
  },
  { id: 5, title: '재즈', image: 'jazz', color: 'F6648B' },
  { id: 6, title: 'R&B/Soul', image: 'rb_soul', color: 'CD00EE' },
  { id: 7, title: '발라드', image: 'balad', color: '6BEE2E' },
  { id: 8, title: '댄스', image: 'dance', color: 'FF4E36' },
  {
    id: 9,
    title: '포크블루스',
    image: 'forks_blues',
    color: 'DD7022',
  },
];

const GenreList = ({ setStep, stepParam }) => {
  const nav = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, isLoading, isError, error } = useGenreQuery();

  const [selectedGenre, setSelectedGenre] = useState([]);

  const onClickGenre = (id) => {
    if (selectedGenre.includes(id)) {
      // 배열에서 제거
      setSelectedGenre(selectedGenre.filter((item) => item != id));
    } else {
      setSelectedGenre([...selectedGenre, id]);
    }
  };

  const postGenre = async () => {
    const response = await instance.post('members/genres', { preferGenres: selectedGenre });
    return response.data;
  };

  const onClickStart = () => {
    setModalOpen(true);
    mutate(selectedGenre);
    setTimeout(() => {
      setModalOpen(false);
      setStep(stepParam.step3);
      if (!isLoading) {
        Swal.fire({
          title: '환영합니다.',
          html: 'Refesta에서 당신에게 <br>딱 맞는 페스티벌을 찾아보세요!',
          confirmButtonColor: '#061E58',
          confirmButtonText: '확인',
        });

        nav('/', { replace: true });
      }
    }, 6000);

    if (isError) {
      console.log(error);
    }
  };

  const onClickSkip = () => {
    mutate(selectedGenre);
    nav('/', { replace: true });
  };

  return (
    <div className='relative grid gap-y-5'>
      <div>
        <div className='text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>선호 장르 선택하기</div>
        <div className='mb-5 text-sm text-center'>3개까지 선택 가능</div>
      </div>
      <div className='grid grid-cols-3 gap-y-3 gap-x-4'>
        {lists.map((icon) => (
          <GenreItem key={icon.id} icon={icon} onClickGenre={onClickGenre} selectedGenre={selectedGenre} />
        ))}
      </div>
      <button
        className='flex items-center justify-center w-full font-semibold text-white rounded-md bg-ourIndigo h-14'
        onClick={onClickStart}
      >
        시작하기
      </button>
      <div className='text-center underline cursor-pointer' onClick={onClickStart}>
        건너뛰기
      </div>
      {modalOpen && (
        <div id='modal-container' className='absolute top-0 left-0 flex w-full h-full '>
          <div
            id='modal-content'
            className='grid content-center w-full my-40 text-center border bg-white/95 rounded-2xl'
          >
            <div className='w-1/5 mx-auto mb-5'>
              <img className='w-full mr-3 motion-safe:animate-spin' src={loading} />
            </div>
            <div className='text-lg font-bold text-ourIndigo'>추천 데이터를 만드는 중입니다.</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default GenreList;
