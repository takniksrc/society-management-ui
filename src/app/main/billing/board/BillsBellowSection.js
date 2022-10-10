import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import FuseUtils from '@fuse/utils';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext, useForm } from 'react-hook-form';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DateTimePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Link, useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import reducer from '../store';
import {
	openEditContactDialog,
	openNewContactDialog,
	setContactsSearchText,
	removeUser,
	toggleStarredContact,
	selectUsers
} from '../store/newUsersSlice';
import instance from 'axiosinstance';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { getBlockBillsData } from '../store/billsWithBlockIdSlice';
import { selectBoards, newBoard, getBoards, resetBoards } from '../store/boardsSlice';

import societyChargesIcon from '../../../../assets/ServicesIcon/society-charges-icon.png';
import consumptionChragesIcon from '../../../../assets/ServicesIcon/consumption-based-icon.png';
import AllBills from './AllBills';

const defaultValuesss = {
	file: ''
};
const useStyles = makeStyles(theme => ({
	root: {},
	board: {
		cursor: 'pointer',
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	input: {
		display: 'none'
	},
	newBoard: {}
}));

function BillsBellowSection(props) {
	const mainTheme = useSelector(selectMainTheme);

	const dispatch = useDispatch();
	const routeParams = useParams();
	console.log('i am routeParams', routeParams);

	const classes = useStyles(props);

	useEffect(() => {
		return () => {
			// dispatch(resetBoards());
		};
	}, []);

	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	const methods = useFormContext();

	const { watch, handleSubmit, formState, reset, register, control, setValue } = useForm({
		mode: 'onChange',
		defaultValuesss
		// resolver: yupResolver(schema)
	});
	const handleForm = data => {
		console.log('fadfasd', data);
	};

	const { errors, isValid, dirtyFields } = formState;
	const bills = useSelector(state => state.scrumboardApp.AllBillsSlice);

	const searchText = useSelector(({ newUsersSlice }) => newUsersSlice.searchText);

	const [filteredData, setFilteredData] = useState(null);
	console.log('I am filtered in bellow', filteredData);

	const onSubmitButton = model => {
		// eslint-disable-next-line import/no-extraneous-dependencies
		const FormData = require('form-data');
		const data = new FormData();
		// console.log('I am clicked');

		data.append('block_id', routeParams.boardId);
		model.file.length !== 0 ? data.append('fpa_file', model.file[0]) : null;
		console.log('I am data', data);
		instance
			.post('/api/bills/add-payment', data)
			.then(function (response) {
				if (response.status === 201) {
					dispatch(
						showMessage({
							message: response.data.message, //text or html
							autoHideDuration: 6000, //ms
							anchorOrigin: {
								vertical: 'top', //top bottom
								horizontal: 'right' //left center right
							},
							variant: 'success' //success error info warning null
						})
					);
				}
				console.log(JSON.stringify(response));
			})
			.catch(function (error) {

				dispatch(
					showMessage({
						message: 'Error while uploading file', //text or html
						autoHideDuration: 6000, //ms
						anchorOrigin: {
							vertical: 'top', //top bottom
							horizontal: 'right' //left center right
						},
						variant: 'error' //success error info warning null
					})
				);
			});
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'customer_name',
				className: 'font-medium',
				sortable: true
			},
			{
				Header: 'Address',
				accessor: 'address',
				sortable: true
			},
			{
				Header: 'Meter Number',
				accessor: 'meter_number',
				sortable: true
			},
			{
				Header: 'Issue Date',
				accessor: 'issue_date',
				sortable: true
			},
			{
				Header: 'Due Date',
				accessor: 'due_date',
				sortable: true
			},
			{
				Header: 'Meter Type',
				accessor: 'meter_type',
				sortable: true
			},
			{
				Header: 'Billing Month',
				accessor: 'billing_month',
				sortable: true
			},
			{
				Header: 'Charges Type',
				accessor: 'charges_type',
				sortable: true
			},

			{
				Header: 'Electricity Charges',
				accessor: 'electricity_charges',
				sortable: true
			},

			{
				Header: 'Society Charges',
				accessor: 'society_charges',
				sortable: true
			},
			{
				Header: 'Total Bill',
				accessor: 'total_bill',
				sortable: true
			},
			{
				Header: 'Discount',
				accessor: 'discount',
				sortable: true
			},
			{
				Header: ' Amount Paid',
				accessor: 'amount_paid',
				sortable: true
			},
			{
				Header: 'Arrears',
				accessor: 'arrears',
				sortable: true
			},
			{
				Header: 'Payment Status',
				accessor: 'payment_status',
				sortable: true
			}
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return bills;
			}
			return FuseUtils.filterArrayByString(bills, _searchText);
		}

		if (bills) {
			setFilteredData(getFilteredArray(bills, searchText));
		}
	}, [bills, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
					<motion.div
						variants={container}
						initial="hidden"
						animate="show"
						className="grid grid-cols-1 flex-wrap w-full justify-center py-16 "
					>
						<motion.div variants={item} className="h-auto p-16" key={1}>
							<Paper
								// to={`/services/boards/consumption-based-charges/${board.id}/${board.uri}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								// component={Link}
							>
								<div className=" flex flex-wrap w-full justify-center px-16 flex-row">
									<div className="flex flex-1 items-center justify-center basis-1/4">
										<ThemeProvider theme={mainTheme}>
											<Paper
												component={motion.div}
												initial={{ y: -20, opacity: 0 }}
												animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
												className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
											>
												<Icon color="action">search</Icon>

												<Input
													placeholder="Search for anything"
													className="flex flex-1 px-16"
													disableUnderline
													fullWidth
													value={searchText}
													inputProps={{
														'aria-label': 'Search'
													}}
													onChange={ev => dispatch(setContactsSearchText(ev))}
												/>
											</Paper>
										</ThemeProvider>
									</div>

									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
										className="flex flex-1 items-center justify-center px-12 space-x-20 basis-1/2"
									>
										<Button
											variant="contained"
											color="secondary"
											className="w-full"
											component={Link}
											to={`billing/pdf-bills/${routeParams.boardId}`}
										>
											Download Bills
										</Button>
										<Button variant="contained" color="secondary" className="w-full">
											Upload Payemnts
										</Button>
									</motion.div>
								</div>

								<div className=" flex flex-wrap w-full justify-center py-32 px-16 flex-row">
									<Typography color="textSecondary" variant="h5">
										There are no bills!
									</Typography>
								</div>
								{/* </motion.div> */}
							</Paper>
						</motion.div>
					</motion.div>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* <form noValidate onSubmit={handleSubmit(handleForm)}> */}
			<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
				<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
					<motion.div
						variants={container}
						initial="hidden"
						animate="show"
						className="grid grid-cols-1 flex-wrap w-full justify-center py-16 "
					>
						<motion.div variants={item} className="h-auto p-16" key={1}>
							<Paper
								// to={`/services/boards/consumption-based-charges/${board.id}/${board.uri}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								// component={Link}
							>
								<div className=" flex flex-wrap w-full justify-center px-16 flex-row">
									<div className="flex flex-1 items-center justify-center basis-1/4">
										<ThemeProvider theme={mainTheme}>
											<Paper
												component={motion.div}
												initial={{ y: -20, opacity: 0 }}
												animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
												className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
											>
												<Icon color="action">search</Icon>

												<Input
													placeholder="Search for anything"
													className="flex flex-1 px-16"
													disableUnderline
													fullWidth
													value={searchText}
													inputProps={{
														'aria-label': 'Search'
													}}
													onChange={ev => dispatch(setContactsSearchText(ev))}
												/>
											</Paper>
										</ThemeProvider>
									</div>

									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
										className="flex flex-1 items-center justify-center px-12 space-x-20 basis-1/2"
									>
										{/* <div>
											<input type="file" {...register('file')} />
										</div> */}
										<Button
											variant="contained"
											color="secondary"
											className="w-full"
											component={Link}
											to={`/billing/pdf-bills/${routeParams.boardId}`}
										>
											Download Bills
										</Button>
										<form className="w-full" noValidate onChange={handleSubmit(onSubmitButton)}>
											<input
												className={classes.input}
												id="contained-button-file"
												// multiple
												type="file"
												{...register('file')}
											/>
											<label htmlFor="contained-button-file">
												<Button
													color="secondary"
													className="w-full"
													variant="contained"
													component="span"
													type="submit"
													// className={classes.button}
													startIcon={<CloudUploadIcon />}
												>
													Upload Payment
												</Button>
											</label>
										</form>
									</motion.div>
								</div>

								<div className=" flex flex-wrap w-full justify-center py-32 px-16 flex-row">
									<AllBills
										columns={columns}
										// data={[filteredData[0].customer]}
										data={filteredData}
										onRowClick={(ev, row) => {
											if (row) {
												dispatch(openEditContactDialog(row.original));
											}
										}}
									/>
								</div>
							</Paper>
						</motion.div>
					</motion.div>
				</div>
			</div>
			{/* </form> */}
		</>
	);
}

export default withReducer('scrumboardApp', reducer)(BillsBellowSection);
