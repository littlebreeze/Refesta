import { create } from 'zustand';

const useMyReviewStore = create((set) => ({
  reviewList: [
    {
      id: 1,
      name: '재즈 페스티벌',
      date: new Date(),
      location: '올림픽 공원',
      contents: '넌ㄴ무머눔눔 좋았따 좋았따넌ㄴ무머눔눔 좋았따 좋았따넌ㄴ무머눔눔 좋았따 좋았따',
      attachmentUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201509/22/htm_2015092295240299783.jpg',
      type: 'IMAGE',
    },
    {
      id: 2,
      name: '힙합 페스티벌',
      date: new Date(),
      location: '보라매 공원',
      contents: '안 좋아따 좋아따',
      attachmentUrl: 'https://d1b632bso7m0wd.cloudfront.net/112.mp4',
      type: 'VIDEO',
    },
    {
      id: 3,
      name: '인디 페스티벌',
      date: new Date(),
      location: '막걸리 공원',
      contents: ' 조 오 아 따 좋았따 좋았따',
      attachmentUrl: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201509/22/htm_2015092295240299783.jpg',
      type: 'IMAGE',
    },
  ],
  removeReview: (id) =>
    set((state) => ({
      reviewList: state.reviewList.filter((review) => review.id !== id),
    })),
}));

export default useMyReviewStore;
