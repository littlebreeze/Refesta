import text_logo from '../../assets/text_logo.png';

const Header = () => {
  return (
    <header className="bg-white-800 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 로고 */}
        <div className="flex items-center">
          <img src={text_logo} alt="" className="h-9 w-20" />
        </div>
        
        {/* 검색 버튼 */}
        <div className="flex-grow text-center">
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-200">
            검색
          </button>
        </div>
        
        {/* 햄버거 버튼 */}
        <div className="flex items-center bg-red-800">
          <button className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
