import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';
import RegisterInfo from './pages/RegisterInfoPage';
import Home from './pages/HomePage';
import FestivalList from './pages/FestivalListPage';
import FestivalDetail from './pages/FestivalDetailPage';
import Notfound from './pages/NotfoundPage';
import Google_Login from './components/start/Google_login';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='flex flex-col items-center h-full'>
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
  );
}

export default App;
