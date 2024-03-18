import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <div className='p-2 h-full flex flex-col items-center'>
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
