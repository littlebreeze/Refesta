import { useState } from 'react';

import { getGenreImage } from '@util/get-genre-image';

import select from '@assets/select.png';

const GenreItem = ({ icon, onClickGenre, selectedGenre }) => {
  const [isSelected, setIsSelected] = useState(false);

  const onClickItem = () => {
    if (!selectedGenre.includes(icon.id) && selectedGenre.length === 3) {
      alert('장르는 3개까지 선택 가능합니다.');
      return;
    }
    setIsSelected(!isSelected);
    onClickGenre(icon.id);
  };

  return (
    <div className='grid text-sm text-center place-items-center' onClick={onClickItem}>
      <div className='relative w-full mb-2 '>
        <img className='w-full' src={getGenreImage(icon.image)} />
        {isSelected ? <img className='absolute top-0 left-0' src={select} /> : null}
      </div>
      <div>{icon.title}</div>
    </div>
  );
};
export default GenreItem;
