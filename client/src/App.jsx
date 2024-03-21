import { useState } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import RegisterInfo from './pages/RegisterInfoPage';
import Home from './pages/HomePage';
import FestivalList from './pages/FestivalListPage';
import FestivalDetail from './pages/FestivalDetailPage';
import FestivalDetailDone from './pages/FestivalDetailDonePage';
import Notfound from './pages/NotfoundPage';
import Google_Login from './components/start/Google_login';
import ArtistDetail from './pages/ArtistDetailPage';
import Reservation from './pages/ReservationPage';
import ReservationResult from './pages/ReservationResultPage';
import ReservationDetail from './pages/ReservationDetailPage';
import LikeArtist from './pages/LikeArtistPage';
import LikeFestival from './pages/LikeFestivalPage';
import Search from './pages/SearchPage';
import SearchResult from './pages/SearchResultPage';
import MyReview from './pages/MyReviewPage';
import MainLayout from './layout/MainLayout';
import SearchLayout from './layout/SearchLayout';
import SubLayout from './layout/SubLayout';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col h-full'>
      <BrowserRouter>
        <Routes>
          <Route element={<SubLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/google-login' element={<Google_Login />} />
            <Route path='/regist/:step' element={<RegisterInfo />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/festival-list' element={<FestivalList />} />
            <Route
              path='/festival-detail'
              element={<FestivalDetail />}
            />
            <Route
              path='/festival-detail-done'
              element={<FestivalDetailDone />}
            />
            <Route path='/artist-detail' element={<ArtistDetail />} />
            <Route path='/reservation' element={<Reservation />} />
            <Route
              path='/reservation-result'
              element={<ReservationResult />}
            />
            <Route
              path='/reservation-detail'
              element={<ReservationDetail />}
            />
            <Route path='/like-artist' element={<LikeArtist />} />
            <Route path='/like-festival' element={<LikeFestival />} />
            <Route path='my-review' element={<MyReview />} />
          </Route>

          <Route element={<SearchLayout />}>
            <Route path='/search' element={<Search />} />
            <Route path='/search-result' element={<SearchResult />} />
          </Route>

          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
