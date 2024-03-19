import { useNavigate } from 'react-router-dom';

import logo from '../../assets/refesta_logo.png';
import glogo from '../../assets/Google__G__logo.svg.png';

const Login = () => {
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    // 새창을 켜야할지도?
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
		&redirect_uri=${import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <div className='grid w-full place-items-center'>
      <img src={logo} />
      <h3 className='text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>
        당신만을 위한 페스티벌
      </h3>
      <h2 className='text-3xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>
        Refesta
      </h2>
      <div className='flex items-center justify-center w-full font-semibold bg-white shadow-md shadow-zinc-400 h-14 mt-14'>
        <img className='mr-4 max-w-4' src={glogo} />
        <button onClick={handleGoogleLogin}>Google로 시작하기</button>
      </div>
    </div>
  );
};
export default Login;
