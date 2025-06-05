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
		<Box
			sx={{
				width: width || '100%',
				height: height || 'auto',
				position: 'relative',
				...style,
			}}
		>
			{!isLoaded && (
				<Skeleton
					variant="rectangular"
					width="100%"
					height="100%"
					animation="wave"
				/>
			)}
			<img
				src={src}
				alt={alt}
				loading="lazy"
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'contain',
					opacity: isLoaded ? 1 : 0,
					transition: 'opacity 0.3s ease-in-out',
				}}
				className={className}
			/>
		</Box>
	);
};

export default OptimizedImage; 