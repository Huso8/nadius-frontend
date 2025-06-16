import React from 'react';
import { Rating } from '@mui/material';

interface ReviewRatingProps {
	rating: number;
}

const ReviewRating: React.FC<ReviewRatingProps> = ({ rating }) => {
	return (
		<Rating
			value={rating}
			readOnly
			precision={1}
			max={5}
		/>
	);
};

export default ReviewRating; 