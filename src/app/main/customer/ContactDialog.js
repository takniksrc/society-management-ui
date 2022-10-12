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
import FuseDialog from '@fuse/core/FuseDialog';
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
	console.log('contactDialog inside contact : ', contactDialog);
	// console.log('block inside contact : ', configurationsData?.blocks[0]?.id);

	console.log('propertyTypes inside contact : ', propertyTypes);
	console.log('customerTypes inside contact: ', customerTypes);
	console.log('propertySize inside contact: ', propertySizes);

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
		dispatch(getConfigurations());
	}, [dispatch]);

	const handleCustomerType = event => {
		console.log('event target value', event.target.value);
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
		console.log('event.target', event.target);
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
		phone_number: '',
		email: '',
		customer_type: '',
		property_type: '',
		property_size: '',
		meter_number: '',
		meter_status: '',
		meter_phase: '',
		meter_type: '',
		company: '', // TODO
		sector: '',
		block: '',
		street_address: '',
		current_reading: ''
	};

	/**
	 * Form Validation Schema
	 */
	const schema = yup.object().shape(
		{
			name: yup.string().required('You must enter a name').max(60, 'Maximum 60 digits'),
			street_address: yup.string().required('You must enter address').max(30, 'Maximum 30 digits'),
			reference_number: yup
				.string()
				.required('Required')
				.matches(/^[0-9]+$/, 'Must be only digits')
				.min(1, 'Minimum 1 digits')
				.max(15, 'Maximum 15 digits'),
			meter_number: yup.string().when('meter_number', value => {
				if (value) {
					return yup
						.string()
						.min(1, 'Minimum 1 digits')
						.max(15, 'Maximum 15 digits')
						.matches(/^[0-9]+$/, 'Must be only digits');
				}
				return yup
					.string()
					.transform((value, originalValue) => {
						if (!value) {
							return null;
						}
						return originalValue;
					})
					.nullable()
					.optional();
			}),
			block: yup.string().required('Must enter block'),
			customer_type: yup.string().required('Must enter customer type'),
			property_type: yup.string().required('Must enter property type'),
			property_size: yup.string().required('Must enter property size'),
			sector: yup.string().required('Must enter sector'),

			// phone_number: yup.string(),

			phone_number: yup.string().when('phone_number', value => {
				if (value) {
					return yup
						.string()
						.matches(/^[0-9]+$/, 'Must be only digits')
						.min(11, 'Minimum 11 digits')
						.max(11, 'Maximum 11 digits');
				}
				return yup
					.string()
					.transform((value, originalValue) => {
						if (!value) {
							return null;
						}
						return originalValue;
					})
					.nullable()
					.optional();
			}),
			cnic: yup.string().when('cnic', value => {
				if (value) {
					return yup
						.string()
						.matches(/^[0-9]+$/, 'Must be only digits')
						.min(13, 'Minimum 13 digits')
						.max(13, 'Maximum 13 digits');
				}
				return yup
					.string()
					.transform((value, originalValue) => {
						if (!value) {
							return null;
						}
						return originalValue;
					})
					.nullable()
					.optional();
			}),
			company: yup.string().when('company', value => {
				if (value) {
					return yup.string().max(50, 'Maximum 50 digits');
				}
				return yup
					.string()
					.transform((value, originalValue) => {
						if (!value) {
							return null;
						}
						return originalValue;
					})
					.nullable()
					.optional();
			}),
			current_reading: yup.string().when('current_reading', value => {
				if (value) {
					return yup.string().matches(/^[0-9]+$/, 'Must be only digits');
				}
				return yup
					.string()
					.transform((value, originalValue) => {
						if (!value) {
							return null;
						}
						return originalValue;
					})
					.nullable()
					.optional();
			}),

			email: yup.string().when('email', value => {
				if (value) {
					return yup.string().email();
				}
				return yup
					.string()
					.transform((value, originalValue) => {
						if (!value) {
							return null;
						}
						return originalValue;
					})
					.nullable()
					.optional();
			})

			// meter_phase: yup.string().required('Required').max(10, 'Phase must not be greater than 10 characters')
		},
		[
			['phone_number', 'phone_number'],
			['cnic', 'cnic'],
			['email', 'email'],
			['company', 'company'],
			['current_reading', 'current_reading'],
			['meter_number', 'meter_number']
		]
	);

	const { control, watch, reset, handleSubmit, formState, getValues, register, setValue } = useForm({
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
		console.log('inCallback', contactDialog.data);
		if (contactDialog.type === 'edit' && contactDialog.data) {
			reset({ ...contactDialog.data });
			console.log('drop down cust id', contactDialog.data.customer_type.id);
			setCustomerType(contactDialog.data.customer_type.id);
			setPropertyType(contactDialog.data.property_type_id);
			setPropertySize(contactDialog.data.property_size_id);
			setMeterPhase(contactDialog.data.meter_phase);
			setMeterStatus(contactDialog.data.meter_status);
			setBlock(contactDialog.data.block);
			setSector(contactDialog.data.sector);
			setMeterType(
				contactDialog?.data?.meter_type?.charAt(0).toUpperCase() + contactDialog?.data?.meter_type?.slice(1)
			);

			setValue('customer_type', contactDialog.data.customer_type.id);
			setValue('property_type', contactDialog.data.property_type_id);
			setValue('property_size', contactDialog.data.property_size_id);
			setValue('meter_phase', contactDialog.data.meter_phase);
			setValue('meter_status', contactDialog.data.meter_status);
			setValue('sector', contactDialog.data.sector);
			setValue('block', contactDialog.data.block);

			setValue(
				'meter_type',
				contactDialog.data.meter_type?.charAt(0).toUpperCase() + contactDialog?.data?.meter_type?.slice(1)
			);
			console.log(
				'ab',
				contactDialog.data.meter_type?.charAt(0).toUpperCase() + contactDialog.data.meter_type?.slice(1)
			);
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
			setCustomerType('c4010c54-84cc-4cfb-855c-34baba3a23e7');
			setValue('customer_type', 'c4010c54-84cc-4cfb-855c-34baba3a23e7');

			setPropertyType('9d047174-c72f-4042-9b6d-e995a6075b1f');
			setValue('property_type', '9d047174-c72f-4042-9b6d-e995a6075b1f');

			setPropertySize('2883cc33-a259-495d-993f-58a1d0a0d37a');
			setValue('property_size', '2883cc33-a259-495d-993f-58a1d0a0d37a');

			setMeterPhase('Single Phase');
			setMeterStatus('Active');
			setValue('meter_phase', 'Single Phase');
			setValue('meter_status', 'Active');
			setBlock('9277b430-79aa-4649-82d7-532e56dc209d');
			setValue('block', '9277b430-79aa-4649-82d7-532e56dc209d');

			setSector('1ea23d71-c0f6-4a22-a525-af3576bc36b5');
			setValue('sector', '1ea23d71-c0f6-4a22-a525-af3576bc36b5');

			setMeterType('Normal');
			setValue('meter_type', 'Normal');
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
		// closeComposeDialog();
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
			maxWidth="sm"
		>
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog?.type === 'new' ? 'New Customer' : 'Edit Customer'}
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
									fullWidth
									required
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
									// type="number"
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
							name="phone_number"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Phone"
									id="phone_number"
									variant="outlined"
									type="tel"
									fullWidth
									error={!!errors.phone_number}
									helperText={errors?.phone_number?.message}
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
									type="email"
									id="email"
									variant="outlined"
									fullWidth
									error={!!errors.email}
									helperText={errors?.email?.message}
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
							name="street_address"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Address"
									id="street_address"
									variant="outlined"
									required
									error={!!errors.street_address}
									helperText={errors?.street_address?.message}
									fullWidth
								/>
							)}
						/>
						<div className="min-w-48 pt-20 pl-16">
							<Icon color="action">location_city</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="block"> Blocks * </InputLabel>
							<Select
								value={block}
								onChange={handleBlock}
								name="block"
								inputProps={register('block', {
									required: 'Please enter block'
								})}
								input={<OutlinedInput labelWidth={'category'.length * 9} id="block" />}
							>
								{configurationsData?.blocks?.map(category => (
									<MenuItem
										value={category.id}
										key={category.id}
										selected="af17dc18-213d-40d1-80ea-8e6db9c2b67b"
									>
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
							<InputLabel htmlFor="category-label-placeholder"> Customer Type *</InputLabel>
							<Select
								value={customerType}
								onChange={handleCustomerType}
								name="customer_type"
								inputProps={register('customer_type', {
									required: 'Please enter customer type'
								})}
								input={<OutlinedInput labelWidth={'category'.length * 9} id="customer_type" />}
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
							<InputLabel htmlFor="category-label-placeholder"> Property Type *</InputLabel>
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
										id="property_type"
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
							<InputLabel htmlFor="category-label-placeholder"> Property Size *</InputLabel>
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
										id="property_size"
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
									// 	required: 'Please enter meter phase'
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
									// 	required: 'Please enter meter type'
								})}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="meter_type"
										id="category-label-placeholder"
									/>
								}
							>
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
									// 	required: 'Please enter meter status'
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
							<InputLabel htmlFor="category-label-placeholder"> Sector *</InputLabel>
							<Select
								value={sector}
								onChange={handleSector}
								inputProps={register('sector', {
									required: 'Please enter sector'
								})}
								input={<OutlinedInput labelWidth={'category'.length * 9} name="sector" id="sector" />}
							>
								{configurationsData?.sectors?.map(category => (
									<MenuItem value={category.id} key={category.id}>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20" style={{ marginRight: '-0.5rem' }}>
							<Icon color="action">home_work</Icon>
						</div>
						<Controller
							control={control}
							name="company"
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Meter Company"
									id="company"
									error={!!errors.company}
									helperText={errors?.company?.message}
									variant="outlined"
									// required
									fullWidth
								/>
							)}
						/>
					</div>
					{contactDialog?.type === 'new' ? (
						<div className="flex">
							<div className="min-w-48 pt-20" style={{ marginRight: '-0.5rem' }}>
								<Icon color="action">dvr</Icon>
							</div>
							<Controller
								control={control}
								name="current_reading"
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-24"
										label="Current Reading"
										id="current_reading"
										error={!!errors.current_reading}
										helperText={errors?.current_reading?.message}
										variant="outlined"
										// required
										fullWidth
									/>
								)}
							/>
						</div>
					) : (
						''
					)}
				</DialogContent>

				{contactDialog?.type === 'new' ? (
					<DialogActions className="justify-between p-4 pb-16">
						<div className="px-16">
							<Button variant="contained" color="secondary" type="submit" disabled={!isValid}>
								Add
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-4 pb-16">
						<div className="px-16">
							<Button variant="contained" color="secondary" type="submit" disabled={!isValid}>
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
