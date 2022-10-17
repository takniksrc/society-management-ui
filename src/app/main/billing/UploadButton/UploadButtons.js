import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	}
}));

export default function UploadButtons() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" />
			<label htmlFor="contained-button-file">
				<Button
					variant="outlined"
					className="flex w-full w-2/6 sm:w-320 -mx-4 mt-6 mb-16 ml-px"
					color="primary"
				>
					Upload
				</Button>
				{/* <Button
					className="flex w-full sm:w-320 -mx-4 mt-6 mb-16 ml-px"
					variant="outlined"
					color="primary"
					component="span"
				>
					Upload
				</Button> */}
			</label>
			<input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
		</div>
	);
}
