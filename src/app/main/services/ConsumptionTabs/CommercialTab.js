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


function CommercialTab(props) {
	const methods = useFormContext();
	const { control } = methods;

	return (
		<div>
			<div className="flex mx-4 -mx-4">
				<Typography variant="subtitle1" className="py-16 font-semibold mr-8 mx-4">
					Slab1
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
					to
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
				<Typography variant="subtitle1" className="py-16 font-semibold mx-4 ml-40 mr-8 mx-4">
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
