import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
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
	const theme = useTheme();
	const { control } = methods;
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'servicePricing'
	});
	const dispatch = useDispatch();

	const board = useSelector(({ scrumboardApp }) => scrumboardApp.consumptionBoard);
	console.log('Fields in Residenatial board tab', fields);
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
				{fields?.map((propertySize, propertySizeIndex) => {
					console.log('sp in board', propertySize);

					return (
						<>
							{propertySize?.customer_type === 'Residential' && (
								<p>Hello</p>
								// <Controller
								// 	name="abc"
								// 	control={control}
								// 	render={({ field }) => (
								// 		<TextField
								// 			// {...field}
								// 			className="mt-8 mb-16 mx-4"
								// 			label={propertySize.property_size.name}
								// 			autoFocus
								// 			// id={ps.name}
								// 			variant="outlined"
								// 			fullWidth
								// 		/>
								// 	)}
								// />
							)}
						</>
					);
				})}
			</motion.div>
		</div>
	);
}

export default ResidentialTab;
