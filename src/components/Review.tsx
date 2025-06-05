import React from 'react';
import { Review as ReviewType } from '../types';
import { formatDate } from '../utils/dateUtils';
import { StarIcon } from '@heroicons/react/20/solid';

interface ReviewProps {
	review: ReviewType;
}

const Review: React.FC<ReviewProps> = ({ review }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
						{review.user?.name?.charAt(0).toUpperCase() || '?'}
					</div>
					<div className="ml-3">
						<h4 className="text-sm font-medium text-gray-900">{review.user?.name || 'Аноним'}</h4>
						<p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
					</div>
				</div>
				<div className="flex items-center">
					{[...Array(5)].map((_, index) => (
						<StarIcon
							key={index}
							className={`h-5 w-5 ${index < review.rating ? 'text-yellow-400' : 'text-gray-200'
								}`}
						/>
					))}
				</div>
			</div>
			<p className="text-gray-700 mb-4">{review.comment}</p>
			{review.images && review.images.length > 0 && (
				<div className="flex flex-wrap gap-2 max-w-full">
					{review.images.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Фото отзыва ${index + 1}`}
							className="w-16 h-16 object-cover rounded-lg max-w-full"
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Review; 