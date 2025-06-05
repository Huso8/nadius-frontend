import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton, InputBase, Paper, List, ListItem, ListItemButton, ListItemText, Menu } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types';
import debounce from 'lodash/debounce';

interface SearchBarProps {
	products: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ products }) => {
	const [search, setSearch] = useState('');
	const [focused, setFocused] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [searchMenuAnchor, setSearchMenuAnchor] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();

	const debouncedFilter = useCallback(
		debounce((query: string) => {
			if (!query.trim()) {
				setFilteredProducts([]);
				return;
			}
			const filtered = products.filter((product: Product) =>
				product.name.toLowerCase().includes(query.toLowerCase()) ||
				product.description?.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredProducts(filtered.slice(0, 5));
		}, 300),
		[products]
	);

	useEffect(() => {
		debouncedFilter(search);
		return () => {
			debouncedFilter.cancel();
		};
	}, [search, debouncedFilter]);

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (search.trim()) {
			navigate(`/search?q=${encodeURIComponent(search.trim())}`);
			setSearch('');
			setSearchMenuAnchor(null);
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSelectProduct = (productName: string) => {
		setSearch(productName);
		navigate(`/search?q=${encodeURIComponent(productName)}`);
		setSearchMenuAnchor(null);
	};

	const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
		setSearchMenuAnchor(event.currentTarget);
	};

	const handleSearchMenuClose = () => {
		setSearchMenuAnchor(null);
	};

	return (
		<Box sx={{
			display: 'flex',
			alignItems: 'center',
		}}>
			<IconButton color="inherit" onClick={handleSearchClick}>
				<SearchIcon />
			</IconButton>
			<Menu
				anchorEl={searchMenuAnchor}
				open={Boolean(searchMenuAnchor)}
				onClose={handleSearchMenuClose}
				PaperProps={{
					sx: {
						width: 300,
						maxWidth: '100%',
						mt: 1,
						boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
					}
				}}
			>
				<Box sx={{ p: 1 }}>
					<Paper
						component="form"
						onSubmit={handleSearchSubmit}
						sx={{
							p: '2px 4px',
							display: 'flex',
							alignItems: 'center',
							border: '1px solid rgba(0,0,0,0.1)',
							'&:hover': {
								border: '1px solid rgba(0,0,0,0.2)'
							}
						}}
					>
						<InputBase
							sx={{
								ml: 1,
								flex: 1,
								'& input': {
									padding: '8px 0'
								}
							}}
							placeholder="Поиск..."
							value={search}
							onChange={handleSearchChange}
							onFocus={() => setFocused(true)}
							onBlur={() => setTimeout(() => setFocused(false), 150)}
							autoFocus
						/>
						<IconButton type="submit" sx={{ p: 1 }}>
							<SearchIcon />
						</IconButton>
					</Paper>
					{(focused || search) && filteredProducts.length > 0 && (
						<List sx={{
							maxHeight: 300,
							overflowY: 'auto',
							mt: 1,
							border: '1px solid rgba(0,0,0,0.1)',
							borderRadius: 1
						}}>
							{filteredProducts.map(product => (
								<ListItem key={product._id} disablePadding>
									<ListItemButton
										onMouseDown={() => handleSelectProduct(product.name)}
										sx={{
											'&:hover': {
												backgroundColor: 'rgba(0,0,0,0.04)'
											}
										}}
									>
										<ListItemText
											primary={product.name}
											primaryTypographyProps={{
												noWrap: true,
												style: { fontSize: '14px' }
											}}
										/>
									</ListItemButton>
								</ListItem>
							))}
						</List>
					)}
				</Box>
			</Menu>
		</Box>
	);
};

export default SearchBar; 