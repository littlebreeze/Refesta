import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Google_Login = () => {
  const nav = useNavigate();

  const handleHome = () => {
    nav('/', { replace: true });
    //window.location.reload();
  };

  const handleProfile = () => {
    nav('/nickname', { replace: true });
    //window.location.reload();
  };

  const [params, setParams] = useSearchParams();
  const code = params.get('code');

  const handleLoginPost = async (code) => {
    // code url에서 받아오기
    const data = { code: code };
    try {
      // 백으로 요청 보내기
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      ).then((res) => res.json());

      // 토큰 저장 - 정하기
      // isSigUp으로 기존/신규 여부 판단
      res ? handleHome() : handleProfile();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      handleLoginPost(code);
    } else {
      console.log('로그인 재시도하세요.');
    }
  }, [code, nav]);

  return <h2>code 가져오기</h2>;
};

export default Google_Login;
