import { useNavigate } from 'react-router-dom';

const FestivalSearchItem = ({ festival }) => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleClick = () => {
    navigate(`/festival/${festival.id}`);
  };

  return (
    <div className='w-[29%] mx-1 my-2' onClick={handleClick}>
      <div>
        <img className='object-cover rounded-md aspect-square' src={festival.posterUrl} alt={festival.name} />
      </div>
      <div className='mt-2 text-sm text-left'>{festival.name}</div>
    </div>
  );
};
export default FestivalSearchItem;
