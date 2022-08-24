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
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { DateTimePicker } from '@material-ui/pickers';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { motion } from 'framer-motion';
import _ from '@lodash';
import * as yup from 'yup';

import { removeUser, updateUser, addUser, closeNewContactDialog, closeEditContactDialog } from '../store/newUsersSlice';

const defaultValues = {
	id: '',
	name: '',
	proprty_size: '',
	property_type: '',
	meter_no: '',
	meter_type: '',
	billing_status: '',
	startDate: new Date()
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter a name')
});

function ContactDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ newUsersSlice }) => newUsersSlice.newUsersSlice);
	console.log('I am clicked', contactDialog);

	const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const id = watch('id');
	const name = watch('name');
	const avatar = watch('avatar');

	// /**
	//  * Initialize Dialog with Data
	//  */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		console.log('inCallback');
		if (contactDialog.type === 'edit' && contactDialog.data) {
			reset({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			reset({
				...defaultValues,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, reset]);

	/**
	 * On Dialog Open
	 */
	useEffect(() => {
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	// /**
	//  * Close Dialog
	//  */
	function closeComposeDialog() {
		return contactDialog.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
	}

	// /**
	//  * Form Submit
	//  */
	function onSubmit(data) {
		if (contactDialog.type === 'new') {
			dispatch(addUser(data));
		} else {
			dispatch(updateUser({ ...contactDialog.data, ...data }));
		}
		closeComposeDialog();
	}

	// /**
	//  * Remove Event
	//  */
	function handleRemove() {
		dispatch(removeUser(id));
		closeComposeDialog();
	}
	const startDate = watch('startDate');

	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog?.type === 'new' ? 'New Bill' : 'Edit Bill'}
					</Typography>
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
						className="flex flex-2 ml-auto flex-row items-center justify-center ml-14 space-x-10 mt-10 "
					>
						<Button
							variant="contained"
							color="secondary"
							className="w-full"
							// onClick={ev => dispatch(openNewContactDialog())}
						>
							<PictureAsPdfIcon />
						</Button>
						<Button
							variant="contained"
							color="secondary"
							className="w-full"
							// onClick={ev => dispatch(openNewContactDialog())}
						>
							<PrintIcon />
						</Button>
					</motion.div>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					{contactDialog?.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{name}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>
						<Controller
							control={control}
							name="name"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Name"
									id="name"
									error={!!errors.name}
									helperText={errors?.name?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="email"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Email"
									id="email"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">house</Icon>
						</div>
						<Controller
							control={control}
							name="house_address"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="House Address"
									id="house_address"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="meter_no"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Meter No"
									id="meter_no"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="total_units"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Total Units"
									id="total_units"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							name="dueDate"
							control={control}
							defaultValue=""
							render={({ field: { onChange, value } }) => (
								<DateTimePicker
									label="Due Date"
									inputVariant="outlined"
									value={value}
									onChange={onChange}
									id="dueDate"
									className="mt-8 mb-16 mx-4 flex w-full mb-16 ml-px"
									minDate={startDate}
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="arrears"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Arrear's-May"
									id="arrears"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="fpa"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Total FPA"
									id="fpa"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="current_bill"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Current Bill"
									id="current_bill"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="society_charges"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Society Charges"
									id="society_charges"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="previous_meter_rating"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Previous Meter Rating"
									id="previous_meter_rating"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="current_meter_readng"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Current Meter Reading"
									id="current_meter_readng"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="total_payable"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Total Payable"
									id="total_payable"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="after_duedate"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Payable After due Date"
									id="after_duedate"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<Controller
							control={control}
							name="discount"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="discount"
									id="discount"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
				</DialogContent>

				{contactDialog?.type === 'new' ? (
					<DialogActions className="justify-between p-4 pb-16">
						<div className="px-16">
							<Button
								variant="contained"
								color="secondary"
								type="submit"
								disabled={_.isEmpty(dirtyFields) || !isValid}
							>
								Add
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-4 pb-16 ml-auto">
						<div className="px-16">
							<Button
								variant="contained"
								color="secondary"
								type="submit"
								disabled={_.isEmpty(dirtyFields) || !isValid}
							>
								Save
							</Button>
						</div>
						{/* <IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton> */}
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default ContactDialog;
