import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterInfoPage from './pages/RegisterInfoPage';
import HomePage from './pages/HomePage';
import FestivalListPage from './pages/FestivalListPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import NotfoundPage from './pages/NotfoundPage';
import Login from './pages/LoginPage';
import RegisterInfo from './pages/RegisterInfoPage';
import Home from './pages/Home';
import FestivalList from './pages/FestivalList';
import FestivalDetail from './pages/FestivalDetail';
import Notfound from './pages/Notfound';
import Google_Login from './components/start/Google_login';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col items-center h-full p-2'>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/Regist' element={<RegisterInfoPage />} />
        <Route path='/FestivalList' element={<FestivalListPage />} />
        <Route path='/FestivalDetail' element={<FestivalDetailPage />} />
        <Route path='*' element={<NotfoundPage />} />
      </Routes>
    </BrowserRouter>
    <div className='flex flex-col items-center h-full p-2'>
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
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
