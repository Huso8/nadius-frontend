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
		const img = new Image();
		img.src = src;
		img.onload = () => setIsLoaded(true);
		img.onerror = () => setError(true);
	}, [src]);

	if (error) {
		return (
			<Box
				sx={{
					width: width || '100%',
					height: height || '200px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#f5f5f5',
					color: '#666',
					...style,
				}}
			>
				Ошибка загрузки изображения
			</Box>
		);
	}

	return (
		<>
			{!isLoaded && (
				<Skeleton
					variant="rectangular"
					width={width}
					height={height}
					animation="wave"
				/>
			)}
			<img
				src={src}
				alt={alt}
				loading="lazy"
				style={{
					...style,
					width,
					height,
					opacity: isLoaded ? 1 : 0,
					transition: 'opacity 0.3s ease-in-out',
				}}
				className={className}
			/>
		</>
	);
};

export default OptimizedImage; 