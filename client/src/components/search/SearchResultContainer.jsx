import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchResultWrapper from './SearchResultWrapper';
import FestivalSearchWrapper from './FestivalSearchWrapper';
import ArtistSearchWrapper from './ArtistSearchWrapper';
import instance from '../../util/token_interceptor';
import useSearchResultStore from '../../store/searchResultStore';

// 검색 결과 인풋에 유지 필요

// 검색 더미데이터

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

  const { festivalList, artistList, setFestivalList, setArtistList } = useSearchResultStore();

  useEffect(() => {
    const getSearchResultData = async () => {
      try {
        const response = await instance.get(`searches/results`, {
          params: {
            word: word,
          },
        });
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', response.data.data);
        setFestivalList(response.data.data.festivalList);
        setArtistList(response.data.data.artistList);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getSearchResultData();
  }, []);

  console.log(word);
  console.log(festivalList);
  console.log(artistList);

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
              artistListData={artistListData}
              isTotal={isTotal}
              openSearchTab={openSearchTab}
              setOpenSearchTab={setOpenSearchTab}
            />
          </div>
          <div className={openSearchTab === 2 ? 'block' : 'hidden'}>
            <FestivalSearchWrapper isTotal={isTotal} />
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
