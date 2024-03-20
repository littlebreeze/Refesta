import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchInput from '../components/search/SearchInput';

const SearchLayout = () => {
  return (
    <>
      <SearchInput />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default SearchLayout;
