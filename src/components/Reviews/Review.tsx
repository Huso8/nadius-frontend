import React from 'react';
import { Box, Typography, Rating, Avatar } from '@mui/material';
import { Review as ReviewType } from '../../types/types';
import { formatDate } from '../../utils/dateUtils';

interface ReviewProps {
	review: ReviewType;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
	return (
		<Box sx={{ mb: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
				<Avatar
					sx={{ width: 40, height: 40, mr: 2 }}
					alt={review.user.name}
				>
					{review.user.name[0]}
				</Avatar>
				<Box>
					<Typography variant="subtitle1" component="div">
						{review.user.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{formatDate(review.createdAt)}
					</Typography>
				</Box>
			</Box>
			<Rating value={review.rating} readOnly precision={0.5} />
			<Typography variant="body1" sx={{ mt: 1 }}>
				{review.comment}
			</Typography>
		</Box>
	);
};

export default Review; 