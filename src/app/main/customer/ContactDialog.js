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
import { useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import * as yup from 'yup';
import { getPropertyTypes } from './store/propertyTypesSlice';
import { getCustomerTypes } from './store/customerTypesSlice';
import { getPropertySizes } from './store/propertySizesSlice';
import { getConfigurations } from '../../fuse-configs/store/configSlice';

import {
	removeCustomer,
	updateCustomer,
	addCustomer,
	closeNewContactDialog,
	closeEditContactDialog
} from './store/newCustomersSlice';

function ContactDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ newCustomersSlice }) => newCustomersSlice.newCustomersSlice);
	const propertyTypes = useSelector(({ propertyTypesSlice }) => propertyTypesSlice);
	const propertySizes = useSelector(({ propertySizesSlice }) => propertySizesSlice);
	const customerTypes = useSelector(({ customerTypesSlice }) => customerTypesSlice);
	const configurationsData = useSelector(({ configSlice }) => configSlice);
	console.log('configSlice inside contact : ', configurationsData);

	console.log('propertyTypes inside contact : ', propertyTypes);
	console.log('customerTypes inside contact: ', customerTypes);

	const [customerType, setCustomerType] = useState('');
	const [sector, setSector] = useState('');
	const [block, setBlock] = useState('');

	const [propertyType, setPropertyType] = useState('');
	const [propertySize, setPropertySize] = useState('');
	const [meterPhase, setMeterPhase] = useState('');
	const [meterType, setMeterType] = useState('');
	const [meterStatus, setMeterStatus] = useState('');

	useDeepCompareEffect(() => {
		dispatch(getCustomerTypes());
		dispatch(getConfigurations())
	}, [dispatch]);

	// const customerstype = [
	// 	{ id: 0, value: customerType.id, label: 'Residential', color: '#2196f3' },
	// 	{ id: 1, value: customerType.id,, label: 'Commercial', color: '#2196f3' },
	// 	{ id: 2, value: customerType.id,, label: 'Construction', color: '#2196f3' }
	// ];

	const handleCustomerType = event => {
		setCustomerType(event.target.value);
		// console.log('clicked', customerType);
	};
	
	const handleBlock = event => {
		setBlock(event.target.value);
		// console.log('clicked', customerType);
	};
	const handleSector = event => {
		setSector(event.target.value);
		// console.log('clicked', customerType);
	};
	
	const handlePropertyType = event => {
		setPropertyType(event.target.value);
	};
	
	const handleProperty = event => {
		setPropertySize(event.target.value);
	};

	const handleMeterPhase = event => {
		setMeterPhase(event.target.value);
	};
	
	const handleMeterType = event => {
		setMeterType(event.target.value);
	};

	const handleMeterStatus = event => {
		setMeterStatus(event.target.value);
	};
	console.log('I am customer type', customerType);
	const defaultValues = {
		id: '',
		reference_number: '',
		name: '',
		cnic: '',
		phone: '',
		email: '',
		customer_type: '',
		property_type: '',
		property_size: '',
		meter_number: '',
		meter_status: '',
		meter_phase: '',
		meter_type:'',
		company: 'sms', // TODO
		sector: '',
		block: '',
		address: ''
	};

	/**
	 * Form Validation Schema
	 */
	const schema = yup.object().shape({
		name: yup.string().required('You must enter a name'),

		reference_number: yup
			.string()
			.required('Required')
			.matches(/^[0-9]+$/, 'Must be only digits')
			.min(7, 'Must be exactly 7 digits')
			.max(7, 'Must be exactly 7 digits'),

		cnic: yup
			.string()
			.required('Required')
			.matches(/^[0-9]+$/, 'Must be only digits')
			.min(13, 'Must be exactly 13 digits')
			.max(13, 'Must be exactly 13 digits'),

		meter_number: yup
			.string()
			.required('Required')
			.matches(/^[0-9]+$/, 'Must be only digits')
			.min(7, 'Must be exactly 7 digits')
			.max(7, 'Must be exactly 7 digits'),

		phone: yup
			.string()
			.required('Required')
			.matches(/^[0-9]+$/, 'Must be only digits')
			.min(11, 'Must be exactly 11 digits')
			.max(11, 'Must be exactly 11 digits')

		// meter_phase: yup.string().required('Required').max(10, 'Phase must not be greater than 10 characters')
	});

	const { control, watch, reset, handleSubmit, formState, getValues, register } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const id = watch('id');
	const name = watch('name');
	const avatar = watch('avatar');

	useEffect(() => {
		dispatch(getPropertyTypes(customerType));
	}, [customerType]);

	useEffect(() => {
		dispatch(getPropertySizes(propertyType));
	}, [propertyType]);

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
		console.log('data in customer submit', data);
		if (contactDialog.type === 'new') {
			dispatch(addCustomer(data));
		} else {
			dispatch(updateCustomer({ ...contactDialog.data, ...data }));
		}
		closeComposeDialog();
	}

	// /**
	//  * Remove Event
	//  */
	function handleRemove() {
		dispatch(removeCustomer(id));
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
									error={!!errors.reference_number}
									helperText={errors?.reference_number?.message}
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
									type="number"
									className="mb-24"
									label="CNIC"
									id="cnic"
									variant="outlined"
									fullWidth
									error={!!errors.cnic}
									helperText={errors?.cnic?.message}
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
									type="number"
									fullWidth
									error={!!errors.phone}
									helperText={errors?.phone?.message}
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
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Blocks </InputLabel>
							<Select
								value={block}
								onChange={handleBlock}
								inputProps={register('block', {
									required: 'Please enter block'
								})}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="block"
										id="category-label-placeholder"
									/>
								}
							>
								{configurationsData?.blocks?.map(category => (
									<MenuItem value={category.id} key={category.id}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">people_alt</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Customer Type </InputLabel>
							<Select
								value={customerType}
								onChange={handleCustomerType}
								inputProps={register('customer_type', {
									required: 'Please enter customer type'
								})}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="customer_type"
										id="category-label-placeholder"
									/>
								}
							>
								{customerTypes?.map(category => (
									<MenuItem value={category.id} key={category.id}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">home_work</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Property Type </InputLabel>
							<Select
								value={propertyType}
								onChange={handlePropertyType}
								inputProps={register('property_type', {
									required: 'Please enter property type'
								})}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="property_type"
										id="category-label-placeholder"
									/>
								}
							>
								{propertyTypes.map(category => (
									<MenuItem value={category.id} key={category.id}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="min-w-48 pt-20 pl-12">
							<Icon color="action">home_work</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Property Size </InputLabel>
							<Select
								value={propertySize}
								onChange={handleProperty}
								inputProps={register('property_size', {
									required: 'Please enter property size'
								})}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="property_size"
										id="category-label-placeholder"
									/>
								}
							>
								{propertySizes.map(category => (
									<MenuItem value={category.id} key={category.id}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">dvr</Icon>
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
									error={!!errors.meter_number}
									helperText={errors?.meter_number?.message}
								/>
							)}
						/>
						<div className="min-w-48 pt-20 pl-12">
							<Icon color="action">hdr_weak</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Meter Phase </InputLabel>
							<Select
								value={meterPhase}
								onChange={handleMeterPhase}
								inputProps={register('meter_phase', {
									required: 'Please enter meter phase'
								})}
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
								{configurationsData?.meter_phases?.map(category => (
									<MenuItem value={category.name} key={category.name}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">dvr</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Meter Type </InputLabel>
							<Select
								value={meterType}
								onChange={handleMeterType}
								inputProps={register('meter_type', {
									required: 'Please enter meter type'
								})}
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
								{configurationsData?.meter_types?.map(category => (
									<MenuItem value={category.name} key={category.name}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="min-w-48 pt-20 pl-12">
							<Icon color="action">dvr</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Meter Status </InputLabel>
							<Select
								value={meterStatus}
								onChange={handleMeterStatus}
								inputProps={register('meter_status', {
									required: 'Please enter meter status'
								})}
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
								{configurationsData?.meter_statuses?.map(category => (
									<MenuItem value={category.name} key={category.name}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">people_alt</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Sector</InputLabel>
							<Select
								value={sector}
								onChange={handleSector}
								inputProps={register('sector', {
									required: 'Please enter sector'
								})}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="sector"
										id="category-label-placeholder"
									/>
								}
							>
								{configurationsData?.sectors?.map(category => (
									<MenuItem value={category.id} key={category.id}>
										{category.name}
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
