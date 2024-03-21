import { create } from 'zustand';

const useReviewStore = create((set) => ({
  reviewList: [
    {
      writer: '닉네임입니다',
      profileUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201509/22/htm_2015092295240299783.jpg',
      attachmentUrl: 'https://img.gqkorea.co.kr/gq/2023/05/style_645dce9d6929c-800x521.png',
      mediaType: 'IMAGE',
      contents: '나락도 락이다!!!!!!!!!!!',
    },
    {
      writer: '닉네임입니다',
      profileUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201509/22/htm_2015092295240299783.jpg',
      attachmentUrl: 'https://d1b632bso7m0wd.cloudfront.net/112.mp4',
      mediaType: 'VIDEO',
      contents: '영상 게시글 테스트입니다 테스트테스트',
    },
    {
      writer: '닉네임입니다',
      profileUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201509/22/htm_2015092295240299783.jpg',
      attachmentUrl: 'https://img.gqkorea.co.kr/gq/2023/05/style_645dce9d6929c-800x521.png',
      mediaType: 'IMAGE',
      contents: '나123213321락325ㅅ135ㅅ도 락이다!!!!!!!!!!!',
    },
  ],
}));

export default useReviewStore;
