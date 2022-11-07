import React from 'react';
import Search from '../Search';
import assets from '../../assets';

export default function CustomHeader() {
  return (
    <>
      <header className="header">
        <div className="logo__container">
          <img src={assets.hnLogo} alt="Hacker News Logo" />
        </div>
        <h1 className="hacker__news">
          Search <br /> Hacker News
        </h1>
        <Search />
      </header>
    </>
  );
}
