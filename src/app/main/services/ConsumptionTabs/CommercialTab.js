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
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion';


function CommercialTab(props) {
	const methods = useFormContext();
	const { control } = methods;
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.consumptionBoard);


	return (
		<div>
			{board?.servicePricing?.map((sp, i) => {
				console.log('I am sp in ct', sp);
				return (
					<>
						{sp.customer_type.name === props.TabType &&
							sp.slabs.map(rp => {
								console.log('I am rp in ct', rp);
								return (
									<>
										<div className="flex mx-4 -mx-4">
											<Typography variant="subtitle1" className="py-16 font-semibold mr-8 mx-4">
												Start
											</Typography>
											{/* {rp.slab_start} */}
											<Controller
												// name={rp ? rp.slab_start : 'usman'}
												name={`${props.TabType}${rp.slab_start}`}
												control={control}
												render={({ field }) => (
													<TextField
														{...field}
														className="mt-8 mb-16 mx-4"
														label='Units'
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
												// name="ResidentialEndUpper"
												name={`${props.TabType}${rp.slab_end}`}
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
											<Typography
												variant="subtitle1"
												className="py-16 font-semibold mx-4 ml-40 mr-8 mx-4"
											>
												Price
											</Typography>
											<Controller
												// name="ResidentialPriceUpper"
												name={`${props.TabType}${rp.price_per_unit}`}
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
			{/* <div className="flex mx-4 -mx-4">
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
			</div> */}
			
		</div>
	);
}

export default CommercialTab;
