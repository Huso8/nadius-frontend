import { useState } from 'react';
import {
	Box,
	InputBase,
	IconButton,
	Paper,
	useScrollTrigger
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { BREAKPOINTS } from '../../constants/breakpoints';
import { Product } from '../../types/product';

interface SearchBarProps {
	products: Product[];
}

export const SearchBar = ({ products }: SearchBarProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	});
	const location = useLocation();

	return (
		<Paper
			component="form"
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				width: { xs: '100%', [BREAKPOINTS.MOBILE]: 300 },
				backgroundColor: location.pathname === '/'
					? (trigger ? 'white' : 'rgba(255, 255, 255, 0.15)')
					: 'rgba(255, 255, 255, 0.15)',
				transition: 'all 0.8s ease-in-out'
			}}
		>
			<InputBase
				sx={{
					ml: 1,
					flex: 1,
					'&::placeholder': {
						color: location.pathname === '/'
							? (trigger ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)')
							: 'rgba(255, 255, 255, 0.7)',
						opacity: 1
					},
					transition: 'all 0.8s ease-in-out'
				}}
				placeholder="Поиск..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<IconButton
				type="button"
				sx={{
					p: '10px',
					transition: 'color 0.8s ease-in-out'
				}}
			>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

export default SearchBar; 