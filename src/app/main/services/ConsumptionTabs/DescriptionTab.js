import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useFormContext, Controller } from 'react-hook-form';

function DescriptionTab(props) {
	const methods = useFormContext();
	const { control, formState } = methods;
	const { errors } = formState;

	return (
		<div>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						id="description"
						label="Description"
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
