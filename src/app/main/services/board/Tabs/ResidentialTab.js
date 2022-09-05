import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';

import Select from '@material-ui/core/Select';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigurations } from 'app/fuse-configs/store/configSlice';

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	}
}));
function ResidentialTab(props) {
	const methods = useFormContext();
	const dispatch = useDispatch();
	const configurationsData = useSelector(({ configSlice }) => configSlice);
	const theme = useTheme();
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
			{/* <FormControl className="flex w-full sm:w-320 -mx-4 mt-8 mb-16 ml-px" variant="outlined">
				
				{configurationsData?.customer_types ? (
					configurationsData?.customer_types.map(ct => {
						console.log('ct in up', ct);
						
						return (
							<>
								{ct.name === 'Residential' &&
									ct.property_types.map(pt => {
										return <>{pt.name}</>;
									})}
							</>
						);
					})
				) : (
					<h2>Residential</h2>
				)}
			</FormControl> */}
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
									{ct.name === 'Residential' &&
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
																			{/* <h3>{ps.name.replace(/ /g, '_')}</h3> */}

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
