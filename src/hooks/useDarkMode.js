import { useState, useEffect } from 'react';

export const useDarkMode = (key, initialValue) => {
  let localStorageState;

  try {
    localStorageState = JSON.parse(window.localStorage.getItem(key));
    if (localStorageState === null) localStorageState = initialValue;
  } catch (err) {
    localStorageState = initialValue;
  }

  const [state, setState] = useState(localStorageState);

  useEffect(() => {
    window.localStorage.setItem('theme', state);
  }, [state]);

  return [state, setState];
};
