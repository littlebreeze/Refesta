import useSetListStore from '@store/setListStore';
import useFestivalInfoStore from '@store/festivalInfoStore';

import instance from '@util/token_interceptor';

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
    <div className='m-4 bg-white rounded-md'>
      <button onClick={createYoutubePlaylist}>버튼</button>
    </div>
  );
};

export default PlayListCreateButton;
