import React from 'react';
import axios from 'axios';

// 검색 더미데이터
const festivalData = [
  {
    festivalId: 1,
    festivalName: '페스티벌1',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZWVBmlIJDtyR5A94VRS8NZ23pHJ6y4g8SDiVtlEqvA&s',
  },
  { festivalId: 2, festivalName: '페스티벌2', imgSrc: 'https://www.jungle.co.kr/image/4371bca94e1cbaf99b492e4b' },
  {
    festivalId: 3,
    festivalName: '페스티벌3',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUCZVeXZKttzr92dQb1IifchonFC6pp_suN876hGcqA&s',
  },
  {
    festivalId: 4,
    festivalName: '페스티벌4',
    imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2eAxdtsFgWTvdj1-7Jpbc_3mkRM78Ibbl7oPyny0GA&s',
  },
  {
    festivalId: 5,
    festivalName: '페스티벌5',
    imgSrc: 'https://i.pinimg.com/originals/0d/38/a5/0d38a59507825d5f09e686016e685bee.jpg',
  },
  {
    festivalId: 6,
    festivalName: '페스티벌6',
    imgSrc: 'https://festival.seoul.go.kr/files/2021/09/img-poster-2021.jpg',
  },
  {
    festivalId: 7,
    festivalName: '페스티벌7',
    imgSrc: 'https://cdn.bokjitimes.com/news/photo/202211/33800_22771_5029.jpg',
  },
];

// 통합검색 결과
const TestPage = () => {
  const baseURL = `${import.meta.env.VITE_PUBLIC_API_SERVER}/festivals/2`;
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjpbIlJPTEVfQURNSU4iXSwiYXVkIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwic3ViIjoiMTA3OTQ4MDU4MzM1NzA4NjY1MjYwIiwiaXNzIjoiaHR0cHM6Ly9qMTBhNjAxLnAuc3NhZnkuaW8vIiwiaWF0IjoxNzExMDA0MzM2LCJleHAiOjE3MTI4MDQzMzZ9.vZzSd4v5rA1pGDeWNpkFt5HpMzYzAdFZUJIHKKwIl80KaI6rheI1fXiaQIQV9RGvDDdy-snwVOSmmZ2a0CAoUA';
  const accessToken = `Bearer ${token}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  };

  const getFestivalDetailInfo = async () => {
    try {
      const response = await axios.get(baseURL, {
        headers: headers,
        withCredentials: true,
      });
      if (response.data.status == 'success') {
        console.log(response);
        console.log(response.data);
        console.log(response.data.data.name);
        console.log(response.data.data.location);
        console.log(response.data.data.posterUrl);
        console.log(response.data.data.price);
        console.log(response.data.data.ended);
        console.log(response.data.data.liked);
      } else {
        console.log('성공아냐');
        console.log(response);
      }
    } catch (error) {
      console.log('토큰 재발급이 필요합니다');
      console.log(error);
    }
  };

  return (
    <>
      <div>테스트 페이지</div>
      <button onClick={getFestivalDetailInfo}>요청버튼입니다</button>
    </>
  );
};
export default TestPage;
