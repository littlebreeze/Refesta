import React from 'react';
import { Outlet } from 'react-router-dom';

const SubLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default SubLayout;
