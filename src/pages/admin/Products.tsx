import React, { useState } from 'react';
import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	IconButton,
	Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../services/api';
import { Product } from '../../types';

const Products: React.FC = () => {
	const { data: products, isLoading } = useProducts();
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const deleteProduct = useDeleteProduct();

	const [open, setOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [productData, setProductData] = useState<Omit<Product, '_id'>>({
		name: '',
		description: '',
		price: 0,
		image: '',
		category: '',
		available: true
	});

	const handleOpen = (product?: Product) => {
		if (product) {
			setSelectedProduct(product);
			setProductData({
				name: product.name,
				description: product.description,
				price: product.price,
				image: product.image,
				category: product.category,
				available: product.available
			});
		} else {
			setSelectedProduct(null);
			setProductData({
				name: '',
				description: '',
				price: 0,
				image: '',
				category: '',
				available: true
			});
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedProduct(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const updatedProductData = {
			...productData,
			price: parseFloat(productData.price.toString()),
		};

		try {
			if (selectedProduct) {
				await updateProduct.mutateAsync({
					_id: selectedProduct._id,
					...updatedProductData,
					available: updatedProductData.available ?? true
				});
			} else {
				await createProduct.mutateAsync({
					...updatedProductData,
					available: updatedProductData.available ?? true
				});
			}
			handleClose();
		} catch (error) {
			console.error('Error saving product:', error);
		}
	};

	const handleDelete = async (id: string) => {
		if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
			try {
				await deleteProduct.mutateAsync(id);
			} catch (error) {
				console.error('Error deleting product:', error);
			}
		}
	};

	if (isLoading) {
		return <Typography>Загрузка...</Typography>;
	}

	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
				<Typography variant="h4">Управление товарами</Typography>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => handleOpen()}
				>
					Добавить товар
				</Button>
			</Box>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Изображение</TableCell>
							<TableCell>Название</TableCell>
							<TableCell>Описание</TableCell>
							<TableCell>Цена</TableCell>
							<TableCell>Категория</TableCell>
							<TableCell>Действия</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products?.map((product) => (
							<TableRow key={product._id}>
								<TableCell>
									<img
										src={product.image}
										alt={product.name}
										style={{ width: 50, height: 50, objectFit: 'cover' }}
									/>
								</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell>{product.price} ₽</TableCell>
								<TableCell>{product.category}</TableCell>
								<TableCell>
									<IconButton onClick={() => handleOpen(product)}>
										<EditIcon />
									</IconButton>
									<IconButton onClick={() => handleDelete(product._id)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogTitle>
					{selectedProduct ? 'Редактировать товар' : 'Добавить товар'}
				</DialogTitle>
				<form onSubmit={handleSubmit}>
					<DialogContent>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Название"
									value={productData.name}
									onChange={(e) =>
										setProductData({ ...productData, name: e.target.value })
									}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Описание"
									value={productData.description}
									onChange={(e) =>
										setProductData({ ...productData, description: e.target.value })
									}
									multiline
									rows={3}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Цена"
									type="number"
									value={productData.price}
									onChange={(e) =>
										setProductData({ ...productData, price: parseFloat(e.target.value) })
									}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="URL изображения"
									value={productData.image}
									onChange={(e) =>
										setProductData({ ...productData, image: e.target.value })
									}
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Категория"
									value={productData.category}
									onChange={(e) =>
										setProductData({ ...productData, category: e.target.value })
									}
									required
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Отмена</Button>
						<Button type="submit" variant="contained">
							{selectedProduct ? 'Сохранить' : 'Добавить'}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Box>
	);
};

export default Products; 