import React, { useCallback, useEffect, useState } from 'react';
import { setCookieValue, getCookieValue } from '../../utils/helpers';

import themeOptions from '../../components/theme/theme-options';

const DarkMode = React.memo(() => {
	const [theme, setTheme] = useState(themeOptions.LIGHT);
	const themeSelected = themeOptions[theme] || themeOptions.LIGHT;
   	
   	const themeSel = themeSelected === 'dark' ? 'LIGHT' : 'DARK';

    const handleDarkMode = useCallback(() => {
		const val = themeSelected === 'dark' ? 'LIGHT' : 'DARK';

		setCookieValue('g-theme', val, 2147483647, '/');
		setTimeout(() => {
			global.window.location.reload();
			return false;
		}, 0);
	}, [theme]);
    
    useEffect(() => {
        setTheme(getCookieValue('g-theme'));
	}, []);

	return (

<button onClick={handleDarkMode} style={{ position: 'fixed', bottom:'10px',left:'10px',
  textTransform: 'capitalize',background: '#1a191d' , color: '#fff' ,padding: '10px', borderRadius: '10px',fontSize: '12px'}}>
  switch {themeSel}</button>

	);
});


export default DarkMode;
