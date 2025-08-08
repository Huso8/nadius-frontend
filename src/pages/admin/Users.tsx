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
import { User } from '../../types/types';

const Users: React.FC = () => {
	const { data: users = [], isLoading, error } = useUsers();
	const usersList = users as User[];
	const deleteUser = useDeleteUser();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<string | null>(null);
	const [deleteError, setDeleteError] = useState<string | null>(null);

	const handleDeleteClick = (userId: string) => {
		setSelectedUser(userId);
		setDeleteError(null);
		setDeleteDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setDeleteDialogOpen(false);
		setSelectedUser(null);
		setDeleteError(null);
	};

	const handleDeleteSuccess = () => {
		setDeleteDialogOpen(false);
		setSelectedUser(null);
		setDeleteError(null);
	};

	const handleDeleteConfirm = async () => {
		if (selectedUser) {
			try {
				setDeleteError(null);
				await deleteUser.mutateAsync(selectedUser);
				handleDeleteSuccess();
			} catch (error: any) {
				console.error('Error deleting user:', error);
				setDeleteError(error.response?.data?.message || 'Ошибка при удалении пользователя');
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
				<Alert severity="error">
					Ошибка при загрузке пользователей: {error.message}
				</Alert>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Управление пользователями
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Всего пользователей: {usersList.length} | Администраторов: {usersList.filter(u => u.role === 'admin').length} | Обычных пользователей: {usersList.filter(u => u.role === 'user').length}
			</Typography>
			{usersList.length === 0 ? (
				<Paper sx={{ p: 3, textAlign: 'center' }}>
					<Typography variant="h6" color="text.secondary">
						Пользователи не найдены
					</Typography>
					<Typography variant="body2" color="text.secondary">
						В системе пока нет зарегистрированных пользователей
					</Typography>
				</Paper>
			) : (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>Имя</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Телефон</TableCell>
								<TableCell>Роль</TableCell>
								<TableCell>Дата регистрации</TableCell>
								<TableCell>Действия</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{usersList
								.sort((a: User, b: User) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
								.map((user: User) => (
									<TableRow key={user._id}>
										<TableCell>#{user._id.slice(-6)}</TableCell>
										<TableCell>
											<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
												{user.name}
											</Typography>
										</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>
											{user.phone ? (
												<Typography variant="body2" color="text.secondary">
													{user.phone}
												</Typography>
											) : (
												<Typography variant="body2" color="text.secondary">
													Не указан
												</Typography>
											)}
										</TableCell>
										<TableCell>
											<Typography
												variant="body2"
												sx={{
													color: user.role === 'admin' ? 'primary.main' : 'text.secondary',
													fontWeight: user.role === 'admin' ? 'bold' : 'normal'
												}}
											>
												{user.role === 'admin' ? 'Администратор' : 'Пользователь'}
											</Typography>
										</TableCell>
										<TableCell>
											<Typography variant="body2" color="text.secondary">
												{user.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : 'Не указана'}
											</Typography>
										</TableCell>
										<TableCell>
											<IconButton
												color="error"
												onClick={() => handleDeleteClick(user._id)}
												disabled={user.role === 'admin' || deleteUser.isPending}
												title={user.role === 'admin' ? 'Нельзя удалить администратора' : 'Удалить пользователя'}
											>
												{deleteUser.isPending && selectedUser === user._id ? (
													<CircularProgress size={20} />
												) : (
													<DeleteIcon />
												)}
											</IconButton>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			<Dialog open={deleteDialogOpen} onClose={handleCloseDialog}>
				<DialogTitle>Подтверждение удаления</DialogTitle>
				<DialogContent>
					<Typography>
						Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.
					</Typography>
					{deleteError && (
						<Alert severity="error" sx={{ mt: 2 }}>
							{deleteError}
						</Alert>
					)}
					{deleteUser.isPending && (
						<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
							<CircularProgress size={20} sx={{ mr: 1 }} />
							<Typography variant="body2" color="text.secondary">
								Удаление пользователя...
							</Typography>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} disabled={deleteUser.isPending}>
						Отмена
					</Button>
					<Button
						onClick={handleDeleteConfirm}
						color="error"
						variant="contained"
						disabled={deleteUser.isPending}
					>
						{deleteUser.isPending ? 'Удаление...' : 'Удалить'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default Users; 