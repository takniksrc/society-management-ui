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
import { RESIDENTIAL } from 'app/fuse-configs/constants';

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
	console.log('Fields in Residenatial ReportsTemplates tab', fields);
	return (
		<div>
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
						<Typography className="font-medium truncate" color="inherit">
							Plot
						</Typography>
					</div>
					<CardContent className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 flex-auto items-center justify-center h-fit flex h-auto">
						{fields?.map((propertySize, propertySizeIndex) => {
							console.log('sp in ReportsTemplates', propertySize);

							return (
								propertySize?.customer_type === RESIDENTIAL &&
								propertySize?.property_size?.name.includes('Plot') && (
									<Controller
										name={`servicePricing[${propertySizeIndex}].price_per_unit`}
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												className="mt-8 mb-16 mx-4"
												label={propertySize.property_size.name}
												autoFocus
												// id={}
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								)
							);
						})}
					</CardContent>
				</Card>
			</motion.div>

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
						<Typography className="font-medium truncate" color="inherit">
							House
						</Typography>
					</div>
					<CardContent className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 flex-auto items-center justify-center h-fit flex h-auto">
						{fields?.map((propertySize, propertySizeIndex) => {
							console.log('sp in ReportsTemplates', propertySize);

							return (
								propertySize?.customer_type === RESIDENTIAL &&
								propertySize?.property_size?.name.includes('House') && (
									<Controller
										name={`servicePricing[${propertySizeIndex}].price_per_unit`}
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												className="mt-8 mb-16 mx-4"
												label={propertySize.property_size.name}
												autoFocus
												// id={}
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								)
							);
						})}
					</CardContent>
				</Card>
			</motion.div>

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
						<Typography className="font-medium truncate" color="inherit">
							Flat
						</Typography>
					</div>
					<CardContent className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 flex-auto items-center justify-center h-fit flex h-auto">
						{fields?.map((propertySize, propertySizeIndex) => {
							console.log('sp in ReportsTemplates', propertySize);

							return (
								propertySize?.customer_type === RESIDENTIAL &&
								propertySize?.property_size?.name.includes('Flat') && (
									<Controller
										name={`servicePricing[${propertySizeIndex}].price_per_unit`}
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												className="mt-8 mb-16 mx-4"
												label={propertySize.property_size.name}
												autoFocus
												// id={}
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								)
							);
						})}
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}

export default ResidentialTab;
