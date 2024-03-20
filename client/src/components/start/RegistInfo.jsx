import { useEffect, useState } from 'react';

import ProfileInfo from '../start/ProfileInfo';
import YoutubeConnect from './YoutubeConnect';
import GenreList from './GenreList';
import { useNavigate } from 'react-router-dom';

// STEP : profile > youtube > genre
const stepParam = {
  step1: 'profile',
  step2: 'youtube',
  step3: 'genre',
};

const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const RegisterInfo = ({ step }) => {
  const nav = useNavigate();
  const [steps, setStep] = useState(step);

  // 이 페이지로 이동했을 때, 토큰으로 사용자 정보 요청
  // 인데 이거는 리프레시토큰 요청입니다
  const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}/login/oauth/token`;

  const getRegenerateToken = async () => {
    try {
      // 백으로 요청 보내기
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'applicaion/json;charset-utf-8',
        },
        body: refreshToken,
      }).then((res) => res.json());

      console.log(response);
      // 토큰 저장
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem(
        'refreshToken',
        response.data.refreshToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegenerateToken();
  }, []);

  useEffect(() => {
    nav(`/regist/${steps}`, { replace: true });
  }, [steps]);

  // 저장된 토큰으로 사용자 정보 요청해서 받아오기
  // setStep 함수 넘겨주기

  return (
    <div>
      {steps === stepParam.step1 ? (
        <ProfileInfo setStep={setStep} stepParam={stepParam} />
      ) : steps === stepParam.step2 ? (
        <YoutubeConnect setStep={setStep} stepParam={stepParam} />
      ) : steps === stepParam.step3 ? (
        <GenreList setStep={setStep} stepParam={stepParam} />
      ) : null}
    </div>
  );
};
export default RegisterInfo;
