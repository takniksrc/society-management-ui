import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigurations } from 'app/fuse-configs/store/configSlice';

function CommercialTab(props) {
	const methods = useFormContext();
	const dispatch = useDispatch();
	const configurationsData = useSelector(({ configSlice }) => configSlice);

	const { control } = methods;
	const [selectedCategory, setSelectedCategory] = useState('flat');
	const categories = [
		{ id: 1, value: 'flat', label: 'Flat', color: '#2196f3' },
		{ id: 2, value: 'plaza', label: 'Plaza', color: '#2196f3' }
	];
	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}
	useEffect(() => {
		dispatch(getConfigurations());
	}, []);
	return (
		<div>
			<motion.div
				className="flex flex-wrap py-24"
				// variants={container}
				initial="hidden"
				animate="show"
			>
				{configurationsData?.customer_types
					? configurationsData?.customer_types.map(ct => {
							console.log('ct', ct);

							return (
								<>
									{ct.name === 'Commercial' &&
										ct.property_types.map(pt => {
											console.log('pt', pt);

											return (
												<>
													<motion.div className="w-full pb-24  sm:p-16">
														<Card className="flex flex-col h-auto shadow h-fit">
															<div
																className="flex flex-shrink-0 items-center justify-between px-24 h-64"
																style={
																	{
																		// background: category.color,
																		// color: theme.palette.getContrastText(category.color)
																	}
																}
															>
																<Typography
																	className="font-medium truncate"
																	color="inherit"
																>
																	{pt.name}
																</Typography>
															</div>
															<CardContent className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 flex-auto items-center justify-center h-fit flex h-auto">
																{pt.property_sizes.map(ps => {
																	console.log('ps 23', ps.name);
																	return (
																		<>
																			

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
																	);
																})}
															</CardContent>
														</Card>
													</motion.div>
												</>
											);
										})}
								</>
							);
					  })
					: null}
			</motion.div>
			{/* <FormControl className="flex w-full sm:w-320 -mx-4 mt-8 mb-16 ml-px" variant="outlined">
				<InputLabel htmlFor="category-label-placeholder"> Property Type </InputLabel>
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
					
					{categories.map(category => (
						<MenuItem value={category.value} key={category.id}>
							{category.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<div className="flex mx-4 -mx-4 mt-24">
				<Controller
					name="fivemarlacommercial"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="5 Marla"
							autoFocus
							id="fivemarlacommercial"
							variant="outlined"
							fullWidth
						/>
					)}
				/>

				<Controller
					name="sevenmarlacommercial"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="7 Marla"
							id="sevenmarlacommercial"
							variant="outlined"
							fullWidth
						/>
					)}
				/>

				<Controller
					name="tenmarlacommercial"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="10 Marla"
							id="tenmarlacommercial"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
			</div> */}
			{/* <div className="flex mx-4 -mx-4 mt-12">
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
			</div> */}
		</div>
	);
}

export default CommercialTab;
