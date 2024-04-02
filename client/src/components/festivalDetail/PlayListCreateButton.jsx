import useSetListStore from '@store/setListStore';
import useFestivalInfoStore from '@store/festivalInfoStore';

import instance from '@util/token_interceptor';
import Swal from 'sweetalert2';

import youtube_music_logo_white from '@assets/youtube_music_logo_white.png';

// 셋리스트 재생목록의 각 노래
const PlayListCreateButton = () => {
  const { currSongList } = useSetListStore();
  const { festivalInfoData } = useFestivalInfoStore();

  const showConfirmDialog = async () => {
    Swal.fire({
      title: '재생목록 추가',
      text: '재생목록을 유튜브에 저장하시겠습니까?',
      showCancelButton: true,
      confirmButtonColor: '#061E58',
      cancelButtonColor: '#CACACA',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((res) => {
      if (res.isConfirmed) {
        try {
          createYoutubePlaylist();
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  };

  const createYoutubePlaylist = async () => {
    const audioUrlList = currSongList.map((song) => song.audioUrl);
    const response = await instance.post(`festivals/playlists`, {
      festivalName: `${festivalInfoData.name}`,
      audioUrlList: audioUrlList,
    });
    console.log(response.data);
    if (response.data.data === 'OK') {
      // 성공 모달 띄우기
      Swal.fire({
        title: '추가 완료',
        text: '현재 재생목록이 유튜브에 업데이트 되었습니다.',
        confirmButtonColor: '#061E58',
        confirmButtonText: '확인',
      });
    } else if (response.data.data === 'ACCEPTED') {
      // 실패 모달 띄우기
      Swal.fire({
        title: '추가 실패',
        text: '권한이 없습니다.',
        confirmButtonColor: '#ff4444',
        confirmButtonText: '확인',
      });
    }
  };

  return (
    <div>
      {currSongList.length > 1 && (
        <div className='p-2 mx-4 my-4 text-white rounded-md bg-ourPink' onClick={showConfirmDialog}>
          <button>
            <div className='flex text-sm'>
              <span>현재 재생목록&nbsp;</span>
              <img className='w-[48px] h-full my-auto' src={youtube_music_logo_white} alt='' />
              <span>&nbsp;에 저장하기</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayListCreateButton;
