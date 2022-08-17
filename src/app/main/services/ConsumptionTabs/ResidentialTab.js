import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { useEffect, useMemo, useState } from 'react';

function ResidentialTab(props) {
	const methods = useFormContext();
	const { control } = methods;
	const [selectedCategory, setSelectedCategory] = useState('all');
	const categories = [
		{ id: 0, value: 'house', label: 'House', color: '#2196f3' },
		{ id: 1, value: 'plot', label: 'Plot', color: '#2196f3' },
		{ id: 2, value: 'flat', label: 'Flat', color: '#2196f3' }
	];
	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	return (
		<div>
			<div className="flex mx-4 -mx-4">
				<Controller
					name="priceTaxExcl"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Tax Excluded Price"
							id="priceTaxExcl"
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
							type="number"
							variant="outlined"
							autoFocus
							fullWidth
						/>
					)}
				/>

				<Controller
					name="priceTaxIncl"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Tax Included Price"
							id="priceTaxIncl"
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
							type="number"
							variant="outlined"
							fullWidth
						/>
					)}
				/>

				<Controller
					name="taxRate"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Tax Rate"
							id="taxRate"
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>
							}}
							type="number"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default ResidentialTab;
