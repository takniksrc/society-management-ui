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
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';

function CommercialTab(props) {
	const methods = useFormContext();
	const { control } = methods;
	const [selectedCategory, setSelectedCategory] = useState('all');
	const categories = [
		{ id: 1, value: 'plot', label: 'Plot', color: '#2196f3' },
		{ id: 2, value: 'flat', label: 'Flat', color: '#2196f3' }
	];
	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	return (
		<div>
			<FormControl className="flex w-full sm:w-320 -mx-4 mt-8 mb-16 ml-px" variant="outlined">
				<InputLabel htmlFor="category-label-placeholder"> Category </InputLabel>
				<Select
					value={selectedCategory}
					onChange={handleSelectedCategory}
					input={
						<OutlinedInput
							labelWidth={'category'.length * 9}
							name="category"
							id="category-label-placeholder"
						/>
					}
				>
					<MenuItem value="all">
						<em> All </em>
					</MenuItem>
					{categories.map(category => (
						<MenuItem value={category.value} key={category.id}>
							{category.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<div className="flex mx-4 -mx-4 mt-24">
				<Controller
					name="5marla"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="5 Marla"
							autoFocus
							id="5marla"
							variant="outlined"
							fullWidth
						/>
					)}
				/>

				<Controller
					name="7marla"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="7 Marla"
							id="7marla"
							variant="outlined"
							fullWidth
						/>
					)}
				/>

				<Controller
					name="10marla"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="10 Marla"
							id="10marla"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
			</div>
			<div className="flex mx-4 -mx-4 mt-12">
				<motion.div
					className="flex"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
				>
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						// onClick={handleSaveProduct}
					>
						Save
					</Button>
					<Button
						className="whitespace-nowrap mx-4"
						variant="contained"
						color="secondary"
						// onClick={handleRemoveProduct}
						startIcon={<Icon className="hidden sm:flex">delete</Icon>}
					>
						Remove
					</Button>
				</motion.div>
			</div>
		</div>
	);
}

export default CommercialTab;
