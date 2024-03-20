import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Google_Login = () => {
  const nav = useNavigate();

  const handleHome = () => {
    nav('/', { replace: true });
    window.location.reload();
  };

  const handleProfile = (data) => {
    nav('/regist/profile', { state: { ...data }, replace: true });
    window.location.reload();
  };

  const [params, setParams] = useSearchParams();
  const code = params.get('code');
  const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}/login/oauth2/code/google`;

  const postLogin = async (code) => {
    // code url에서 받아오기
    // const data = { code: code };
    try {
      // 백으로 요청 보내기
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'applicaion/json;charset-utf-8',
        },
        body: code,
      }).then((res) => res.json());

      // 토큰 저장
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem(
        'refreshToken',
        response.data.refreshToken
      );

      // isSigUp으로 기존/신규 여부 판단
      response.data.signUp
        ? handleProfile(response.data)
        : handleHome();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      postLogin(code);
    } else {
      console.log('로그인 재시도하세요.');
    }
  }, [code, nav]);

  return <h2>code 가져오기</h2>;
};

export default Google_Login;
