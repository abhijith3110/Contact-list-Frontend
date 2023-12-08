import React from 'react';
import { useSelector } from "react-redux";
import './Header.css';

const Header = () => {
  const { total } = useSelector((state) => state.contacts);
  return (
    <div className='contact-list-header'>
      <div>
      <h1>Contact List</h1>
      </div>
      <div className='contactLength'>
      <p>({total})</p>
      </div>
    </div>
  );
};

export default Header;


