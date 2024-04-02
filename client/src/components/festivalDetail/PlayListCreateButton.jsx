import useSetListStore from '@store/setListStore';
import useFestivalInfoStore from '@store/festivalInfoStore';

import instance from '@util/token_interceptor';

import youtube_music_logo_white from '@assets/youtube_music_logo_white.png';

// 셋리스트 재생목록의 각 노래
const PlayListCreateButton = () => {
  const { currSongList } = useSetListStore();
  const { festivalInfoData } = useFestivalInfoStore();

  const createYoutubePlaylist = async () => {
    // 모달 띄우기

    // 동의 시 실행
    try {
      console.log('실행');

      // 성공 모달 띄우기
      // 실패 모달 띄우기

      // const audioUrlList = currSongList.map((song) => song.audioUrl);
      // const response = await instance.post(`festivals/playlists`, {
      //   festivalName: `${festivalInfoData.name}`,
      //   audioUrlList: audioUrlList,
      // });
      // if (response.data.status === 'success') {
      //   console.log('성공', response.data.data);
      //   // 성공 모달 띄우기
      // } else {
      //   // 실패 모달 띄우기
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {currSongList.length > 1 && (
        <div className='p-2 mx-4 my-4 text-white rounded-md bg-ourPink'>
          <button onClick={createYoutubePlaylist}>
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

// 하단 고정 버전
// <div className='mt-8 py-3 max-w-[500px] fixed bottom-0 w-full bg-white shadow-lg px-10'>
//   <button
//     className='w-full py-3 font-semibold text-white rounded-lg 0 bg-ourPink h-14'
//     onClick={createYoutubePlaylist}
//   >
//     <div className='flex justify-center'>
//       현재 재생목록 &nbsp;
//       <img className='w-[64px] h-full my-auto' src={youtube_music} alt='' />
//       &nbsp;에 저장하기
//     </div>
//   </button>
// </div>
