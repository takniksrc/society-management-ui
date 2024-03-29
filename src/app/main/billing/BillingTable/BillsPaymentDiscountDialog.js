import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UploadButtons from 'app/main/billing/UploadButton/UploadButtons';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker } from '@material-ui/pickers';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Link, useParams } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

import { motion } from 'framer-motion';
import _ from '@lodash';
import * as yup from 'yup';
import { instance } from 'app/services/jwtService/jwtService';
import { Card } from '@material-ui/core';
import { forEach } from 'lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import { closeNewContactDialog, closeEditContactDialog } from '../store/newUsersSlice';
import { getBillData } from '../store/billWithIdSlice';
import { getBills, resetBills } from '../store/AllBillsSlice';

const defaultValuesDiscount = {
	current_reading: '',
	discount: ''
};

const defaultValuesPaidAmount = {
	paid_amount: ''
};

const schemaPaidValues = yup.object().shape({
	paid_amount: yup
		.number('Must be a number')
		.typeError('Value must be a number')
		.moreThan(0, 'Value be greater than zero')
});

const schemaDiscount = yup.object().shape({
	current_reading: yup
		.number()
		.moreThan(-1, 'Value must be greater than zero')
		.typeError('Value must be a number')
		.optional()
		.nullable(),
	discount: yup
		.number()
		.moreThan(-1, 'Value must be greater than zero')
		.typeError('Value must be a number')
		.optional()
		.nullable()
});

function BillsPaymentDiscountDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ newUsersSlice }) => newUsersSlice.newUsersSlice);
	const GetBillsData = useSelector(state => state.billWithIdSlice);
	console.log('i am GetBills in Dialog', GetBillsData);
	// const [billData, setBillData] = useState({});
	console.log('I am cliked data ', contactDialog);
	// console.log('billData', billData);
	const routeParams = useParams();
	console.log('i am routeParams', routeParams);
	const StyledTableRow = withStyles(theme => ({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: 'lightgrey'
			}
		}
	}))(TableRow);

	const { control, watch, reset, handleSubmit, formState, getValues, register, setValue } = useForm({
		mode: 'onChange',
		defaultValuesDiscount,
		resolver: yupResolver(schemaDiscount)
	});

	const {
		control: controlPaidValues,
		watch: watchPaidValues,
		reset: resetPaidValues,
		handleSubmit: handleSubmitPaidValues,
		formState: formStatePaidValues,
		getValues: getValuesPaidValues,
		setValue: setPaidValues,
		register: registerPaidValues
	} = useForm({
		mode: 'onChange',
		defaultValuesPaidAmount,
		resolver: yupResolver(schemaPaidValues)
	});
	function createData(month, unit, amount, date, Tamount) {
		return { month, unit, amount, date, Tamount };
	}

	const { isValid, dirtyFields, errors } = formState;
	const {
		isValid: isValidPaidValues,
		dirtyFields: dirtyFieldsPaidValues,
		errors: errorsPaidValues
	} = formStatePaidValues;

	const id = watch('id');

	// /**
	//  * Initialize Dialog with Data
	//  */
	const initDialog = useCallback(() => {
		reset({
			...defaultValuesDiscount,
			current_reading: contactDialog.data?.current_reading
		});

		setValue('discount', contactDialog.data?.discount);

		resetPaidValues({
			...defaultValuesPaidAmount,
			paid_amount: contactDialog.data?.paid_amount
		});

		//call the api for data
		console.log('bill', contactDialog);
		// instance.get(`/api/bills/${contactDialog?.data?.id}`).then(res => setBillData(res.data));
	}, [contactDialog.data, contactDialog.type, reset]);

	const onSubmitPaidValuesForm = data => {
		console.log('data in paid', data);
		instance
			.post(`/api/bills/payment/${contactDialog?.data?.id}`, {
				amount: data.paid_amount
			})
			.then(function (response) {
				console.log('response', response.data);
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
			})
			.catch(function (error) {
				console.log(error);
			});
		resetPaidValues({
			...defaultValuesPaidAmount
		});
		dispatch(getBillData(contactDialog?.data?.id));
	};

	const UpdateList = () => {
		dispatch(getBillData(contactDialog.data.id));
	};
	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (contactDialog.props.open) {
			initDialog();
		}
		console.log('I am Called');
		contactDialog?.data?.id && dispatch(getBillData(contactDialog?.data?.id));
		dispatch(getBills(routeParams.boardId));
	}, [contactDialog.props.open, initDialog, contactDialog.data]);

	function closeComposeDialog() {
		return contactDialog.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
	}

	const onSubmitDiscountValuesForm = data => {
		console.log('data in discount', data);
		instance
			.post(`/api/bills/${contactDialog?.data?.id}`, {
				current_reading: parseInt(data.current_reading),
				discount: parseInt(data.discount)
			})
			.then(function (response) {
				console.log('response after discount', JSON.stringify(response.data));
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
				dispatch(getBillData(contactDialog?.data?.id));
			})
			.catch(function (error) {
				console.log(error);
			});
		// setTimeout(function () {}, 1000);
	};

	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="md"
		>
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="h6" color="inherit" className="pt-8">
						{contactDialog.data?.customer_name}
					</Typography>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
						className="flex flex-2 ml-auto flex-row items-center justify-center ml-14 space-x-10 mt-10 "
					>
						<Button
							variant="contained"
							to={`/billing/${contactDialog?.data?.id}/pdf-bill`}
							component={Link}
						>
							<PrintIcon />
						</Button>
					</motion.div>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex gap-36 flex-col lg:flex-row xs:flex-col flex-col-reverse ">
					<form className="w-full" noValidate onSubmit={handleSubmitPaidValues(onSubmitPaidValuesForm)}>
						<Card className="p-24">
							<div className="flex">
								<Controller
									control={controlPaidValues}
									name="paid_amount"
									render={({ field }) => (
										<TextField
											{...field}
											type="number"
											className="mb-24"
											label="Pay Amount"
											id="paid_amount"
											variant="outlined"
											fullWidth
											error={!!errorsPaidValues.paid_amount}
											helperText={errorsPaidValues?.paid_amount?.message}
										/>
									)}
								/>
							</div>
							<div className="px-16">
								<Button
									variant="contained"
									color="secondary"
									type="submit"
									onClick={UpdateList}
									// onClick={() => dispatch(getBillData(contactDialog.data.id))}
									disabled={!isValidPaidValues}
								>
									Add Payment
								</Button>
							</div>
							<div style={{ height: '40rem', overflow: 'scroll' }} className="mt-10">
								{GetBillsData?.payment_history?.map((item, index) => {
									return (
										// <Card className="p-10 m-10">
										<Typography key={index} className="p-10 m-10">
											<b>Paid </b>PKR {item?.amount} <b>, Date </b> {item?.payment_date}
										</Typography>
										// </Card>
									);
								})}
							</div>
						</Card>
					</form>
					<div className="flex flex-col gap-24 w-full lg:w-2/5 sm:w-full">
						<form className="w-full" noValidate onSubmit={handleSubmit(onSubmitDiscountValuesForm)}>
							<Card className="p-24">
								<div>
									<Controller
										control={control}
										name="current_reading"
										render={({ field }) => (
											<TextField
												{...field}
												type="number"
												className="mb-24"
												label="Current Reading"
												id="current_reading"
												variant="outlined"
												fullWidth
												error={!!errors.current_reading}
												helperText={errors?.current_reading?.message}
											/>
										)}
									/>
								</div>

								<div className="flex">
									<Controller
										control={control}
										name="discount"
										render={({ field }) => (
											<TextField
												{...field}
												type="number"
												className="mb-24"
												label="Discount"
												id="discount"
												variant="outlined"
												fullWidth
												error={!!errors.discount}
												helperText={errors?.discount?.message}
											/>
										)}
									/>
								</div>
								<div className="px-16">
									<Button variant="contained" color="secondary" type="submit" disabled={!isValid}>
										Update Bill
									</Button>
								</div>
							</Card>
						</form>
						<Card className="w-full" style={{ padding: '2rem', height: '100%' }}>
							<Typography color="error">
								<b>Due Date: </b>
								{contactDialog?.data?.due_date}
							</Typography>
							<Typography>
								<b>Units: </b>
								{GetBillsData.current_reading <= GetBillsData.previous_reading
									? 0
									: GetBillsData.current_reading - GetBillsData.previous_reading}
								{/* {GetBillsData.current_reading - GetBillsData.previous_reading} */}
							</Typography>
							<Typography>
								<b>Previous Reading: </b> {GetBillsData?.previous_reading}{' '}
							</Typography>
							<Typography>
								<b>Current Reading: </b> {GetBillsData?.current_reading}{' '}
							</Typography>
							<Typography>
								<b>Arrears: </b>
								{GetBillsData?.arrears}
							</Typography>
							<Typography>
								{' '}
								<b>Total FPA: </b> {GetBillsData?.fpa_charges}
							</Typography>
							<Typography>
								<b>Electricity Bill: </b> {GetBillsData?.electricity_charges}
							</Typography>
							<Typography>
								<b>Society Charges: </b> {GetBillsData?.society_charges}
							</Typography>
							<Typography>
								<b>Total Payables: </b> {GetBillsData?.total_bill}{' '}
							</Typography>
							<Typography>
								<b>Total Paid: </b> {GetBillsData?.amount_paid}{' '}
							</Typography>
							<Typography className="text-green-600">
								<b>Total Discount: </b> {GetBillsData?.discount}{' '}
							</Typography>
						</Card>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default BillsPaymentDiscountDialog;
