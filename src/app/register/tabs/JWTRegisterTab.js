import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect ,useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import * as yup from 'yup';
import _ from '@lodash';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter name'),
	email: yup.string().email('You must enter a valid email').required('You must enter a email'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
	// passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
	name: '',
	email: '',
	password: '',
	role: ''
	// passwordConfirm: ''
};

function JWTRegisterTab(props) {
	const dispatch = useDispatch();
	const authRegister = useSelector(({ auth }) => auth.register);
	const [role, setRole] = useState('');
	const roles = [
		{ id: 0, value: 'admin', label: 'Admin', color: '#2196f3' },
		{ id: 1, value: 'worker', label: 'Worker', color: '#2196f3' },
		{ id: 2, value: 'accountant', label: 'Accountant', color: '#2196f3' }
	];
	const handleRole = event => {
		setRole(event.target.value);
	};

	const { control, formState, handleSubmit, reset, setError, register } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	console.log('formstate', formState);

	useEffect(() => {
		authRegister.errors.forEach(error => {
			setError(error.type, {
				type: 'manual',
				message: error.message
			});
		});
	}, [authRegister.errors, setError]);

	function onSubmit(model) {
		console.log('I am model', model);
		dispatch(submitRegister(model));
	}

	return (
		<div className="w-full">
			<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							label="Name"
							error={!!errors.Name}
							helperText={errors?.Name?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											person
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="Email"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											email
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>
				<FormControl className="flex w-full mb-16" variant="outlined">
					<InputLabel htmlFor="category-label-placeholder"> Role </InputLabel>
					<Select
						value={role}
						onChange={handleRole}
						inputProps={register('role', {
							required: 'Please enter role'
						})}
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

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="password"
							label="Password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Controller
					name="passwordConfirmm"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="password"
							label="Confirm Password"
							error={!!errors.passwordConfirm}
							helperText={errors?.passwordConfirm?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="REGISTER"
					// disabled={_.isEmpty(dirtyFields) || !isValid}
					value="legacy"
				>
					Register
				</Button>
			</form>
		</div>
	);
}

export default JWTRegisterTab;
