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
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					// disabled={_.isEmpty(dirtyFields) || !isValid}
					// onClick={handleSaveProduct}
				>
					Save
				</Button>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					// onClick={handleRemoveProduct}
					startIcon={<Icon className="hidden sm:flex">delete</Icon>}
				>
					Remove
				</Button>
			</motion.div>
		</div>
	);
}

export default DescriptionTab;
