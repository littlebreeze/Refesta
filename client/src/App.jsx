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
import Search from './pages/SearchPage';
import SearchResult from './pages/SearchResultPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col h-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/google-login' element={<Google_Login />} />
          <Route path='/regist' element={<RegisterInfo />} />
          <Route path='/festival-list' element={<FestivalList />} />
          <Route path='/festival-detail' element={<FestivalDetail />} />
          <Route
            path='/festival-detail-done'
            element={<FestivalDetailDone />}
          />
          <Route path='/artist-detail' element={<ArtistDetail />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/reservation-result' element={<ReservationResult />} />
          <Route path='/search' element={<Search />} />
          <Route path='/search-result' element={<SearchResult />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
