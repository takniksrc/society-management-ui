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
	const schema = yup.object().shape({
		description: yup.string().required('You must enter a description').max(200, 'Maximum 200 digits'),

	});
	const methods = useFormContext();
	const { control, formState, register } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="description"
				control={control}
				// {...register('description', { required: true, maxLength: 5 })}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="description"
						// label="Description"
						// maxlength={5}
						inputProps={{ maxLength: 200 }}
						// error={!!errors.description}
						// helperText={errors?.description?.message}
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>
			{/* {errors.description && errors.description.type === 'required' && <span>This is required</span>}
			{errors.description && errors.description.type === 'maxLength' && <span>Max length exceeded</span>} */}
		</div>
	);
}

export default DescriptionTab;
