import React, { useState } from 'react';
import TopPage from './TopPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserPages from './Userpages'; 
import PostPages from './Post'
import DisplayPages from './components/display_post'



const App = () => {
  const currentPage = window.location.pathname;

  return (
    <div>
      {currentPage === '/' && <TopPage />}
      {currentPage === '/user-page' && <UserPages />}
      {currentPage === '/post-page' && <PostPages />}
      {currentPage === '/display-page' && <DisplayPages />}

    </div>
  );
};
export default App;