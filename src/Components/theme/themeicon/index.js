import React from 'react';
import './style.css';
import { useThemeContext } from 'Components/theme';

const LightDarkMode = () => {
  //? 1 for dark mode and 0 for light mode
  const { toggleDarkMode, themeMode } = useThemeContext();

  const handleChange = (e) => {
    toggleDarkMode(e.target.checked);
  };

  return (
    <div className='toggleWrapper'>
      <input
        type='checkbox'
        className='dn'
        id='dn'
        name='theme'
        checked={themeMode}
        onChange={handleChange}
      />
      <label htmlFor='dn' className='toggle'>
        <span className='toggle__handler'>
          <span className='crater crater--1'></span>
          <span className='crater crater--2'></span>
          <span className='crater crater--3'></span>
        </span>
        <span className='star star--1'></span>
        <span className='star star--2'></span>
        <span className='star star--3'></span>
        <span className='star star--4'></span>
        <span className='star star--5'></span>
        <span className='star star--6'></span>
      </label>
    </div>
  );
};

export default LightDarkMode;
