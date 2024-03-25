import AutoCompleteItem from "./AutoCompleteItem";
const AutoComplete = ({ isAutoCompleteOpen, keyword, setKeyword, setIsAutoCompleteOpen }) => {
  if (!isAutoCompleteOpen) return null;

  const festivalKeyword = ["유앤아이 페스티벌", "가나아이다라아이마바아이"];
  const artistKeyword = ["아이유", "아이브"];
  return (
    <div className='mt-4 bg-yellow-300'>
      <div>
        <div className='p-7'>
          <div className='mb-2 text-lg font-semibold'>페스티벌</div>
          <div className='grid gap-2 pl-7'>
            {festivalKeyword.map((item, idx) => (
              <AutoCompleteItem
                key={idx}
                name={item}
                keyword={keyword}
                setKeyword={setKeyword}
                setIsAutoCompleteOpen={setIsAutoCompleteOpen}
              />
            ))}
          </div>
        </div>
        <div className='w-full border-b border-zinc-300'></div>
        <div className='p-7'>
          <div className='mb-2 text-lg font-semibold'>아티스트</div>
          <div className='grid gap-2 pl-7'>
            {artistKeyword.map((item, idx) => (
              <AutoCompleteItem
                key={idx}
                name={item}
                keyword={keyword}
                setKeyword={setKeyword}
                setIsAutoCompleteOpen={setIsAutoCompleteOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AutoComplete;
