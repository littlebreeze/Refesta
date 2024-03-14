import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterInfo from './pages/RegisterInfo';
import Home from './pages/Home';
import FestivalList from './pages/FestivalList';
import FestivalDetail from './pages/FestivalDetail';
import Notfound from './pages/Notfound';
import Google_Login from './components/start/Google_login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/google-login' element={<Google_Login />} />
        <Route path='/Regist' element={<RegisterInfo />} />
        <Route path='/' element={<Home />} />
        <Route path='/FestivalList' element={<FestivalList />} />
        <Route path='/FestivalDetail' element={<FestivalDetail />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
