import React from 'react';
import axios from 'axios';

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
