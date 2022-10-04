import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import UploadButtons from 'app/main/Button/UploadButtons';
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

import { removeUser, closeNewContactDialog, closeEditContactDialog } from '../store/newUsersSlice';
import { Card } from '@material-ui/core';
import { forEach } from 'lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import { getBillData } from '../store/billWithIdSlice';
import { getBills, resetBills } from '../store/AllBillsSlice';

const defaultValuesDiscount = {
	current_reading: '',
	discount: ''
};

const defaultValuesPaidAmount = {
	paid_amount: ''
};

function ContactDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ newUsersSlice }) => newUsersSlice.newUsersSlice);
	const GetBillsData = useSelector(state => state.scrumboardApp?.billWithIdSlice);
	console.log('i am GetBills in Dialog', GetBillsData);
	const [billData, setBillData] = useState({});
	console.log('I am cliked data ', contactDialog);
	console.log('billData', billData);
	const routeParams = useParams();
	console.log('i am routeParams', routeParams);
	const StyledTableRow = withStyles(theme => ({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: 'lightgrey'
			}
		}
	}))(TableRow);

	const { control, watch, reset, handleSubmit, formState, getValues, register } = useForm({
		mode: 'onChange',
		defaultValuesDiscount
	});

	const {
		control: controlPaidValues,
		watch: watchPaidValues,
		reset: resetPaidValues,
		handleSubmit: handleSubmitPaidValues,
		formState: formStatePaidValues,
		getValues: getValuesPaidValues,
		register: registerPaidValues
	} = useForm({
		mode: 'onChange',
		defaultValuesPaidAmount
	});
	function createData(month, unit, amount, date, Tamount) {
		return { month, unit, amount, date, Tamount };
	}

	const { isValid, dirtyFields, errors } = formState;

	const id = watch('id');

	// /**
	//  * Initialize Dialog with Data
	//  */
	const initDialog = useCallback(() => {
		reset({
			...defaultValuesDiscount,
			current_reading: contactDialog.data?.current_reading
		});

		resetPaidValues({
			...defaultValuesPaidAmount,
			paid_amount: contactDialog.data?.paid_amount
		});

		//call the api for data
		console.log('bill', contactDialog);
		instance.get(`/api/bills/${contactDialog?.data?.id}`).then(res => setBillData(res.data));
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
				console.log('response', JSON.stringify(response.data));
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
		dispatch(getBillData(contactDialog?.data?.id));
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
						<Button variant="contained" to={`/billing/${contactDialog.data?.id}/pdf-bill`} component={Link}>
							<PrintIcon />
						</Button>
					</motion.div>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex gap-36">
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
											label="Paid Amount"
											id="discont"
											variant="outlined"
											fullWidth
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
									// disabled={_.isEmpty(dirtyFields) || !isValid}
								>
									Add Payment
								</Button>
							</div>
							<div style={{ height: '40rem', overflow: 'scroll' }} className="mt-10">
								{GetBillsData?.payment_history?.map((item, index) => {
									return (
										// <Card className="p-10 m-10">
										<Typography className="p-10 m-10">
											<b>Paid </b>PKR {item?.amount} <b>, Date </b> {item?.payment_date}
										</Typography>
										// </Card>
									);
								})}
							</div>
						</Card>
					</form>
					<div className="flex w-2/5	 flex-col gap-24">
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
											/>
										)}
									/>
								</div>
								<div className="px-16">
									<Button
										variant="contained"
										color="secondary"
										type="submit"
										// disabled={_.isEmpty(dirtyFields) || !isValid}
									>
										Update Bill
									</Button>
								</div>
							</Card>
						</form>
						<Card className="w-full" style={{ padding: '2rem' }}>
							<Typography color="error">
								<b>Due Date: </b>
								{contactDialog?.data?.due_date}
							</Typography>
							<Typography>
								<b>Units:</b>{' '}
								{contactDialog?.data?.current_reading - contactDialog?.data?.previous_reading}{' '}
							</Typography>
							<Typography>
								<b>Previous Reading:</b> {GetBillsData?.previous_reading}{' '}
							</Typography>
							<Typography>
								{' '}
								<b>Arrears: </b>
								{GetBillsData.arrears}
							</Typography>
							<Typography>
								{' '}
								<b>Total FPA:</b> {GetBillsData.fpa_charges}
							</Typography>
							<Typography>
								<b>Current Bill:</b> {GetBillsData.electricity_charges}
							</Typography>
							<Typography>
								<b>Society Charges:</b> {GetBillsData.society_charges}
							</Typography>
							<Typography>
								<b>Total Payables:</b> {GetBillsData.total_bill}{' '}
							</Typography>
							<Typography>
								<b>Total Paid:</b> {GetBillsData.amount_paid}{' '}
							</Typography>
						</Card>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ContactDialog;
