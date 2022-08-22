import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { DateTimePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import reducer from '../store';
// import { selectBoards, newBoard, getBoards, resetBoards } from '../store/boardsSlice';
import societyChargesIcon from '../../../../assets/ServicesIcon/society-charges-icon.png';
import consumptionChragesIcon from '../../../../assets/ServicesIcon/consumption-based-icon.png';

const defaultValues = {
	id: '',
	title: '',
	notes: '',
	startDate: new Date(),
	dueDate: new Date(),
	labels: []
};
const useStyles = makeStyles(theme => ({
	root: {},
	board: {
		cursor: 'pointer',
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	newBoard: {}
}));

function GBData(props) {
	const dispatch = useDispatch();
	// const boards = useSelector(selectBoards);
	const boards = [
		{ id: '1', name: 'Electricity Khaban-e-Amin', uri: 'electricity-khayaban-amin', icon: consumptionChragesIcon }
	];
	console.log('I am boards', boards);

	const classes = useStyles(props);
	// const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

	// useEffect(() => {
	// 	dispatch(getBoards());
	// 	return () => {
	// 		dispatch(resetBoards());
	// 	};
	// }, [dispatch]);

	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};
	const methods = useFormContext();
	const schema = yup.object().shape({
		title: yup.string().required('You must enter a title')
	});
	const { watch, handleSubmit, formState, reset, control, setValue } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});
	const dueDate = watch('deuDate');
	const startDate = watch('startDate');

	const { errors, isValid, dirtyFields } = formState;
	const [selectedCategory, setSelectedCategory] = useState('all');
	const categories = [
		{ id: 0, value: 'house', label: 'House', color: '#2196f3' },
		{ id: 1, value: 'plot', label: 'Plot', color: '#2196f3' },
		{ id: 2, value: 'flat', label: 'Flat', color: '#2196f3' }
	];
	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}
	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
				<Typography className="mt-14 sm:mt-48 sm:py-11 text-32 sm:text-40 font-bold" color="inherit">
					Electricity Billing
				</Typography>
			</motion.div>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 flex-wrap w-full justify-center py-32"
				>
					<motion.div variants={item} className="h-auto p-16" key={1}>
						<Paper
							// to={`/services/boards/consumption-based-charges/${board.id}/${board.uri}`}
							className={clsx(
								classes.board,
								'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
							)}
							role="button"
							component={Link}
						>
							<div className=" flex flex-wrap w-full justify-center py-32 px-16">
								<FormControl
									className="flex w-full sm:w-320 -mx-4 mt-8 mb-16 ml-px"
									style={{ margin: '2rem' }}
									variant="outlined"
								>
									<InputLabel htmlFor="category-label-placeholder"> All Blocks </InputLabel>
									<Select
										value={selectedCategory}
										onChange={handleSelectedCategory}
										input={
											<OutlinedInput
												labelWidth={'category'.length * 9}
												name="category"
												id="category-label-placeholder"
											/>
										}
									>
										<MenuItem value="all">
											<em> All </em>
										</MenuItem>
										{categories.map(category => (
											<MenuItem value={category.value} key={category.id}>
												{category.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<div className="flex -mx-4 " style={{ margin: '1.3rem' }}>
									<Controller
										name="startDate"
										control={control}
										defaultValue=""
										render={({ field: { onChange, value } }) => (
											<DateTimePicker
												label="Start Date"
												inputVariant="outlined"
												value={value}
												onChange={onChange}
												className="mt-8 mb-16 mx-4 flex w-full mb-16 ml-px mr-24"
												maxDate={dueDate}
											/>
										)}
									/>

									<Controller
										name="dueDate"
										control={control}
										defaultValue=""
										render={({ field: { onChange, value } }) => (
											<DateTimePicker
												label="Due Date"
												inputVariant="outlined"
												value={value}
												onChange={onChange}
												className="mt-8 mb-16 mx-4 flex w-full mb-16 ml-px"
												minDate={startDate}
											/>
										)}
									/>
								</div>
								<FormControl
									className="flex w-full sm:w-320 -mx-4 mt-8 mb-16 ml-px"
									style={{ margin: '2rem' }}
									variant="outlined"
								>
									<InputLabel htmlFor="category-label-placeholder"> Company </InputLabel>
									<Select
										value={selectedCategory}
										onChange={handleSelectedCategory}
										input={
											<OutlinedInput
												labelWidth={'category'.length * 9}
												name="category"
												id="category-label-placeholder"
											/>
										}
									>
										<MenuItem value="all">
											<em> All </em>
										</MenuItem>
										{categories.map(category => (
											<MenuItem value={category.value} key={category.id}>
												{category.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
							<div className="px-16">
								<Button
									type="submit"
									variant="contained"
									color="secondary"
									to="/billing/boards/1/electrcity-bills/billing"
									component={Link}

									// disabled={_.isEmpty(dirtyFields) || !isValid}
								>
									Generate Bills
								</Button>
							</div>
						</Paper>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}

export default withReducer('scrumboardApp', reducer)(GBData);
