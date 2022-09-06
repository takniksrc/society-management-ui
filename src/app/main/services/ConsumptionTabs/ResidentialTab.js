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
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion';

function ResidentialTab(props) {
	const methods = useFormContext();
	const { control } = methods;
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.consumptionBoard);
	console.log('board in Residentail Tab', board);
	const [residentialTab, setResidentialTab] = useState('');
	console.log('I am props', props);

	return (
		<div>
			{/* <div className="flex mx-4 -mx-4"> */}
			{board?.servicePricing?.map((sp, i) => {
				console.log('I am sp', sp);
				return (
					<>
						{sp.customer_type.name === props.TabType &&
							sp.slabs.map(rp => {
								console.log('I am rp', rp);
								return (
									<>
										<div className="flex mx-4 -mx-4">
											<Typography variant="subtitle1" className="py-16 font-semibold mr-8 mx-4">
												Start
											</Typography>
											{/* {rp.slab_start} */}
											<Controller
												// name={rp ? rp.slab_start : 'usman'}
												name="abc"
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														className="mt-8 mb-16 mx-4"
														label={rp ? rp.slab_start : 'Units'}
														id="ResidentialStart"
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
												name="ResidentialEndUpper"
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														className="mt-8 mb-16 mx-4"
														label={rp ? rp.slab_end : 'Units'}
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
											<Typography
												variant="subtitle1"
												className="py-16 font-semibold mx-4 ml-40 mr-8 mx-4"
											>
												Price
											</Typography>
											<Controller
												name="ResidentialPriceUpper"
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														className="mt-8 mb-16 mx-4"
														label="Tax Included Price"
														id="taxRate"
														InputProps={{
															startAdornment: (
																<InputAdornment position="start">
																	PKR/Unit
																</InputAdornment>
															)
														}}
														type="number"
														variant="outlined"
														fullWidth
													/>
												)}
											/>
										</div>
									</>
								);
							})}
					</>
				);
			})}
			{/* <Typography variant="subtitle1" className="py-16 font-semibold mr-8 mx-4">
					Start
				</Typography>

				<Controller
					name="ResidentialStartUpper"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Units"
							id="ResidentialStart"
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
					name="ResidentialEndUpper"
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
					name="ResidentialPriceUpper"
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
			<div className="flex mx-4 -mx-4">
				<Typography variant="subtitle1" className="py-16 font-semibold mr-8 mx-4">
					Start
				</Typography>

				<Controller
					name="ResidentialStartMiddle"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16 mx-4"
							label="Units"
							id="Residential_Flat_One_Size:"
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
					name="ResidentialEndMiddle"
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
					name="ResidentialPriceMiddle"
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
			<div className="flex mx-4 -mx-4">
				<Typography variant="subtitle1" className="py-16 font-semibold mr-8 mx-4">
					Start
				</Typography>

				<Controller
					name="ResidentialStartBottom"
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
					name="ResidentialEndBottom"
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
					name="ResidentialPriceBottom"
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
				/> */}
			{/* </div> */}
		</div>
	);
}

export default ResidentialTab;
