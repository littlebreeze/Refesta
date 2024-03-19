import Header from "../components/common/Header";

const Home = () => {
  return (
    <>
      <Header />
      {/* before -> <div className="text-white bg-blue-500 p-4"> */}
      <div className="text-white bg-blue-500 p-4">
        <h2>Home</h2>
        <h4>홈페이지에 tailwind CSS 테스트 코드 작성되어 있음</h4>
      </div>
    </>
  );
};

export default Home;
