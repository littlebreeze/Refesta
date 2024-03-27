import React from 'react';
import { Outlet } from 'react-router-dom';

const SubLayout = () => {
  return (
    <>
      <main className='flex flex-col items-center h-full'>
        <Outlet />
      </main>
    </>
  );
};
export default SubLayout;
