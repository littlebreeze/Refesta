import instance from '../../util/token_interceptor';

import { useEffect, useRef, useState } from 'react';

import defaultImg from '../../assets/default_img.jpg';
import editPencil from '../../assets/edit_pencil.png';

import { useProfileQuery } from '../../queries/profileQueries';

const ProfileInfo = ({ setStep, stepParam }) => {
  const { data, isLoading, isError, error } = useProfileQuery();

  const [nickname, setNickname] = useState('');
  const [imgInfo, setImgInfo] = useState({
    url: '',
    file: null,
  });

  // 사용자 정보 설정
  const getUserProfile = () => {
    if (!isError) {
      const nickname = data.data.data.nickname;
      const url = data.data.data.profileUrl;
      setNickname(nickname ? nickname : '');
      setImgInfo({ ...imgInfo, url: url });
    } else {
      alert('로그인 정보가 유효하지 않습니다!');
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    // if (!state) {
    //   alert('잘못된 접근입니다.');
    //   nav('/', { replace: true });
    // }
    if (!isLoading) getUserProfile();
  }, [isLoading]);

  // 닉네임 변경
  const onChangeNickName = (e) => {
    setNickname(e.target.value);
  };

  // 파일 변경
  const inputFile = useRef();
  // 연필을 눌렀을 때, 파일 인풋 누른것 처럼 동작
  const onClickInputFile = (e) => {
    e.preventDefault(); // 혹시 모르니 기존 동작 막고
    inputFile.current.click(); // 파일인풋 클릭
  };
  // 이미지 변경되었을 때, 미리보기
  const onChangeImgFile = (e) => {
    if (!e.target.value) return;
    // 파일 용량/확장자 체크하기
    let maxSize = 10 * 1024 * 1024; // 10mb
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    let type = e.target.files[0].type;
    let size = e.target.files[0].size;

    if (size > maxSize) {
      alert('파일 용량이 큽니다');
      return;
    }
    if (!allowedTypes.includes(type)) {
      alert('허용되지 않는 파일 타입입니다.');
      return;
    }

    setImgInfo((preState) => {
      return {
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      };
    });
  };

  // 사용자 입력 정보 서버로 전달
  const onClickRegist = async () => {
    if (!nickname) {
      alert('닉네임은 비워둘 수 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imgInfo.file);
    formData.append('nickname', nickname);

    const response = await instance.post('/members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.status !== 'success') {
      alert('로그인 정보가 유효하지 않습니다!');
    }
    setStep(stepParam.step2);
  };

  return (
    <div className='grid gap-y-5'>
      <div className='text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>프로필 설정하기</div>
      <div className='relative w-full'>
        <form>
          <input type='file' accept='image/*' ref={inputFile} className='hidden' onChange={onChangeImgFile} />
          <img
            className='object-cover w-full border rounded-full aspect-square border-zinc-300'
            src={imgInfo.url ? imgInfo.url : defaultImg}
          />
          <div
            className='absolute bottom-7 right-3 overflow-hidden flex justify-center bg-[#D9D9D9] rounded-full w-10 h-10 cursor-pointer'
            onClick={onClickInputFile}
          >
            <img className='object-contain w-1/2 h-full' src={editPencil} />
          </div>
        </form>
      </div>
      <input
        className='flex items-center justify-center w-full pl-5 rounded-md bg-ourBrightGray h-14'
        type='text'
        placeholder='닉네임 입력'
        value={nickname}
        onChange={onChangeNickName}
      />
      <button
        className='flex items-center justify-center w-full text-white rounded-md bg-ourIndigo h-14'
        onClick={onClickRegist}
      >
        설정 완료
      </button>
    </div>
  );
};
export default ProfileInfo;
