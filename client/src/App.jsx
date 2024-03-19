import { useState } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import RegisterInfo from './pages/RegisterInfoPage';
import Home from './pages/HomePage';
import FestivalList from './pages/FestivalListPage';
import FestivalDetail from './pages/FestivalDetailPage';
import Notfound from './pages/NotfoundPage';
import Google_Login from './components/start/Google_login';
import ArtistDetail from './pages/ArtistDetailPage';
import Reservation from './pages/ReservationPage';
import ReservationResult from './pages/ReservationResultPage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col h-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/google-login' element={<Google_Login />} />
          <Route path='/regist' element={<RegisterInfo />} />
          <Route path='/' element={<Home />} />
          <Route path='/FestivalList' element={<FestivalList />} />
          <Route
            path='/FestivalDetail'
            element={<FestivalDetail />}
          />
          <Route
            path='/artistDetail'
            element={<ArtistDetail />}
          />
          <Route
            path='/reservation'
            element={<Reservation />}
          />
          <Route
            path='/reservationResult'
            element={<ReservationResult />}
          />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
