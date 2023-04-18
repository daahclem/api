import React from 'react';
import MarvelLogo from '../img/Marvel_Logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" />
      </div>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img className="logo" src={MarvelLogo} alt="Marvel" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
