import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterInfo from './pages/RegisterInfo';
import Home from './pages/Home';
import FestivalList from './pages/FestivalList';
import FestivalDetail from './pages/FestivalDetail';
import Notfound from './pages/Notfound';
import './index.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='bg-blue-500 text-white p-4'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Regist' element={<RegisterInfo />} />
          <Route path='/FestivalList' element={<FestivalList />} />
          <Route path='/FestivalDetail' element={<FestivalDetail />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
