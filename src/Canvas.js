import React, { useRef, useEffect } from 'react';

const getStyle = (marge) => {
	return {
		border: '1px solid #000000',
		marginLeft: `${marge}px`,
	};
};

const sleep = ms => new Promise(r => setTimeout(r, ms)); 

const itmax = 255;

// check if the point at x0, y0 is in the Mandelbrot set.
const inSet = (x0, y0) => {
	let x = 0;
	let y = 0;
	let it = 0;

	while (x*x + y*y <= 4.00 && it < itmax) {
		const tmp = x*x - y*y + x0;
		y = 2*x*y + y0;
		x = tmp;
		it++;
	}
	return it;
};

const shuffle = (arr) => {
	for(let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
};

const getPixArr = (h, w) => {
	const pixels = [];
	for(let x = 0; x < w; x++) {
		for(let y = 0; y < h; y++) {
			pixels.push([x, y]);	
		}
	}
	shuffle(pixels);
	return pixels;
};

export default function Canvas({
	width, 
	height, 
	marge,
	xmin,
	xmax,
	ymin,
	ymax
}) {

	const w = Number.isNaN(width) ? 0 : width;
	const h = Number.isNaN(height) ? 0 : height;

	const canRef = useRef(null);

	const mx = ( xmax - xmin ) / w;
	const my = ( ymax - ymin ) / h; 

	const bx = xmin;
	const by = ymin;

	useEffect(() => {
		const can = canRef.current;
		const ctx = can.getContext('2d');

		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
		const rend = async () => {	
			const pixels = getPixArr(height, width);	
			let i = 0;
			let chunk = 500;
			for(const [pxx, pxy] of pixels) {
				i++;
				const y = ( my * pxy ) + by;
				const x = ( mx * pxx ) + bx;
				const color = inSet(x,y);
				const id = ctx.createImageData(1,1);
				const d  = id.data;

				d[0] = color - 255;	
				d[1] = color - 255;	
				d[2] = 255 - color;	
				d[3] = 255;
				ctx.putImageData(id, pxx, pxy);			
				if(i > chunk) {
					await sleep(1);
					i = 0;
				}
			}
		}

		rend();
	}, [width, height, xmin, xmax, ymin, ymax]);

	const sty = getStyle(marge);
	console.dir(sty);
	return (
		<div>
			<canvas 
				ref={canRef}
				height={h} 
				width={w}
				style={sty}
			></canvas>
		</div>
	);
};

