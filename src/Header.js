import React from 'react';
import homeIcon from './images/home_icon.png';
import searchIcon from './images/search_icon.png';
import userIcon from './images/user_icon.png';
import './styles.css';

const Header = () => {
  return (
    <div className="header">
      <div className="left-icons">
        <a href="/"> {/* トップページに戻るリンク */}
          <img src={homeIcon} alt="Home" className="header-icon"/>
        </a>
        <img src={searchIcon} alt="Search" className="header-icon"/>
        <input type="text" placeholder="Search" className="search-bar"/>
      </div>
      <h1 className="small-text">GitDate-plan</h1>
      <a href="/user-page">
        <img className="user-icon" src={userIcon} alt="user" />
      </a>
    </div>
  );
};

export default Header;
