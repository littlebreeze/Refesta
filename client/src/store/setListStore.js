import { create } from 'zustand';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import instance from '../util/token_interceptor';

// api 예시
// const getFestivalInfoData = async () => {
//     try {
//       const response = await instance.get(`festivals/${id}`);
//       if (response.data.status === 'success') {
//         setFestivalInfoData(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching festival info:', error);
//     }
//   };

const useSetListStore = create((set) => ({
  // 페스티벌 라인업
  lineupList: [],
  addLineupList: (data) => {
    set({ lineupList: data });
  },

  // 사용자가 선택한 페스티벌 라인업
  selectedLineupList: [],
  setSelectedLineupList: (data) => {
    set({ selectedLineupList: data });
  },

  // 페스티벌 라인업 별 노래 목록
  songInfoMap: {},
  addSongInfoMap: (data) => {
    set({ songInfoMap: data });
  },

  // 페스티벌 라인업을 기준으로 정렬한 노래 목록
  sortedSongInfoMap: {},
  sortSongInfoMapByLineupList: (lineupList, songInfoMap) => {
    const sortedMap = lineupList.map(({ id }) => songInfoMap[id]);
    set({ sortedSongInfoMap: sortedMap });
  },

  // 사용자가 선택한 노래 목록
  selectedSongInfoMap: [],
  setSelectedSongInfoMap: (data) => {
    set({ selectedSongInfoMap: data });
  },

  // 전체선택 토글처리
  isAllSelected: true,
  setAllSelected: (data) => {
    set({ isAllSelected: data });
  },
}));

export default useSetListStore;
