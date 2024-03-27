import useSearchStore from '../../store/searchStore';

import AutoCompleteItem from './AutoCompleteItem';

const AutoComplete = () => {
  const { autoCompleteList } = useSearchStore();

  const festivalKeyword = autoCompleteList.festivalWordList;
  const artistKeyword = autoCompleteList.artistWordList;
  return (
    <div className=''>
      <div>
        <div className='p-7'>
          <div className='mb-2 text-lg font-semibold'>페스티벌</div>
          <div className='grid gap-2 pl-7'>
            {festivalKeyword.map((item, idx) => (
              <AutoCompleteItem key={idx} name={item} />
            ))}
          </div>
        </div>
        <div className='w-full border-b border-zinc-300'></div>
        <div className='p-7'>
          <div className='mb-2 text-lg font-semibold'>아티스트</div>
          <div className='grid gap-2 pl-7'>
            {artistKeyword.map((item, idx) => (
              <AutoCompleteItem key={idx} name={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AutoComplete;
