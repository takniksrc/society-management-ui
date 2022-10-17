import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext, useFieldArray } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion';

function ResidentialTab(props) {
	const methods = useFormContext();
	const { control } = methods;
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'servicePricing'
	});
	const dispatch = useDispatch();

	// const ReportsTemplates = useSelector(({ scrumboardApp }) => scrumboardApp.consumptionBoard);
	const board = useSelector(state => state.consumptionBoard);

	return (
		<div>
			<Typography variant="subtitle2" className="py-16 font-light mr-8 mx-4 text-green-400">
				* (The units of end slabs must be one less then the next start slab)
			</Typography>
			{/* <div className="flex mx-4 -mx-4"> */}
			{fields.map((sp, spIndex) => {
				console.log('I am sp', sp);
				return (
					<>
						{sp.customer_type.name === props.TabType &&
							sp.slabs
								.sort((a, b) => a.slab_start - b.slab_start)
								.map((rp, index) => {
									console.log('I am rp', rp);
									return (
										<>
											<div className="flex mx-4 -mx-4 flex-col lg:flex-row md:flex-row sm:flex-col">
												<Typography
													variant="subtitle1"
													className="py-16 font-semibold mr-8 mx-4"
												>
													Start
												</Typography>
												{/* {rp.slab_start} */}
												<Controller
													name={`servicePricing[${spIndex}].slabs[${index}].slab_start`}
													control={control}
													render={({ field }) => (
														<TextField
															{...field}
															className="mt-8 mb-16 mx-4"
															label="Units"
															id="ResidentialStart"
															// value={i=== 0?rp.slab_start :rp}
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
												<span className="text-green-800">*</span>End
												</Typography>
												<Controller
													name={`servicePricing[${spIndex}].slabs[${index}].slab_end`}
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
													className="py-16 font-semibold mx-4 mr-8 mx-4 ml-1.5 lg:ml-40 sm:ml-4"
												>
													Price
												</Typography>
												<Controller
													name={`servicePricing[${spIndex}].slabs[${index}].price_per_unit`}
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
		</div>
	);
}

export default ResidentialTab;
