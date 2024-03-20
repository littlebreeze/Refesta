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

const RegisterInfo = ({ step }) => {
  const nav = useNavigate();
  const [steps, setStep] = useState(step);

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
