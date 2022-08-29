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
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import _ from '@lodash';
import * as yup from 'yup';

import { removeUser, updateUser, addUser, closeNewContactDialog, closeEditContactDialog } from './store/newUsersSlice';

const defaultValues = {
	id: '',
	name: '',
	propertysize: '',
	propertytype: '',
	meterno: '',
	metertype: '',
	billingstatus: ''
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
	const [customerType, setCustomerType] = useState('');
	const customerstype = [
		{ id: 0, value: 'residential', label: 'Residential', color: '#2196f3' },
		{ id: 1, value: 'commercial', label: 'Commercial', color: '#2196f3' },
		{ id: 2, value: 'construction', label: 'Construction', color: '#2196f3' }
	];
	const handleCustomerType = event => {
		setCustomerType(event.target.value);
	};
	const [propertyType, setPropertyType] = useState('');
	const propertiestype = [
		{ id: 0, value: 'house', label: 'House', color: '#2196f3' },
		{ id: 1, value: 'plot', label: 'Plot', color: '#2196f3' },
		{ id: 2, value: 'flat', label: 'Flat', color: '#2196f3' }
	];
	const handlePropertyType = event => {
		setPropertyType(event.target.value);
	};
	const [propertySize, setPropertySize] = useState('');
	const propertiessize = [
		{ id: 0, value: '4marla', label: '4 Marla', color: '#2196f3' },
		{ id: 1, value: '8marla', label: '8 Marla', color: '#2196f3' },
		{ id: 2, value: '12marla', label: '12 Marla', color: '#2196f3' }
	];
	const handleProperty = event => {
		setPropertySize(event.target.value);
	};
	const [meterPhase, setMeterPhase] = useState('');
	const metersphase = [
		{ id: 0, value: 'singlephase', label: 'Single Phase', color: '#2196f3' },
		{ id: 1, value: '2phase', label: '2 Phase', color: '#2196f3' },
		{ id: 2, value: '3phase', label: '3 Phase', color: '#2196f3' }
	];
	const handleMeterPhase = event => {
		setMeterPhase(event.target.value);
	};
	const [meterType, setMeterType] = useState('');
	const meterstype = [
		{ id: 0, value: 'normal', label: 'Normal', color: '#2196f3' },
		{ id: 1, value: 'mco', label: 'MCO', color: '#2196f3' }
	];
	const handleMeterType = event => {
		setMeterType(event.target.value);
	};
	const [meterStatus, setMeterStatus] = useState('');
	const metersstatus = [
		{ id: 0, value: 'active', label: 'Active', color: '#2196f3' },
		{ id: 1, value: 'temperorllydisconnect', label: 'Temporarlly Disconect', color: '#2196f3' },
		{ id: 2, value: 'permanentdisconect', label: 'Permanent Disconect', color: '#2196f3' }
	];
	const handleMeterStatus = event => {
		setMeterStatus(event.target.value);
	};
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
						{contactDialog?.type === 'new' ? 'New Contact' : 'Edit Contact'}
					</Typography>
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
							<Icon color="action">confirmation_number</Icon>
						</div>
						<Controller
							control={control}
							name="reference_number"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Reference Number"
									id="reference_number"
									variant="outlined"
									type="number"
									fullWidth
								/>
							)}
						/>
					</div>
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
									label="Customer Name"
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
							<Icon color="action">contact_mail</Icon>
						</div>
						<Controller
							control={control}
							name="cnic"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="CNIC"
									id="cnic"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">phone</Icon>
						</div>
						<Controller
							control={control}
							name="phone"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Phone"
									id="phone"
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
							<Icon color="action">location_on</Icon>
						</div>
						<Controller
							control={control}
							name="address"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Address"
									id="address"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
						<div className="min-w-48 pt-20 pl-16">
							<Icon color="action">location_city</Icon>
						</div>
						<Controller
							control={control}
							name="block"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Block"
									id="block"
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
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Customer Type </InputLabel>
							<Select
								value={customerType}
								onChange={handleCustomerType}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="customer_type"
										id="category-label-placeholder"
									/>
								}
							>
								{/* <MenuItem value="all">
									<em> All </em>
								</MenuItem> */}
								{customerstype.map(category => (
									<MenuItem value={category.value} key={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Property Type </InputLabel>
							<Select
								value={propertyType}
								onChange={handlePropertyType}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="property_type"
										id="category-label-placeholder"
									/>
								}
							>
								{/* <MenuItem value="all">
									<em> All </em>
								</MenuItem> */}
								{propertiestype.map(category => (
									<MenuItem value={category.value} key={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="min-w-48 pt-20 pl-12">
							<Icon color="action">email</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Property Size </InputLabel>
							<Select
								value={propertySize}
								onChange={handleProperty}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="property_size"
										id="category-label-placeholder"
									/>
								}
							>
								{/* <MenuItem value="all">
									<em> All </em>
								</MenuItem> */}
								{propertiessize.map(category => (
									<MenuItem value={category.value} key={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
					<div className="min-w-48 pt-20">
							<Icon color="action">location_city</Icon>
						</div>
						<Controller
							control={control}
							name="meter_number"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Meter Number"
									id="meter_number"
									variant="outlined"
									fullWidth
								/>
							)}
						/>
						<div className="min-w-48 pt-20 pl-12">
							<Icon color="action">email</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Meter Phase </InputLabel>
							<Select
								value={meterPhase}
								onChange={handleMeterPhase}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="meter_phase"
										id="category-label-placeholder"
									/>
								}
							>
								{/* <MenuItem value="all">
									<em> All </em>
								</MenuItem> */}
								{metersphase.map(category => (
									<MenuItem value={category.value} key={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Meter Type </InputLabel>
							<Select
								value={meterType}
								onChange={handleMeterType}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="meter_type"
										id="category-label-placeholder"
									/>
								}
							>
								{/* <MenuItem value="all">
									<em> All </em>
								</MenuItem> */}
								{meterstype.map(category => (
									<MenuItem value={category.value} key={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="min-w-48 pt-20 pl-12">
							<Icon color="action">email</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Meter Status </InputLabel>
							<Select
								value={meterStatus}
								onChange={handleMeterStatus}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="meter_status"
										id="category-label-placeholder"
									/>
								}
							>
								{/* <MenuItem value="all">
									<em> All </em>
								</MenuItem> */}
								{metersstatus.map(category => (
									<MenuItem value={category.value} key={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>
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
					<DialogActions className="justify-between p-4 pb-16">
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
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default ContactDialog;
