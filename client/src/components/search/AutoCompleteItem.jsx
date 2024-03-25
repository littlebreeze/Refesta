import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AutoCompleteItem = ({ name, keyword, setKeyword, setIsAutoCompleteOpen }) => {
  const selectedKeyword = useRef();
  const nav = useNavigate();

  const onClickKeyword = () => {
    setKeyword(selectedKeyword.current.getAttribute("data-keyword"));
    setIsAutoCompleteOpen(false);
    // 검색 결과 요청
    nav("/search/result");
  };
  return (
    <div title={name} data-keyword={name} ref={selectedKeyword} onClick={onClickKeyword}>
      {name}
    </div>
  );
};
export default AutoCompleteItem;
