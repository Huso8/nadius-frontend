import React, { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

interface OptimizedImageProps {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
	style?: React.CSSProperties;
	className?: string;
}

const PLACEHOLDER = '/icon.jpg';

const OptimizedImage: React.FC<OptimizedImageProps> = ({
	src,
	alt,
	width,
	height,
	style,
	className,
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsLoaded(false);
		setError(false);
		const img = new window.Image();
		img.src = src;
		img.onload = () => setIsLoaded(true);
		img.onerror = () => setError(true);
	}, [src]);

	const displaySrc = error ? PLACEHOLDER : src;
	const displayAlt = error ? 'Нет фото' : alt;

	return (
		<Box
			sx={{
				width: width || '100%',
				height: height || 'auto',
				position: 'relative',
				...style,
			}}
		>
			{!isLoaded && !error && (
				<Skeleton
					variant="rectangular"
					width="100%"
					height="100%"
					animation="wave"
				/>
			)}
			<img
				src={displaySrc}
				alt={displayAlt}
				loading="lazy"
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'contain',
					opacity: isLoaded || error ? 1 : 0,
					transition: 'opacity 0.3s ease-in-out',
				}}
				className={className}
			/>
		</Box>
	);
};

export default OptimizedImage; 