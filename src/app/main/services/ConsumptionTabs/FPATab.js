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
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion';


function FPATab(props) {
	const methods = useFormContext();
	const { control } = methods;

	return (
		<div>
			<div className="flex mx-4 -mx-4 flex-col lg:flex-row md:flex-row sm:flex-col">
				<Typography variant="subtitle1" className="py-16 font-semibold mr-8 mx-4">
					Start
				</Typography>

				<Controller
					name="priceTaxExcl"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Units"
							id="priceTaxExcl"
							// InputProps={{
							// 	startAdornment: <InputAdornment position="start">$</InputAdornment>
							// }}
							type="number"
							variant="outlined"
							autoFocus
							fullWidth
						/>
					)}
				/>
				<Typography variant="subtitle1" className="py-16 mx-4">
					End
				</Typography>
				<Controller
					name="priceTaxIncl"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Units"
							id="priceTaxIncl"
							// InputProps={{
							// 	startAdornment: <InputAdornment position="start">$</InputAdornment>
							// }}
							type="number"
							variant="outlined"
							fullWidth
						/>
					)}
				/>
				<Typography variant="subtitle1" className="py-16 font-semibold mx-4 mr-8 mx-4 ml-1.5 lg:ml-40 sm:ml-4">
					Price
				</Typography>
				<Controller
					name="taxRate"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Tax Included Price"
							id="taxRate"
							InputProps={{
								startAdornment: <InputAdornment position="start">PKR/Unit</InputAdornment>
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

export default FPATab;
