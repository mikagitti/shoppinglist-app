
import React, { useContext } from 'react';
import ThemeContext from '../../Context/Theme/ThemeContext';

export default function ThemeComponent() {
  
    const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      Current theme: {theme}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};


