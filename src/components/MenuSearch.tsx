import React, { useState, useEffect, useCallback } from 'react';
import {
	Box,
	TextField,
	InputAdornment,
	Paper,
	IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Product } from '../types/types';
import debounce from 'lodash/debounce';

interface MenuSearchProps {
	products: Product[];
	onSearchChange?: (filteredProducts: Product[]) => void;
}

const MenuSearch: React.FC<MenuSearchProps> = ({ products, onSearchChange }) => {
	const [search, setSearch] = useState('');

	const debouncedFilter = useCallback(
		debounce((query: string) => {
			if (!query.trim()) {
				onSearchChange?.(products);
				return;
			}
			const filtered = products.filter((product: Product) =>
				product.name.toLowerCase().includes(query.toLowerCase()) ||
				product.description?.toLowerCase().includes(query.toLowerCase())
			);
			onSearchChange?.(filtered);
		}, 300),
		[products, onSearchChange]
	);

	useEffect(() => {
		debouncedFilter(search);
		return () => {
			debouncedFilter.cancel();
		};
	}, [search, debouncedFilter]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleClearSearch = () => {
		setSearch('');
		onSearchChange?.(products);
	};

	return (
		<Box sx={{ mb: 4 }}>
			<Paper
				sx={{
					p: '2px 4px',
					display: 'flex',
					alignItems: 'center',
					border: '1px solid',
					borderColor: 'divider',
					borderRadius: 2,
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
					'&:hover': {
						boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
					},
					'&:focus-within': {
						borderColor: 'primary.main',
						boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
					}
				}}
			>
				<TextField
					fullWidth
					placeholder="Поиск по меню..."
					value={search}
					onChange={handleSearchChange}
					variant="standard"
					InputProps={{
						disableUnderline: true,
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon color="action" />
							</InputAdornment>
						),
						endAdornment: search && (
							<InputAdornment position="end">
								<IconButton
									size="small"
									onClick={handleClearSearch}
									edge="end"
								>
									<ClearIcon fontSize="small" />
								</IconButton>
							</InputAdornment>
						)
					}}
					sx={{
						'& .MuiInputBase-root': {
							padding: '12px 16px',
							fontSize: '16px'
						}
					}}
				/>
			</Paper>
		</Box>
	);
};

export default MenuSearch;
