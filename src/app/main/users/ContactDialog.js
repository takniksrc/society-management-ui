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
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import _ from '@lodash';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import * as yup from 'yup';

import { removeUser, updateUser, addUser, closeNewContactDialog, closeEditContactDialog } from './store/newUsersSlice';

const defaultValues = {
	id: '',
	name: '',
	email: '',
	role: ''
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter a name')
});

function ContactDialog(props) {
	const [role, setRole] = useState('');
	const roles = [
		{ id: 0, value: 'admin', label: 'Admin', color: '#2196f3' },
		{ id: 1, value: 'worker', label: 'Worker', color: '#2196f3' },
		{ id: 2, value: 'accountant', label: 'Accountant', color: '#2196f3' }
	];
	const handleRole = event => {
		setRole(event.target.value);
	};

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
							<Icon color="action">email</Icon>
						</div>
						<FormControl className="flex w-full -mx-4 mb-16" variant="outlined">
							<InputLabel htmlFor="category-label-placeholder"> Role </InputLabel>
							<Select
								value={role}
								onChange={handleRole}
								input={
									<OutlinedInput
										labelWidth={'category'.length * 9}
										name="role"
										id="category-label-placeholder"
									/>
								}
							>
								{roles.map(category => (
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
