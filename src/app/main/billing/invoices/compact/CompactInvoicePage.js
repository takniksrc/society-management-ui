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
import { useDispatch } from 'react-redux';

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
function createData(name, previousreading, currentreading, paymentstatus) {
	return { name, previousreading, currentreading, paymentstatus };
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
				{bills?.map(bill => (
					<>
						<motion.div
							style={{ marginBottom: '2rem' }}
							ref={ref}
							initial={{ opacity: 0, y: 200 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ bounceDamping: 0 }}
						>
							<Card className=" mx-auto w-xl print:w-full print:p-8 print:shadow-none rounded-none sm:rounded-20">
								<CardContent className="p-88 print:p-0">
									<Typography color="textSecondary" className="mb-32">
										{bill.issue_date}
									</Typography>

									<div className="flex justify-between">
										<div>
											<table className="mr-24">
												<tbody>
													<tr>
														<td className="pb-4 px-16 border border-slate-300">
															<Typography variant="h6" color="textSecondary">
																Refference No
															</Typography>
														</td>
														<td className="pb-4 px-16 border border-slate-300">
															<Typography className="font-light" variant="h6">
																{bill.meter?.refference_number}
															</Typography>
														</td>
													</tr>

													<tr>
														<td className="pb-4 px-16 border border-slate-300">
															<Typography color="textSecondary">Due Date</Typography>
														</td>
														<td className="pb-4 px-16 border border-slate-300">
															<Typography>{bill.due_date}</Typography>
														</td>
													</tr>
													<tr>
														<td className="pb-4 px-16 border border-slate-300">
															<Typography color="textSecondary">Billing Month</Typography>
														</td>
														<td className="pb-4 px-16 border border-slate-300">
															<Typography>{bill.billing_month}</Typography>
														</td>
													</tr>
												</tbody>
											</table>
											{/* <div className="pb-4 px-16 border border-slate-300 mr-24">
												<Typography color="textSecondary">{invoice.client.title}</Typography>

												{invoice.client.address && (
													<Typography color="textSecondary">
														{invoice.client.address}
													</Typography>
												)}
												{invoice.client.phone && (
													<Typography color="textSecondary">
														{invoice.client.phone}
													</Typography>
												)}
												{invoice.client.email && (
													<Typography color="textSecondary">
														{invoice.client.email}
													</Typography>
												)}
												{invoice.client.website && (
													<Typography color="textSecondary">
														{invoice.client.website}
													</Typography>
												)}
											</div> */}
										</div>

										<div className={clsx(classes.seller, 'flex items-center p-16')}>
											<div className={clsx(classes.divider, 'w-px mx-8 h-96 opacity-50')} />

											<div className="px-8">
												<img className="w-80" src={Logo} alt="logo" />

												<Typography color="inherit">{bill.customer_name}</Typography>

												{bill.street_address && (
													<Typography color="inherit">{bill.street_address}</Typography>
												)}
												{bill.property_size && (
													<Typography color="inherit">{bill.property_size}</Typography>
												)}
												{/* {invoice.from.email && (
													<Typography color="inherit">{invoice.from.email}</Typography>
												)}
												{invoice.from.website && (
													<Typography color="inherit">{invoice.from.website}</Typography>
												)} */}
											</div>
										</div>
									</div>
									<div className="mt-64">
										{/* <TableContainer>
											<Table className={classes.table} aria-label="customized table">
												<TableHead>
													<TableRow>
														<TableCell className="border border-slate-300">
															Status
														</TableCell>
														<TableCell className="border border-slate-300" align="center">
															Previous Reading
														</TableCell>
														<TableCell className="border border-slate-300" align="center">
															Current Reading
														</TableCell>
														<TableCell className="border border-slate-300" align="center">
															Payment Status
														</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{rows.map(row => (
														<TableRow key={row.id}>
															<TableCell
																className="border border-slate-300"
																component="th"
																scope="row"
															>
																{row.name}
															</TableCell>
															<TableCell
																className="border border-slate-300"
																align="center"
															>
																{row.previousreading}
															</TableCell>
															<TableCell
																className="border border-slate-300"
																align="center"
															>
																{row.currentreading}
															</TableCell>
															<TableCell
																className="border border-slate-300"
																align="center"
															>
																{row.paymentstatus}
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer> */}
									</div>
									<div className="mt-64">
										<Table
											className="border-separate border border-slate-400"
											// className="simple"
										>
											<TableHead>
												<TableRow>
													<TableCell className="border border-slate-300">Services</TableCell>
													<TableCell className="border border-slate-300" align="right">
														Amount
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												<TableRow>
													<TableCell className="border border-slate-300">
														<Typography variant="subtitle1">Society Charges</Typography>
													</TableCell>
													<TableCell className="border border-slate-300" align="right">
														{bill.society_charges}
													</TableCell>
												</TableRow>

												<TableRow>
													<TableCell className="border border-slate-300">
														<Typography variant="subtitle1">Electricity Charges</Typography>
													</TableCell>
													<TableCell className="border border-slate-300" align="right">
														{bill.electricity_charges}
													</TableCell>
												</TableRow>

												<TableRow>
													<TableCell className="border border-slate-300">
														<Typography variant="subtitle1">FPA Charges</Typography>
													</TableCell>
													<TableCell className="border border-slate-300" align="right">
														{bill.fpa_charges}
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>

										<Table className="simple mt-32">
											<TableBody>
												<TableRow>
													<TableCell>
														<Typography
															className="font-normal"
															variant="subtitle1"
															color="textSecondary"
														>
															Discount
														</Typography>
													</TableCell>
													<TableCell align="right">
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
													<TableCell>
														<Typography
															className="font-light"
															variant="h4"
															color="textSecondary"
														>
															TOTAL
														</Typography>
													</TableCell>
													<TableCell align="right">
														<Typography
															className="font-light"
															variant="h4"
															color="textSecondary"
														>
															{formatter.format(bill.total_bill)}
														</Typography>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</div>

									<div className="mt-96">
										<Typography className="mb-24 print:mb-12" variant="body1">
											Please pay within 15 days. Thank you for your business.
										</Typography>

										<div className="flex">
											<div className="flex-shrink-0">
												<img className="w-32" src="assets/images/logos/fuse.svg" alt="logo" />
											</div>

											<Typography
												className="font-normal mb-64 px-24"
												variant="caption"
												color="textSecondary"
											>
												In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut
												ac congue dolor. Quisque scelerisque lacus sed feugiat fermentum. Cras
												aliquet facilisis pellentesque. Nunc hendrerit quam at leo commodo, a
												suscipit tellus dapibus. Etiam at felis volutpat est mollis lacinia.
												Mauris placerat sem sit amet velit mollis, in porttitor ex finibus.
												Proin eu nibh id libero tincidunt lacinia et eget eros.
											</Typography>
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

/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 * */
