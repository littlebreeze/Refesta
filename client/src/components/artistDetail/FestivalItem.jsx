import { useNavigate } from 'react-router';

const FestivalItem = ({ festival }) => {
  const { id, name, posterUrl } = festival;
  const nav = useNavigate();

  return (
    <div
      className=''
      onClick={() => {
        nav(`/festival/done/${id}`);
      }}
    >
      <div className='h-52'>
        <img
          className='object-cover w-full h-full'
          src={posterUrl}
        />
      </div>
      <div className='mt-1 text-sm'>{name}</div>
    </div>
  );
};

export default FestivalItem;
