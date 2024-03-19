import defaultImg from '../../assets/defaultImg.jpg';
import editPencil from '../../assets/editPencil.png';

const ProfileInfo = ({ setStep }) => {
  const onClickRegist = () => {
    alert('프로필 설정 완료');
    setStep('YOUTUBE');
  };

  return (
    <div className='grid w-full gap-y-5'>
      <div className='text-2xl font-bold leading-9 tracking-tight text-center text-ourIndigo'>
        프로필 설정하기
      </div>
      <div className='relative w-full p-2'>
        <img className='w-full rounded-full' src={defaultImg} />
        <div
          className='absolute bottom-5 right-2 overflow-hidden flex justify-center bg-[#D9D9D9] rounded-full w-12 h-12 cursor-pointer'
          onClick={() => {
            alert('사진 선택');
          }}
        >
          <img
            className='object-contain w-1/2 h-full'
            src={editPencil}
          />
        </div>
      </div>
      <input
        className='flex items-center justify-center w-full pl-5 rounded-md bg-ourBrightGray h-14'
        type='text'
        placeholder='닉네임 입력'
      />
      <button
        className='flex items-center justify-center w-full text-white rounded-md bg-ourIndigo h-14'
        onClick={onClickRegist}
      >
        회원가입 완료
      </button>
    </div>
  );
};
export default ProfileInfo;
