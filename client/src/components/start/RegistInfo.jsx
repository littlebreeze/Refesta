import { useState } from 'react';

import ProfileInfo from '../start/ProfileInfo';
import YoutubeConnect from './YoutubeConnect';
import GenreList from './GenreList';

// STEP : PROFILE > YOUTUBE > GENRE

const RegisterInfo = () => {
  const [step, setStep] = useState('PROFILE');

  // 저장된 토큰으로 사용자 정보 요청해서 받아오기
  // setStep 함수 넘겨주기

  return (
    <div className='grid place-items-center w-full gap-y-5'>
      {step === 'PROFILE' ? (
        <ProfileInfo setStep={setStep} />
      ) : step === 'YOUTUBE' ? (
        <YoutubeConnect setStep={setStep} />
      ) : (
        <GenreList setStep={setStep} />
      )}
    </div>
  );
};
export default RegisterInfo;
