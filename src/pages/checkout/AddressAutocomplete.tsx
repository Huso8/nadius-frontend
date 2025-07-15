import React from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { AddressSuggestion, OrderFormData, FormErrors } from './useCheckoutForm';

interface AddressAutocompleteProps {
	formData: OrderFormData;
	addressSuggestions: AddressSuggestion[];
	selectedAddress: AddressSuggestion | null;
	handleAddressInputChange: (event: React.SyntheticEvent, value: string) => void;
	handleAddressSelect: (event: React.SyntheticEvent, value: string | AddressSuggestion | null) => void;
	loading: boolean;
	errors: FormErrors;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
	formData,
	addressSuggestions,
	handleAddressInputChange,
	handleAddressSelect,
	loading,
	errors
}) => (
	<Autocomplete
		freeSolo
		options={addressSuggestions}
		getOptionLabel={(option) => {
			if (typeof option === 'string') return option;
			if (option.description) return option.label + ', ' + option.description;
			return option.label;
		}}
		getOptionKey={(option) => typeof option === 'string' ? option : option.label + option.coordinates.lat + option.coordinates.lon}
		value={null}
		inputValue={formData.address}
		onInputChange={handleAddressInputChange}
		onChange={handleAddressSelect}
		loading={loading}
		filterOptions={(options) => options}
		renderInput={(params) => (
			<TextField
				{...params}
				label="Адрес доставки"
				name="address"
				required
				error={!!errors.address}
				helperText={errors.address}
				InputProps={{
					...params.InputProps,
					endAdornment: (
						<>
							{loading ? <CircularProgress color="inherit" size={20} /> : null}
							{params.InputProps.endAdornment}
						</>
					),
				}}
			/>
		)}
	/>
);

export default AddressAutocomplete; 