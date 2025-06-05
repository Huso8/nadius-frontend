import React, { useState } from 'react';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
	Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReviews } from '../../services/api';

const Reviews: React.FC = () => {
	const { data: reviews = [], isLoading, error } = useReviews('all');
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedReview, setSelectedReview] = useState<string | null>(null);

	const handleDeleteClick = (reviewId: string) => {
		setSelectedReview(reviewId);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (selectedReview) {
			try {
				// TODO: Добавить функцию удаления отзыва
				setDeleteDialogOpen(false);
				setSelectedReview(null);
			} catch (error) {
				console.error('Error deleting review:', error);
			}
		}
	};

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ p: 3 }}>
				<Alert severity="error">Ошибка при загрузке отзывов</Alert>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Управление отзывами
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Пользователь</TableCell>
							<TableCell>Товар</TableCell>
							<TableCell>Оценка</TableCell>
							<TableCell>Комментарий</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reviews.map((review) => (
							<TableRow key={review._id}>
								<TableCell>{review._id}</TableCell>
								<TableCell>{review.user?.name || 'Аноним'}</TableCell>
								<TableCell>{review.product}</TableCell>
								<TableCell>{review.rating}</TableCell>
								<TableCell>{review.comment}</TableCell>
								<TableCell>
									<IconButton
										color="error"
										onClick={() => handleDeleteClick(review._id)}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
				<DialogTitle>Подтверждение удаления</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите удалить этот отзыв? Это действие нельзя отменить.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)}>Отмена</Button>
					<Button onClick={handleDeleteConfirm} color="error" variant="contained">
						Удалить
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Reviews; 