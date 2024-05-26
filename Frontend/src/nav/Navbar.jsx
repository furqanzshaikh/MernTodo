import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <h1><Link to={'/'}>Todo</Link></h1>
      {location.pathname !== "/add" && <button><Link to="/add">Create Task</Link></button>}
    </nav>
  );
};

export default Navbar;
