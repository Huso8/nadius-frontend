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
import { useUsers, useDeleteUser } from '../../services/api';

const Users: React.FC = () => {
	const { data: users = [], isLoading, error } = useUsers();
	const deleteUser = useDeleteUser();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<string | null>(null);

	const handleDeleteClick = (userId: string) => {
		setSelectedUser(userId);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (selectedUser) {
			try {
				await deleteUser.mutateAsync(selectedUser);
				setDeleteDialogOpen(false);
				setSelectedUser(null);
			} catch (error) {
				console.error('Error deleting user:', error);
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
				<Alert severity="error">Ошибка при загрузке пользователей</Alert>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Управление пользователями
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Имя</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Роль</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<IconButton
										color="error"
										onClick={() => handleDeleteClick(user.id)}
										disabled={user.role === 'admin'}
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
						Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.
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

export default Users; 