import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterInfoPage from './pages/RegisterInfoPage';
import HomePage from './pages/HomePage';
import FestivalListPage from './pages/FestivalListPage';
import FestivalDetailPage from './pages/FestivalDetailPage';
import NotfoundPage from './pages/NotfoundPage';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
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
  );
}

export default App;
