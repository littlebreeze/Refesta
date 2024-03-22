import SetListHomeItem from './SetListHomeItem';
const SetListHomeColItem = ({ item }) => {
  return (
    <div className='grid gap-y-5'>
      <SetListHomeItem {...item} />
      <SetListHomeItem {...item} />
    </div>
  );
};
export default SetListHomeColItem;
