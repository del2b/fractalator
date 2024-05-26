import React, { useEffect, useState } from 'react';
import useWindowDimensions from './UseWindowDimensions';
import Canvas from './Canvas';

const xmin = -2.00;
const xmax =  0.47;	
const bx = xmin;
const ymin = -1.12;
const ymax =  1.12; 
const by = ymin;
const itmax = 255;

const defaultDims = {
	xl: xmin,
	xr: xmax,
	yt: ymax,
	yb: ymin,
};

const step = 0.1;


export default function Base() {

	const [dims, setDims] = useState(defaultDims);
	const { scrW, scrH } = useWindowDimensions();

	const aspectRatio = (dims.xr - dims.xl) / (dims.yt - dims.yb);
	const drawW = scrW - 20;
	const drawH = scrH - 70;
	var plotW, plotH;		
	if(drawW > drawH * aspectRatio) {
		plotW = (drawH * aspectRatio);
		plotH = drawH;
	} else {
		plotW = drawW;
		plotH = drawW / aspectRatio;
	}


	const zoomIn = () => {
		const xjump = (dims.xr - dims.xl) * step; 
		const yjump = (dims.yt - dims.yb) * step; 
		const newDims = {
			xl: dims.xl + xjump,
			xr: dims.xr - xjump,
			yt: dims.yt - yjump, 
			yb: dims.yb + yjump,	
		};			
		setDims(newDims);
	};

	const zoomOut = () => {
		const xjump = (dims.xr - dims.xl) * step; 
		const yjump = (dims.yt - dims.yb) * step; 
		const newDims = {
			xl: dims.xl - xjump,
			xr: dims.xr + xjump,
			yt: dims.yt + yjump,
			yb: dims.yb - yjump,
		};			
		setDims(newDims);
	};

	const right = () => {
		const jump = (dims.xl - dims.xr) * step;
		const newDims = {
			xl: dims.xl - jump,
			xr: dims.xr - jump,
			yt: dims.yt,
			yb: dims.yb	
		};			
		setDims(newDims);
	};

	const left = () => {
		const jump = (dims.xl - dims.xr) * step;
		const newDims = {
			xl: dims.xl + jump,
			xr: dims.xr + jump,
			yt: dims.yt,
			yb: dims.yb	
		};			
		setDims(newDims);
	};

	const down = () => {
		const jump = (dims.yt - dims.yb) * step;
		const newDims = {
			xl: dims.xl,
			xr: dims.xr,
			yt: dims.yt + jump,
			yb: dims.yb + jump,	
		};			
		setDims(newDims);
	};

	const up = () => {
		const jump = (dims.yt - dims.yb) * step;
		const newDims = {
			xl: dims.xl,
			xr: dims.xr,
			yt: dims.yt - jump,
			yb: dims.yb	- jump 
		};			
		setDims(newDims);
	};



	const numPx = plotW * plotH;
	console.log('Width: ' + numPx);
	
	plotW = Number.isNaN(plotW) ? 1 : plotW;
	plotH = Number.isNaN(plotH) ? 1 : plotH;


	const marge = (scrW / 2.0) - (plotW / 2.0);
	return (
		<div >
			<Canvas 
				width={plotW} 
				height={plotH} 
				marge={marge}
				xmin={dims.xl}
				xmax={dims.xr}
				ymin={dims.yb}
				ymax={dims.yt}
			/>
			<p>	
				xmin={dims.xl.toPrecision(4)} 
				xmax={dims.xr.toPrecision(4)} 
				ymin={dims.yt.toPrecision(4)} 
				ymax={dims.yb.toPrecision(4)}
				<button onClick={zoomIn} >In</button>
				<button onClick={zoomOut} >Out</button>
				<button onClick={left} >left</button>
				<button onClick={right}>right</button>
				<button onClick={up} >up</button>
				<button onClick={down}>down</button>
			</p>
		</div>
	);
}
