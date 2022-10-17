import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useFormContext, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

function DescriptionTab(props) {
	// const methods = useFormContext();
	const schema = yup.object().shape({
		description: yup.string().required('You must enter a description').max(200, 'Maximum 200 digits')
	});
	const methods = useFormContext();
	const { control, formState, register } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				control={control}
				name="description"
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="description"
						// label="Description"
						inputProps={{ maxLength: 200 }}
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default DescriptionTab;
