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
import { useDispatch, useSelector } from 'react-redux';
import { getConfigurations } from 'app/fuse-configs/store/configSlice';

function ResidentialTab(props) {
	const methods = useFormContext();
	const dispatch = useDispatch();
	const configurationsData = useSelector(({ configSlice }) => configSlice);
	const { control } = methods;
	const [selectedCategory, setSelectedCategory] = useState('');
	const categories = [
		{ id: 0, value: 'house', label: 'House', color: '#2196f3' },
		{ id: 1, value: 'plot', label: 'Plot', color: '#2196f3' },
		{ id: 2, value: 'flat', label: 'Flat', color: '#2196f3' }
	];
	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	useEffect(() => {
		dispatch(getConfigurations());
	}, []);

	return (
		<div>
			<FormControl className="flex w-full sm:w-320 -mx-4 mt-8 mb-16 ml-px" variant="outlined">
				{/* <InputLabel htmlFor="category-label-placeholder"> Property Type </InputLabel> */}
				{configurationsData?.customer_types ? (
					<h2>{configurationsData?.customer_types[1]?.name}</h2>
				) : (
					<h2>Residential</h2>
				)}
			</FormControl>

			{configurationsData?.customer_types[1].property_types
				? configurationsData?.customer_types[1].property_types.map(pt => (
						<>
						
							{pt.property_sizes.map(ps => (
								<>
									<h3>{ps.name.replace(/ /g, '_')}</h3>
									<Controller
										name={ps.name.replace(/ /g, '_')}
										control={control}
										render={({ field }) => (
											<TextField
												// {...field}
												className="mt-8 mb-16 mx-4"
												label={ps.name}
												autoFocus
												// id={ps.name}
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								</>
							))}
						</>
				  ))
				: null}
			{/* 
			<div className="flex mx-4 -mx-4 mt-24">
				<Controller
					name="sevenmarla"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="7 Marla"
							id="sevenmarla"
							variant="outlined"
							fullWidth
						/>
					)}
				/>

				<Controller
					name="tenmarla"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="10 Marla"
							id="tenmarla"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
			</div>
			<div className="flex mx-4 -mx-4 mt-10">
				<Controller
					name="onekanal"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="1 Kanal"
							autoFocus
							id="onekanal"
							variant="outlined"
							fullWidth
						/>
					)}
				/>

				<Controller
					name="twokanal"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="2 Kanal"
							id="twokanal"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
			</div> */}
		</div>
	);
}

export default ResidentialTab;
