import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import PrintIcon from '@material-ui/icons/Print';
import { Button } from '@material-ui/core';
import { navbarClose } from 'app/store/fuse/navbarSlice';
import Logo from './KesamLogo.jpg';
import BillsImage from '../../../../../assets/BillsIcon/image.jpg';
import BillsCutImage from '../../../../../assets/BillsIcon/cut_here.png';
import { useDispatch } from 'react-redux';
import billingBlocksSlice from '../../store/billingBlocksSlice';

const ref = React.createRef();

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);
function createData(month, unit, amount, date, Tamount) {
	return { month, unit, amount, date, Tamount };
}

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`
	},
	divider: {
		backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark)
	},
	seller: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		marginRight: -88,
		paddingRight: 66,
		width: 480
	}
}));

function CompactInvoicePage(props) {
	const { bills, invoice } = props;
	console.log('props', props);
	const classes = useStyles();
	const dispatch = useDispatch();

	console.log('type', bills);


	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'PKR',
		minimumFractionDigits: 2
	});

	return (
		<>
			<Button
				style={{ position: 'absolute', top: 10, right: 10 }}
				variant="contained"
				color="secondary"
				onClick={() => {
					dispatch(navbarClose());
					window.print();
				}}
			>
				<PrintIcon />
			</Button>
			<div
				id="section-to-print"
				className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0 sm:p-64 print:p-0 overflow-auto ')}
			>
				{bills[0]?.charges_type === 'calculated'
					? bills?.map((bill, index) => (
							<>
								<motion.div
									style={{ marginBottom: '2rem' }}
									ref={ref}
									initial={{ opacity: 0, y: 200 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ bounceDamping: 0 }}
								>
									<Card className=" mx-auto w-xl print:w-full print:p-8 print:shadow-none rounded-none sm:rounded-20">
										<CardContent className="p-44 print:p-0">
											<div className="border-black border-1 outline-2">
												<div className="grid grid-col-3 grid-flow-col ">
													<div className="border-black border-1 outline-2 place-items-center">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
													</div>
													<div className="border-black border-1 outline-2">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															For Complaints 042-35459960
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Payable at C Block Billing Office
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Timing : 10:15 AM - 5:00 PM
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Break : 1:00 PM - 2:00 PM
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Friday Break : 1:00 PM - 3:00 PM
														</Typography>

														<Typography
															className="text-center text-sm mt-8"
															color="inherit"
														>
															Consumer Copy
														</Typography>
													</div>
													<div className="border-black border-1 outline-2">
														<div>
															<img className="w-80 m-auto" src={Logo} alt="logo" />
														</div>
													</div>
												</div>
												{/* Header 2nd Table */}
												<div className="grid grid-cols-9 grid-rows-1">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Name
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.customer_name}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  text-base">
														Plot Size-{bill.property_size}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Con Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.issue_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Status
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.payment_status}
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Reference Number
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.meter.refference_number}
													</div>
												</div>
												<div className="grid grid-cols-5 grid-rows-1">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Meter number
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Phase
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Bill Month
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Issue Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Due Date
													</div>

													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.meter.meter_number}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  text-base">
														{bill.meter.phase}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.billing_month}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.issue_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.due_date}
													</div>
												</div>
												{/* Header Previous */}
												<div className="grid grid-cols-10 grid-rows-1 text-center">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Previous
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Present
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														M.F
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Units
													</div>
													<div className="border-black col-span-2 border-1 outline-2 place-items-center font-semibold text-base ">
														Rate
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Amount
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														FPA
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Electric Total
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Charge
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.previous_reading}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.current_reading}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  text-base">
														{/* {bill.meter.phase} */}0
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.current_reading - bill.previous_reading}
													</div>
													<div className="border-black border-1 col-span-2 outline-2 place-items-center text-base">
														{}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.total_bill}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.fpa_charges}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.total_bill}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														-
													</div>
												</div>

												<div
													className="grid grid-cols-2 grid-rows-2"
													style={{ gridTemplateRows: 'max-content' }}
												>
													<div>
														<TableContainer>
															<Table
																className={classes.table}
																aria-label="customized table"
															>
																<TableHead>
																	<TableRow>
																		<TableCell className="border-2 border-black border-slate-300">
																			Month
																		</TableCell>
																		<TableCell
																			className="border-2 border-black border-slate-300"
																			align="center"
																		>
																			Unit
																		</TableCell>
																		<TableCell
																			className="border-2 border-black border-slate-300"
																			align="center"
																		>
																			Amount
																		</TableCell>
																		<TableCell
																			className="border-2 border-black border-slate-300"
																			align="center"
																		>
																			Date
																		</TableCell>
																		<TableCell
																			className="border-2 border-black border-slate-300"
																			align="center"
																		>
																			Amount
																		</TableCell>
																	</TableRow>
																</TableHead>
																<TableBody>
																	{bills[index]?.bill_history
																		?.map(item => {
																			return createData(
																				item?.billing_month,
																				item?.units,
																				item?.bill_amount,
																				item?.billing_month,
																				item.paid_amount
																			);
																		})
																		.map(row => (
																			<TableRow key={row.id}>
																				<TableCell
																					className="border-2 border-black border-slate-300"
																					component="th"
																					scope="row"
																				>
																					{row.month}
																				</TableCell>
																				<TableCell
																					className="border-2 border-black border-slate-300"
																					align="center"
																				>
																					{row.unit}
																				</TableCell>
																				<TableCell
																					className="border-2 border-black border-slate-300"
																					align="center"
																				>
																					{row.amount}
																				</TableCell>
																				<TableCell
																					className="border-2 border-black border-slate-300"
																					align="center"
																				>
																					{row.date}
																				</TableCell>
																				<TableCell
																					className="border-2 border-black border-slate-300"
																					align="center"
																				>
																					{row.Tamount}
																				</TableCell>
																			</TableRow>
																		))}
																</TableBody>
															</Table>
														</TableContainer>
													</div>

													<div className="grid grid-cols-4">
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															Current Bill
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{bill.total_bill}
														</div>
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															Total arrears
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{bill.arrears}
														</div>
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															Advance
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{}
														</div>
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															Adjustment
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{bill.fpa_charges}
														</div>
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															Subsidy
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{}
														</div>
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															L.P Surcharge
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{bill.late_surcharge}
														</div>
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															PayAble within Due Date
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{bill.total_bill}
														</div>
														<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
															PayAble after Due Date
														</div>
														<div className="border-black border-1 outline-2 place-items-center text-base">
															{bill.bill_after_due_date}
														</div>
													</div>
													{/* </div> */}
													<div
														className="grid grid-cols-1 grid-rows-1 "
														style={{ height: '20rem' }}
													>
														<div className="border-black border-1 outline-2 place-items-center">
															<img
																className="w-fit"
																style={{
																	height: '-webkit-fill-available',
																	width: '-webkit-fill-available'
																}}
																src={BillsImage}
																alt="logo"
															/>
														</div>
													</div>
													<div
														className="grid grid-cols-1 grid-rows-1 "
														style={{ height: '20rem' }}
													>
														<div
															className="border-black border-1 outline-2 place-items-center"
															// style={{ height: '20rem' }}
														>
															<img
																className="w-fit"
																style={{
																	height: '-webkit-fill-available',
																	width: '-webkit-fill-available'
																}}
																src={BillsImage}
																alt="logo"
															/>
														</div>
													</div>
												</div>

												<div
													className="grid grid-cols-1 grid-rows-1 "
													style={{ height: '5rem' }}
												>
													<div className="border-black border-1 outline-2 place-items-center">
														<img
															className="w-fit"
															style={{
																height: '-webkit-fill-available',
																width: '-webkit-fill-available'
															}}
															src={BillsCutImage}
															alt="cut-page"
														/>
													</div>
												</div>

												<div className="grid grid-col-3 grid-flow-col ">
													<div className="border-black border-1 outline-2 place-items-center">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
													</div>
													<div className="border-black border-1 outline-2">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
														<Typography className="text-center text-base" color="inherit">
															{bill.customer_name}
														</Typography>

														{bill.street_address && (
															<Typography
																className="text-center text-base"
																color="inherit"
															>
																{bill.street_address}
															</Typography>
														)}
														{bill.property_size && (
															<Typography
																className="text-center text-base"
																color="inherit"
															>
																{bill.property_size}
															</Typography>
														)}
													</div>
													<div className="border-black border-1 outline-2">
														<div>
															<img className="w-80 m-auto" src={Logo} alt="logo" />
														</div>
													</div>
												</div>
												<div className="grid grid-cols-4 grid-rows-1 text-center">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Plot No. {bill.address}
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold  text-base">
														{bill.customer_name}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Account No-
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Plot Size {bill.property_size}
													</div>
												</div>
												<div className="grid grid-cols-8 grid-rows-1">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Reference Number
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Bill Month
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Issue Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Due Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Electricity Bills
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Others/Maint Bill
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Bill Due Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Bill After Due Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.refference_number}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.billing_month}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  text-base">
														{bill.issue_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.due_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.total_bill}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.society_charges}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.total_bill}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.bill_after_due_date}
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
									<div style={{ pageBreakBefore: 'always' }}> </div>
								</motion.div>
							</>
					  ))
					: bills?.map(bill => (
							<>
								<motion.div
									style={{ marginBottom: '2rem' }}
									ref={ref}
									initial={{ opacity: 0, y: 200 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ bounceDamping: 0 }}
								>
									<Card className=" mx-auto w-xl print:w-full print:p-8 print:shadow-none rounded-none sm:rounded-20">
										<CardContent className="p-44 print:p-0">
											<div className="border-black border-1 outline-2">
												{/* Header */}
												<div className="grid grid-col-3 grid-flow-col ">
													<div className="border-black border-1 outline-2 place-items-center">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
													</div>
													<div className="border-black border-1 outline-2">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															For Complaints 042-35459960
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Payable at C Block Billing Office
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Timing : 10:15 AM - 5:00 PM
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Break : 1:00 PM - 2:00 PM
														</Typography>
														<Typography className="text-center text-sm" color="inherit">
															Friday Break : 1:00 PM - 3:00 PM
														</Typography>

														<Typography
															className="text-center text-sm mt-8"
															color="inherit"
														>
															Consumer Copy
														</Typography>
													</div>
													<div className="border-black border-1 outline-2">
														<div>
															<img className="w-80 m-auto" src={Logo} alt="logo" />
														</div>
													</div>
												</div>
												<div className="grid grid-cols-9 grid-rows-1">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Name
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.customer_name}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  text-base">
														Plot Size-{bill.property_size}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Con Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.issue_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Status
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.payment_status}
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Reference Number
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.refference_number}
													</div>
												</div>
												{/* Meter No Phases No */}
												<div className="grid grid-cols-5 grid-rows-1">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Meter number
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Phase
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Bill Month
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Issue Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Due Date
													</div>

													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill?.meter_number}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  text-base">
														{bill.phase}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.billing_month}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.issue_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.due_date}
													</div>
												</div>
												{/* Table Society charges */}
												<div>
													<Table
														className="border-separate border border-black border-slate-400"
														// className="simple"
													>
														<TableHead>
															<TableRow>
																<TableCell className="border border-black font-semibold border-slate-300">
																	Services
																</TableCell>
																<TableCell
																	className="border border-black font-semibold border-slate-300"
																	align="right"
																>
																	Amount
																</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															<TableRow>
																<TableCell className="border border-black border-slate-300">
																	<Typography variant="subtitle1">Arrears</Typography>
																</TableCell>
																<TableCell
																	className="border border-black border-slate-300"
																	align="right"
																>
																	{bill.arrears}
																</TableCell>
															</TableRow>
															{bill?.society_services?.map(societyCharges => (
																<TableRow>
																	<TableCell className="border border-black border-slate-300">
																		<Typography variant="subtitle1">
																			{societyCharges.service_name}
																		</Typography>
																	</TableCell>
																	<TableCell
																		className="border border-black border-slate-300"
																		align="right"
																	>
																		{societyCharges.service_price}
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>

													<Table className="border-separate border border-black border-slate-400">
														<TableBody className="border border-black border-slate-300">
															<TableRow className="border border-black border-slate-300">
																<TableCell className="border border-black border-slate-300">
																	<Typography
																		className="font-normal"
																		variant="subtitle1"
																		color="textSecondary"
																	>
																		Discount
																	</Typography>
																</TableCell>
																<TableCell
																	align="right"
																	className="border border-black border-slate-300"
																>
																	<Typography
																		className="font-normal"
																		variant="subtitle1"
																		color="textSecondary"
																	>
																		{bill.discount === null ? 0 : bill.discount}
																	</Typography>
																</TableCell>
															</TableRow>
															<TableRow>
																<TableCell className="border border-black border-slate-300">
																	<Typography
																		className="font-light"
																		variant="h5"
																		color="textSecondary"
																	>
																		TOTAL
																	</Typography>
																</TableCell>
																<TableCell
																	align="right"
																	className="border border-black border-slate-300"
																>
																	<Typography
																		className="font-light"
																		variant="h5"
																		color="textSecondary"
																	>
																		{formatter.format(bill.total_bill)}
																	</Typography>
																</TableCell>
															</TableRow>
														</TableBody>
													</Table>
												</div>
												{/* Images */}
												<div
													className="grid grid-cols-2 grid-rows-1 "
													style={{ height: '20rem' }}
												>
													<div className="border-black border-1 outline-2 place-items-center">
														<img
															className="w-fit"
															style={{
																height: '-webkit-fill-available',
																width: '-webkit-fill-available'
															}}
															src={BillsImage}
															alt="logo"
														/>
													</div>
													<div className="border-black border-1 outline-2 place-items-center">
														<img
															className="w-fit"
															style={{
																height: '-webkit-fill-available',
																width: '-webkit-fill-available'
															}}
															src={BillsImage}
															alt="logo"
														/>
													</div>
												</div>
												{/*Cut Area  */}
												<div
													className="grid grid-cols-1 grid-rows-1 "
													style={{ height: '5rem' }}
												>
													<div className="border-black border-1 outline-2 place-items-center">
														<img
															className="w-fit"
															style={{
																height: '-webkit-fill-available',
																width: '-webkit-fill-available'
															}}
															src={BillsCutImage}
															alt="cut-page"
														/>
													</div>
												</div>
												{/* Footer */}
												<div className="grid grid-col-3 grid-flow-col ">
													<div className="border-black border-1 outline-2 place-items-center">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
													</div>
													<div className="border-black border-1 outline-2">
														<Typography className="text-center text-lg font-bold">
															{' '}
															Service Invoice
														</Typography>
														<Typography className="text-center text-base" color="inherit">
															{bill.customer_name}
														</Typography>

														{bill.street_address && (
															<Typography
																className="text-center text-base"
																color="inherit"
															>
																{bill.street_address}
															</Typography>
														)}
														{bill.property_size && (
															<Typography
																className="text-center text-base"
																color="inherit"
															>
																{bill.property_size}
															</Typography>
														)}
													</div>
													<div className="border-black border-1 outline-2">
														<div>
															<img className="w-80 m-auto" src={Logo} alt="logo" />
														</div>
													</div>
												</div>
												<div className="grid grid-cols-4 grid-rows-1 text-center">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Plot No. {bill.address}
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold  text-base">
														{bill.customer_name}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Account No-
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Plot Size {bill.property_size}
													</div>
												</div>
												<div className="grid grid-cols-8 grid-rows-1">
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Reference Number
													</div>
													<div className="border-black border-1 outline-2 place-items-center  font-semibold text-base">
														Bill Month
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Issue Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Due Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Electricity Bills
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Others/Maint Bill
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Bill Due Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center font-semibold text-base">
														Bill After Due Date
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.refference_number}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.billing_month}
													</div>
													<div className="border-black border-1 outline-2 place-items-center  text-base">
														{bill.issue_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.due_date}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.total_bill}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.society_charges}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.total_bill}
													</div>
													<div className="border-black border-1 outline-2 place-items-center text-base">
														{bill.bill_after_due_date}
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
									<div style={{ pageBreakBefore: 'always' }}> </div>
								</motion.div>
							</>
					  ))}
			</div>
		</>
	);
}

export default CompactInvoicePage;
