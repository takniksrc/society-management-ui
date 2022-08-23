import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import FuseUtils from '@fuse/utils';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { Controller, useFormContext, useForm } from 'react-hook-form';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DateTimePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import reducer from '../store';
import {
	openEditContactDialog,
	openNewContactDialog,
	setContactsSearchText,
	removeUser,
	toggleStarredContact,
	selectUsers
} from '../store/newUsersSlice';
import { selectBoards, newBoard, getBoards, resetBoards } from '../store/boardsSlice';
import societyChargesIcon from '../../../../assets/ServicesIcon/society-charges-icon.png';
import consumptionChragesIcon from '../../../../assets/ServicesIcon/consumption-based-icon.png';
import AllBills from './AllBills';

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

function BillsMiddleSection(props) {
	const mainTheme = useSelector(selectMainTheme);

	const dispatch = useDispatch();
	// const boards = useSelector(selectBoards);
	// const searchText = useSelector(({ newUsersSlice }) => newUsersSlice.searchText);

	const boards = [
		{ id: '1', name: 'Electricity Khaban-e-Amin', uri: 'electricity-khayaban-amin', icon: consumptionChragesIcon }
	];
	console.log('I am boards', boards);

	const classes = useStyles(props);
	// const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

	useEffect(() => {
		dispatch(getBoards());
		return () => {
			dispatch(resetBoards());
		};
	}, [dispatch]);

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
	const [selectedCategory, setSelectedCategory] = useState('house');
	const payment = [
		{ id: 0, value: 'card', label: 'Card', color: '#2196f3' },
		{ id: 1, value: 'cash', label: 'Cash', color: '#2196f3' },
	];
	const [serie, setSerie] = useState('daily');
	const [payments, setPayments] = useState('card');


	const data = [
		{ id: 0, value: 'daily', label: 'Daily', color: '#2196f3' },
		{ id: 1, value: 'weekly', label: 'Weekly', color: '#2196f3' },
		{ id: 2, value: 'monthly', label: 'Monthly', color: '#2196f3' }
	];
	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}
	// const dispatch = useDispatch();
	const contacts = useSelector(selectUsers);
	const allBills = contacts[0]?.customer
	const searchText = useSelector(({ newUsersSlice }) => newUsersSlice.searchText);
	console.log('I am customers bills', allBills);
	console.log('I am search text', searchText);
	// const user = useSelector(({ newUsersSlice }) => newUsersSlice.user);
	// console.log('I am user se', user);
	const [filteredData, setFilteredData] = useState(null);
	console.log('I am filtered', filteredData);

	const columns = useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.id);

					return (
						selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				// Cell: ({ row }) => {
				// 	return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
				// },
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'Name',
				accessor: 'name',
				className: 'font-medium',
				sortable: true
			},
			{
				Header: 'Property Size',
				accessor: 'property-size',
				sortable: true
			},
			{
				Header: 'Property Type',
				accessor: 'role',
				sortable: true
			},
			{
				Header: 'Meter No.',
				accessor: '',
				sortable: true
			},
			{
				Header: 'Meter Type',
				accessor: '',
				sortable: true
			},
			{
				Header: 'billing Status',
				accessor: '',
				sortable: true
			},
			{
				id: 'action',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						{/* <IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(toggleStarredContact(row.original.id));
							}}
						>
							{user.starred && user.starred.includes(row.original.id) ? (
								<Icon className="text-yellow-700">star</Icon>
							) : (
								<Icon>star_border</Icon>
							)}
						</IconButton> */}
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(removeUser(row.original.id));
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</div>
				)
			}
		],
		[dispatch]
	);
	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return contacts;
			}
			return FuseUtils.filterArrayByString(contacts, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}

	// if (filteredData.length === 0) {
	// 	return (
	// 		<div className="flex flex-1 items-center justify-center h-full">
	// 			<Typography color="textSecondary" variant="h5">
	// 				There are no bills!
	// 			</Typography>
	// 		</div>
	// 	);
	// }

	return (
		

		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 flex-wrap w-full justify-center py-16 "
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
							<div className=" flex flex-wrap w-full justify-center px-16 flex-row">
								<div className="flex flex-1 items-center justify-center basis-1/4">
									<ThemeProvider theme={mainTheme}>
										<Paper
											component={motion.div}
											initial={{ y: -20, opacity: 0 }}
											animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
											className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
										>
											<Icon color="action">search</Icon>

											<Input
												placeholder="Search for anything"
												className="flex flex-1 px-16"
												disableUnderline
												fullWidth
												value={searchText}
												inputProps={{
													'aria-label': 'Search'
												}}
												onChange={ev => dispatch(setContactsSearchText(ev))}
											/>
										</Paper>
									</ThemeProvider>
								</div>
								<div className="flex flex-row items-center justify-between m-24 space-x-20 basis-1/4">
									{/* <div> */}
									<FormControl className="" variant="filled">
										<Select
											classes={{ select: 'py-8' }}
											value={serie}
											onChange={ev => setSerie(ev.target.value)}
										>
											{data.map(category => (
												<MenuItem value={category.value} key={category.id}>
													{category.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									{/* </div> */}
									{/* <div className="flex flex-row items-center justify-between"> */}
									{/* <div> */}
									<FormControl className="" variant="filled">
										<Select
											classes={{ select: 'py-8' }}
											value={payments}
											onChange={ev => setPayments(ev.target.value)}
										>
											{payment.map(pay => (
												<MenuItem value={pay.value} key={pay.id}>
													{pay.label}
												</MenuItem>
											))}
										</Select>
									</FormControl>
									{/* </div> */}
									{/* </div> */}
								</div>

								<motion.div
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
									className="flex flex-1 items-center justify-center px-12 space-x-20 basis-1/2"
								>
									{/* <Button
										variant="contained"
										color="secondary"
										className="w-full"
										// onClick={ev => dispatch(openNewContactDialog())}
									>
										Add FPA this month
									</Button> */}
									<Button
										variant="contained"
										color="secondary"
										className="w-full"
										onClick={ev => dispatch(openNewContactDialog())}
									>
										Download PDF
									</Button>
									<Button
										variant="contained"
										color="secondary"
										className="w-full"
										onClick={ev => dispatch(openNewContactDialog())}
									>
										Upload Payemnts
									</Button>
								</motion.div>
							</div>
							{/* <motion.div
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
							> */}
							{/* </motion.div> */}
						</Paper>
					</motion.div>
				</motion.div>
			</div>


		</div>
	
	);
}

export default withReducer('scrumboardApp', reducer)(BillsMiddleSection);
