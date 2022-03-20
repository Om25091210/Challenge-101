// import React, { useCallback, useEffect, useState } from 'react';
// import { setCookieValue, getCookieValue } from '../../utils/helpers';

// import themeOptions from './theme-options';

// const DarkMode = React.memo(() => {
// 	const [theme, setTheme] = useState(themeOptions.LIGHT);
// 	const themeSelected = themeOptions[theme] || themeOptions.LIGHT;

//    	const themeSel = themeSelected === 'dark' ? 'LIGHT' : 'DARK';

//     const handleDarkMode = useCallback(() => {
// 		const val = themeSelected === 'dark' ? 'LIGHT' : 'DARK';

// 		setCookieValue('g-theme', val, 2147483647, '/');
// 		setTimeout(() => {
// 			global.window.location.reload();
// 			return false;
// 		}, 0);
// 	}, [theme]);

//     useEffect(() => {
//         setTheme(getCookieValue('g-theme'));
// 	}, []);

// 	return (

// <button onClick={handleDarkMode} style={{ position: 'fixed', bottom:'10px',left:'10px',
//   textTransform: 'capitalize',background: '#1a191d' , color: '#fff' ,padding: '10px', borderRadius: '10px',fontSize: '12px'}}>
//   switch {themeSel}</button>

// 	);
// });

// export default DarkMode;

import React, { useCallback, useEffect, useState } from 'react';

const DarkMode = () => {
  const [darktheme, setDarktheme] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);


 const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.theme : "DarkPage"
  );

  const colorTheme = theme === "DarkPage" ? "light" : "DarkPage";


  const LightTheme = (e) => {
    const root = window.document.documentElement;    
    e.preventDefault();
    $('body').removeClass(colorTheme);
    $('.logo').removeClass('bigwidth');
    setDarktheme(false);
  };

  const Darktheme = (e) => {
    const root = window.document.documentElement;        
    e.preventDefault();
    $('body').addClass(colorTheme);
    $('.logo').removeClass('bigwidth');
    setDarktheme(true);
  };

  return (
    <>
      { !darktheme ? (
        <>
          <button onClick={Darktheme} className="theme_btn">
            <span> Dark</span>
          </button>
        </>
      ) : (
        <button onClick={LightTheme} className="theme_btn light_thmeme">
          <span> Light</span>
        </button>
      )}
    </>
  );
};

export default DarkMode;
