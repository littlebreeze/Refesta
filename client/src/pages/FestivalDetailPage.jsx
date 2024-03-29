// 리액트 설정파일
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSetListStore from '@store/setListStore';
import instance from '@util/token_interceptor';

import FestivalInfo from '@components/festivalDetail/FestivalInfo';
import FestivalInfoDetail from '@components/festivalDetail/FestivalInfoDetail';
import ReservationButton from '@components/festivalDetail/ReservationButton';
import FestivalInfoContainer from '@components/festivalDetail/FestivalInfoContainer';

// 페스티벌 상세 진행중
const FestivalDetailPage = () => {
  const { id } = useParams();
  const [festivalInfoData, setFestivalInfoData] = useState(null);
  const [festivalInfoDetailData, setFestivalInfoDetailData] = useState(null);
  const {
    lineupList,
    addLineupList,
    selectedLineupList,
    setSelectedLineupList,
    songInfoMap,
    addSongInfoMap,
    sortedSongInfoMap,
    sortSongInfoMapByLineupList,
    selectedSongInfoMap,
    setSelectedSongInfoMap,
    currSong,
    setCurrSong,
    currSongList,
    setCurrSongList,
  } = useSetListStore();

  // 페이지가 처음 렌더링 될 때 페스티벌 정보를 가져옴
  useEffect(() => {
    const getFestivalInfoData = async () => {
      try {
        const response = await instance.get(`festivals/${id}`);
        if (response.data.status === 'success') {
          setFestivalInfoData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching festival info:', error);
      }
    };

    getFestivalInfoData();
  }, []);

  // 페스티벌의 완료 여부에 따라 실행될 함수 분기처리
  useEffect(() => {
    // 진행 예정 페스티벌일 경우
    if (festivalInfoData && !festivalInfoData.ended) {
      const getFestivalInfoDetailData = async () => {
        try {
          const response = await instance.get(`festivals/${id}/info`);
          setFestivalInfoDetailData(response.data.data.infoImgUrl);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getFestivalInfoDetailData();
    }
    // 이미 지난 페스티벌일 경우
    else if (festivalInfoData && festivalInfoData.ended) {
      const getSetListData = async () => {
        try {
          const response = await instance.get(`festivals/${id}/songs`);
          addLineupList(response.data.data.lineupList);
          addSongInfoMap(response.data.data.songInfoMap);
          setSelectedLineupList(response.data.data.lineupList);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      getSetListData();
    }
  }, [festivalInfoData]);

  useEffect(() => {
    if (lineupList.length > 0) {
      sortSongInfoMapByLineupList(lineupList, songInfoMap);
    }
  }, [lineupList]);

  useEffect(() => {
    if (lineupList.length > 0) {
      setSelectedSongInfoMap(sortedSongInfoMap);
      setCurrSong(sortedSongInfoMap[0][0]);
      const allSongs = lineupList.flatMap((artist) => songInfoMap[artist.id].flatMap((song) => song));
      setCurrSongList(allSongs);
    }
  }, [sortedSongInfoMap]);

  return (
    <div>
      {festivalInfoData && !festivalInfoData.ended ? (
        <div>
          <FestivalInfo festivalInfoData={festivalInfoData} />
          <FestivalInfoDetail festivalInfoDetailData={festivalInfoDetailData} />
          <ReservationButton festivalInfoData={festivalInfoData} />
        </div>
      ) : (
        <div>
          <FestivalInfo festivalInfoData={festivalInfoData} />
          <FestivalInfoContainer />
        </div>
      )}
    </div>
  );
};

export default FestivalDetailPage;
