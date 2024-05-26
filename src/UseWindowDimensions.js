import React, { useEffect, useState } from 'react';

const getWindowDims = () => {
	const { innerWidth: scrW, innerHeight: scrH } = window;
	return { scrW, scrH };
};

export default function useWindowDimensions() {
	const [winDims, setWinDims] = useState({});
	useEffect(() => {
		setWinDims(getWindowDims);
		const onResize = () => {
			setWinDims(getWindowDims());
		};	
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);
	
	return winDims;
}
