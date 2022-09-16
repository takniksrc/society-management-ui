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

import Typography from '@material-ui/core/Typography';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getBillsData } from '../../store/billsWithIdSlice';

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

function CompactInvoicePage() {
	const classes = useStyles();
	const routeParams = useParams();
	console.log('i am routeParams in invoice', routeParams);
	const dispatch = useDispatch();
	const GetBillsData = useSelector(state => state.scrumboardApp?.getBills);
	console.log('i am GetBills', GetBillsData);

	const [invoice, setInvoice] = useState({
		id: '5725a6802d',
		from: {
			title: 'Fuse Inc.',
			address: '2810 Country Club Road Cranford, NJ 07016',
			phone: '+66 123 455 87',
			email: 'hello@fuseinc.com',
			website: 'www.fuseinc.com'
		},
		client: {
			title: 'John Doe',
			address: '9301 Wood Street Philadelphia, PA 19111',
			phone: '+55 552 455 87',
			email: 'johndoe@mail.com'
		},
		number: 'P9-0004',
		date: 'Jul 19, 2019',
		dueDate: 'Aug 24, 2019',
		services: [
			{
				id: '1',
				title: 'Prototype & Design',
				detail:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan, quam sed eleifend imperdiet.',
				unit: 'Hour',
				unitPrice: '12.00',
				quantity: '240',
				total: '2880'
			},
			{
				id: '2',
				title: 'Coding',
				detail:
					'Vestibulum ligula sem, rutrum et libero id, porta vehicula metus. Cras dapibus neque sit amet laoreet vestibulum.',
				unit: 'Hour',
				unitPrice: '10.50',
				quantity: '350',
				total: '3675'
			},
			{
				id: '3',
				title: 'Testing',
				detail:
					'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
				unit: 'Hour',
				unitPrice: '4.00',
				quantity: '50',
				total: '200'
			},
			{
				id: '4',
				title: 'Documentation & Training',
				detail:
					'Pellentesque luctus efficitur neque in finibus. Integer ut nunc in augue maximus porttitor id id nulla. In vitae erat.',
				unit: 'Hour',
				unitPrice: '6.50',
				quantity: '260',
				total: '1690'
			}
		],
		subtotal: '8445',
		tax: '675.60',
		discount: '120.60',
		total: '9000'
	});
	useDeepCompareEffect(() => {
		dispatch(getBillsData(routeParams));
	}, [dispatch, routeParams]);
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'PKR',
		minimumFractionDigits: 2
	});
	const [bills, setBills] = useState({
		id: 'fc58317d-546b-418f-8c93-abf0f7ccd49c',
		customer_id: '1fbdbe5d-9036-412c-a655-ba26589238b6',
		customer_name: 'Customer 4',
		address: 'A 4',
		meter_number: '2000004',
		meter_type: 'Normal',
		property_type: 'Shop',
		property_size: 'Commercial Shop 4 Marla',
		billing_month: 'Aug-22',
		issue_date: '15-09-2022',
		due_date: '20-09-2022',
		charges_type: 'approximately',
		services: [
			{
				id: 1,
				title: 'Society Charges',
				price: 4800,
				society_charges: 4800
			},
			{
				id: 2,
				title: 'Electricity Charges',
				price: 0,
				electricity_charges: 0
			},
			{
				id: 3,
				title: 'FPA Charges',
				price: 0,

				fpa_charges: 0
			},
			{
				id: 4,
				title: 'Arrears',
				price: 0,
				arrears: 0
			}
		],
		previous_reading: 0,
		current_reading: 0,
		discount: null,
		total_bill: 4800,
		payment_status: 'Unpaid',
		amount_paid: 0
	});
	const rows = [createData('Status', bills.previous_reading, bills.current_reading, bills.payment_status)];
	return (
		<div className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0 sm:p-64 print:p-0 overflow-auto')}>
			{invoice && (
				<motion.div
					initial={{ opacity: 0, y: 200 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ bounceDamping: 0 }}
				>
					<Card className="mx-auto w-xl print:w-full print:p-8 print:shadow-none rounded-none sm:rounded-20">
						<CardContent className="p-88 print:p-0">
							<Typography color="textSecondary" className="mb-32">
								{bills.issue_date}
							</Typography>

							<div className="flex justify-between">
								<div>
									<table className="mb-16">
										<tbody>
											<tr>
												<td className="pb-4">
													<Typography
														className="font-light"
														variant="h6"
														color="textSecondary"
													>
														INVOICE
													</Typography>
												</td>
												<td className="pb-4 px-16">
													<Typography className="font-light" variant="h6">
														{invoice.number}
													</Typography>
												</td>
											</tr>
											<tr>
												<td>
													<Typography color="textSecondary">Refference No.</Typography>
												</td>
												<td className="px-16">
													<Typography>{bills.customer_id}</Typography>
												</td>
											</tr>
											<tr>
												<td>
													<Typography color="textSecondary">INVOICE DATE</Typography>
												</td>
												<td className="px-16">
													<Typography>{bills.issue_date}</Typography>
												</td>
											</tr>

											<tr>
												<td>
													<Typography color="textSecondary">DUE DATE</Typography>
												</td>
												<td className="px-16">
													<Typography>{bills.due_date}</Typography>
												</td>
											</tr>
											<tr>
												<td>
													<Typography color="textSecondary">Billing Month</Typography>
												</td>
												<td className="px-16">
													<Typography>{bills.billing_month}</Typography>
												</td>
											</tr>
										</tbody>
									</table>

									<Typography color="textSecondary">{invoice.client.title}</Typography>

									{invoice.client.address && (
										<Typography color="textSecondary">{invoice.client.address}</Typography>
									)}
									{invoice.client.phone && (
										<Typography color="textSecondary">{invoice.client.phone}</Typography>
									)}
									{invoice.client.email && (
										<Typography color="textSecondary">{invoice.client.email}</Typography>
									)}
									{invoice.client.website && (
										<Typography color="textSecondary">{invoice.client.website}</Typography>
									)}
								</div>

								<div className={clsx(classes.seller, 'flex items-center p-16')}>
									<img className="w-80" src="assets/images/logos/fuse.svg" alt="logo" />

									<div className={clsx(classes.divider, 'w-px mx-8 h-96 opacity-50')} />

									<div className="px-8">
										<Typography color="inherit">{invoice.from.title}</Typography>

										{invoice.from.address && (
											<Typography color="inherit">{invoice.from.address}</Typography>
										)}
										{invoice.from.phone && (
											<Typography color="inherit">{invoice.from.phone}</Typography>
										)}
										{invoice.from.email && (
											<Typography color="inherit">{invoice.from.email}</Typography>
										)}
										{invoice.from.website && (
											<Typography color="inherit">{invoice.from.website}</Typography>
										)}
									</div>
								</div>
							</div>
							<div className="mt-64">
								<TableContainer>
									<Table className={classes.table} aria-label="customized table">
										<TableHead>
											<TableRow>
												<TableCell className='border border-slate-300'>Status</TableCell>
												<TableCell className='border border-slate-300' align="center">Previous Reading</TableCell>
												<TableCell className='border border-slate-300' align="center">Current Reading</TableCell>
												<TableCell className='border border-slate-300' align="center">Payment Status</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map(row => (
												<TableRow key={row.id}>
													<TableCell className='border border-slate-300' component="th" scope="row">
														{row.name}
													</TableCell>
													<TableCell className='border border-slate-300' align="center">
														{row.previousreading}
													</TableCell>
													<TableCell className='border border-slate-300' align="center">
														{row.currentreading}
													</TableCell>
													<TableCell className='border border-slate-300' align="center">
														{row.paymentstatus}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</div>
							<div className="mt-64">
								<Table 
								className="border-separate border border-slate-400"
								// className="simple"
								>
									<TableHead>
										<TableRow>
											<TableCell className='border border-slate-300'>SERVICES</TableCell>
											<TableCell className='border border-slate-300' align="right">AMOUNT</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{bills.services.map(service => (
											<TableRow key={service.id}>
												<TableCell className='border border-slate-300'>
													<Typography variant="subtitle1">{service.title}</Typography>
												</TableCell>
												<TableCell className='border border-slate-300' align="right">{service.price}</TableCell>
											</TableRow>
										))}
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
													SUBTOTAL
												</Typography>
											</TableCell>
											<TableCell align="right">
												<Typography
													className="font-normal"
													variant="subtitle1"
													color="textSecondary"
												>
													{formatter.format(bills.total_bill)}
												</Typography>
											</TableCell>
										</TableRow>
										{/* <TableRow>
											<TableCell>
												<Typography
													className="font-normal"
													variant="subtitle1"
													color="textSecondary"
												>
													TAX
												</Typography>
											</TableCell>
											<TableCell align="right">
												<Typography
													className="font-normal"
													variant="subtitle1"
													color="textSecondary"
												>
													{formatter.format(invoice.tax)}
												</Typography>
											</TableCell>
										</TableRow> */}
										<TableRow>
											<TableCell>
												<Typography
													className="font-normal"
													variant="subtitle1"
													color="textSecondary"
												>
													DISCOUNT
												</Typography>
											</TableCell>
											<TableCell align="right">
												<Typography
													className="font-normal"
													variant="subtitle1"
													color="textSecondary"
												>
													{formatter.format(bills.discount === null ? 0 : bills.discount)}
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<Typography className="font-light" variant="h4" color="textSecondary">
													TOTAL
												</Typography>
											</TableCell>
											<TableCell align="right">
												<Typography className="font-light" variant="h4" color="textSecondary">
													{formatter.format(bills.total_bill)}
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
										In condimentum malesuada efficitur. Mauris volutpat placerat auctor. Ut ac
										congue dolor. Quisque scelerisque lacus sed feugiat fermentum. Cras aliquet
										facilisis pellentesque. Nunc hendrerit quam at leo commodo, a suscipit tellus
										dapibus. Etiam at felis volutpat est mollis lacinia. Mauris placerat sem sit
										amet velit mollis, in porttitor ex finibus. Proin eu nibh id libero tincidunt
										lacinia et eget eros.
									</Typography>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			)}
		</div>
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
