import defaultImg from '../../assets/defaultImg.jpg';
import editPencil from '../../assets/editPencil.png';

const ProfileInfo = ({ setStep }) => {
  const onClickRegist = () => {
    alert('프로필 설정 완료');
    setStep('YOUTUBE');
  };

  return (
    <div className='grid w-full gap-y-5'>
      <div className='text-center text-2xl font-bold leading-9 tracking-tight text-ourIndigo'>
        프로필 설정하기
      </div>
      <div className='relative p-2 w-full'>
        <img className='rounded-full  w-full' src={defaultImg} />
        <div
          className='absolute bottom-5 right-2 overflow-hidden flex justify-center bg-[#D9D9D9] rounded-full w-12 h-12 cursor-pointer'
          onClick={() => {
            alert('사진 선택');
          }}
        >
          <img
            className='w-1/2 h-full object-contain'
            src={editPencil}
          />
        </div>
      </div>
      <input
        className='flex justify-center items-center bg-ourBrightGray h-14 w-full pl-5 rounded-md'
        type='text'
        placeholder='닉네임 입력'
      />
      <button
        className='flex justify-center items-center text-white bg-ourIndigo h-14 w-full rounded-md'
        onClick={onClickRegist}
      >
        회원가입 완료
      </button>
    </div>
  );
};
export default ProfileInfo;
