import useSetListStore from '@store/setListStore';
import useFestivalInfoStore from '@store/festivalInfoStore';

import instance from '@util/token_interceptor';

// 셋리스트 재생목록의 각 노래
const PlayListCreateButton = ({ song }) => {
  const { selectedSongInfoMap, currSongList } = useSetListStore();
  const { festivalInfoData } = useFestivalInfoStore();

  const createYoutubePlaylist = async () => {
    try {
      console.log('현재페스티벌', festivalInfoData);
      console.log('현재재생노래', selectedSongInfoMap);
      console.log('현재재생목록', currSongList);

      //   const response = await instance.post(`festivals/playlists`);
      //   if (response.data.status === 'success') {
      //     // 성공 모달 띄우기
      //   } else {
      //     // 실패 모달 띄우기
      //   }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={createYoutubePlaylist}>버튼</button>
    </div>
  );
};

export default PlayListCreateButton;
