import FuseUtils from '@fuse/utils/FuseUtils';
import { yupResolver } from '@hookform/resolvers/yup';
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

import { motion } from 'framer-motion';
import _ from '@lodash';
import * as yup from 'yup';
import instance from 'axiosinstance';

import { removeUser, closeNewContactDialog, closeEditContactDialog } from '../store/newUsersSlice';
import { Card } from '@material-ui/core';

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
	const [billData, setBillData] = useState({});
	console.log('I am cliked data ', contactDialog);
	console.log('billData', billData);

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
		console.log('id', contactDialog?.data?.id);
		instance.get(`/api/bills/${contactDialog?.data?.id}`).then(res => setBillData(res.data));
	}, [contactDialog.data, contactDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

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
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const onSubmitPaidValuesForm = data => {
		console.log('data in paid', data);
		instance
			.post(`/api/bills/payment/${contactDialog?.data?.id}`, {
				amount: data.paid_amount
			})
			.then(function (response) {
				console.log('response', JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="sm"
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
				<Card style={{ padding: '2rem' }}>
					<Typography color="error">Due Date: {contactDialog?.data?.due_date}</Typography>
					<Typography>
						Units: {contactDialog?.data?.current_reading - contactDialog?.data?.previous_reading}{' '}
					</Typography>
					<Typography>Previous Reading: {contactDialog.data?.previous_reading} </Typography>
					<Typography>Arrears: {contactDialog.data?.arrears}</Typography>
					<Typography>Total FPA: {contactDialog.data?.fpa_charges}</Typography>
					<Typography>Current Bill: {contactDialog.data?.electricity_charges}</Typography>
					<Typography>Society Charges: {contactDialog.data?.society_charges}</Typography>
					<Typography>Total Payables: {contactDialog.data?.total_bill} </Typography>
				</Card>

				<div className="flex gap-36 mt-24">
					<form className="w-1/2" noValidate onSubmit={handleSubmit(onSubmitDiscountValuesForm)}>
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
					<form className="w-1/2" noValidate onSubmit={handleSubmitPaidValues(onSubmitPaidValuesForm)}>
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
									// disabled={_.isEmpty(dirtyFields) || !isValid}
								>
									Add Payment
								</Button>
							</div>
						</Card>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ContactDialog;
