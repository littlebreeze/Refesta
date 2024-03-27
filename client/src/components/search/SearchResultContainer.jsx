import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResultWrapper from './SearchResultWrapper';
import FestivalSearchWrapper from './FestivalSearchWrapper';
import ArtistSearchWrapper from './ArtistSearchWrapper';
import instance from '../../util/token_interceptor';

// 검색 결과 인풋에 유지 필요

// 검색 더미데이터
const festivalListData = [
  {
    id: 1,
    name: '페스티벌1',
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZWVBmlIJDtyR5A94VRS8NZ23pHJ6y4g8SDiVtlEqvA&s',
  },
  { id: 2, name: '페스티벌2', posterUrl: 'https://www.sjpost.co.kr/news/photo/202209/63605_63690_858.jpg' },
  {
    id: 3,
    name: '페스티벌3',
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUCZVeXZKttzr92dQb1IifchonFC6pp_suN876hGcqA&s',
  },
  {
    id: 4,
    name: '페스티벌4',
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2eAxdtsFgWTvdj1-7Jpbc_3mkRM78Ibbl7oPyny0GA&s',
  },
  {
    id: 5,
    name: '페스티벌5',
    posterUrl: 'https://i.pinimg.com/originals/0d/38/a5/0d38a59507825d5f09e686016e685bee.jpg',
  },
  {
    id: 6,
    name: '페스티벌6',
    posterUrl: 'https://festival.seoul.go.kr/files/2021/09/img-poster-2021.jpg',
  },
  {
    id: 7,
    name: '페스티벌7',
    posterUrl: 'https://cdn.bokjitimes.com/news/photo/202211/33800_22771_5029.jpg',
  },
];

const artistListData = [
  {
    id: 1,
    name: '아티스트1',
    pictureUrl: 'https://file2.nocutnews.co.kr/newsroom/image/2018/06/13/20180613171028464851_0_600_400.jpg',
  },
  {
    id: 2,
    name: '아티스트2',
    pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX6ymz6MoLTHiD1N0k4B_gcXQvEm-_fy9RsRPffvhw1g&s',
  },
  {
    id: 3,
    name: '아티스트3',
    pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSduvH1GvtZpN_PXqn3djWZ9c7rgwRmBRz2cJ4BfhwyCw&s',
  },
  {
    id: 4,
    name: '아티스트4',
    pictureUrl:
      'https://i.namu.wiki/i/Ik_uDo4DVhIDvKhcc1IwGXris7ZJD7LUKfAlZoFq543xPAx01Mt-AmcG9AUiwLfva4Hkblb7Hq2tFvawJL95vQ.webp',
  },
];

// 검색 결과 탭(통합검색/페스티벌/아티스트)
const SearchResultContainer = () => {
  const [openSearchTab, setOpenSearchTab] = useState(1);
  const [isTotal, setIsTotal] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const word = searchParams.get('word');

  // 왜안되지
  useEffect(() => {
    const getSearchResultData = async () => {
      try {
        const response = await instance.get(`searches/result?word=${word}`);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getSearchResultData();
  }, []);

  console.log(word);

  // 요청 테스트
  useEffect(() => {
    const getFestivalInfoData = async () => {
      try {
        const response = await instance.get(`festivals/13`);
        if (response.data.status === 'success') {
          console.log(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching festival info:', error);
      }
    };
    getFestivalInfoData();
  }, []);

  return (
    <div className=''>
      <ul className='flex h-[60px]'>
        {/* 통합검색 */}
        <li className={`w-1/3 text-center ${openSearchTab === 1 ? 'border-b-2 border-ourIndigo' : ''}`}>
          <button
            className={'w-full h-full text-xs px-2 py-2'}
            onClick={() => {
              setOpenSearchTab(1);
              setIsTotal(true);
            }}
          >
            <span className={openSearchTab === 1 ? 'text-ourIndigo' : 'text-gray-400'}>통합검색</span>
          </button>
        </li>
        {/* 페스티벌 */}
        <li className={`w-1/3 text-center ${openSearchTab === 2 ? 'border-b-2 border-ourIndigo' : ''}`}>
          <button
            className={'w-full h-full text-xs px-5 py-2'}
            onClick={() => {
              setOpenSearchTab(2);
              setIsTotal(false);
            }}
          >
            <span className={openSearchTab === 2 ? 'text-ourIndigo' : 'text-gray-400'}>페스티벌</span>
          </button>
        </li>
        {/* 아티스트 */}
        <li className={`w-1/3 text-center ${openSearchTab === 3 ? 'border-b-2 border-ourIndigo' : ''}`}>
          <button
            className={'w-full h-full text-xs px-5 py-2'}
            onClick={() => {
              setOpenSearchTab(3);
              setIsTotal(false);
            }}
          >
            <span className={openSearchTab === 3 ? 'text-ourIndigo' : 'text-gray-400'}>아티스트</span>
          </button>
        </li>
      </ul>
      <div className='h-full min-w-0 mx-4 mt-4 break-words'>
        <div className='flex-auto'>
          <div className={openSearchTab === 1 ? 'block' : 'hidden'}>
            <SearchResultWrapper
              festivalListData={festivalListData}
              artistListData={artistListData}
              isTotal={isTotal}
              openSearchTab={openSearchTab}
              setOpenSearchTab={setOpenSearchTab}
            />
          </div>
          <div className={openSearchTab === 2 ? 'block' : 'hidden'}>
            <FestivalSearchWrapper festivalListData={festivalListData} isTotal={isTotal} />
          </div>
          <div className={openSearchTab === 3 ? 'block' : 'hidden'}>
            <ArtistSearchWrapper artistListData={artistListData} isTotal={isTotal} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultContainer;
