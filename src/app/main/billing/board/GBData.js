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
import UploadButtons from 'app/main/Button/UploadButtons';
import { DateTimePicker } from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Link, useHistory } from 'react-router-dom';
import reducer from '../store';
// import { selectBoards, newBoard, getBoards, resetBoards } from '../store/boardsSlice';
import societyChargesIcon from '../../../../assets/ServicesIcon/society-charges-icon.png';
import consumptionChragesIcon from '../../../../assets/ServicesIcon/consumption-based-icon.png';
import instance from 'axiosinstance';

import NotificationModel from '../../../shared-components/notificationPanel/model/NotificationModel';
import NotificationCard from '../../../shared-components/notificationPanel/NotificationCard';
import NotificationTemplate from './../../../shared-components/notificationPanel/NotificationTemplate';
import {
	getNotifications,
	addNotification,
	dismissAll,
	dismissItem,
	selectNotifications
} from '../../../shared-components/notificationPanel/store/dataSlice';

const defaultValues = {
	id: '',
	dueDate: new Date(),
	file: '',
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
	const state = useSelector(({ notificationPanel }) => notificationPanel.state);
	const notifications = useSelector(selectNotifications);
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles(props);

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

	const { watch, handleSubmit, formState, reset, register, control, setValue } = useForm({
		mode: 'onChange',
		defaultValues
		// resolver: yupResolver(schema)
	});

	function createNotification(obj) {
		dispatch(addNotification(NotificationModel(obj)));
	}

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [day, month, year].join('-');
	}
	// const handleForm = data => console.log('I am data', data);
	const handleForm = async model => {
		const FormData = require('form-data');
		const data = new FormData();

		setTimeout(
			() => createNotification({ message: 'Great Job! this is awesome.', options: { variant: 'success' } }),
			4000
		);

		data.append('due_date', formatDate(model.dueDate));
		data.append('block_id', props.blockId);
		model.file ? data.append('fpa_file', model.file[0]) : null;
		instance
			.post('/api/bills/generate', data)
			.then(function (response) {
				if (response.status === 201) {
					history.push('/billing/boards/1/electrcity-bills/billing');
				}
				console.log(JSON.stringify(response));
			})
			.catch(function (error) {
				alert('Error while generating');
			});

		// const config = {
		// 	method: 'post',
		// 	url: 'http://localhost:8000/api/bills/generate',
		// 	data:data
		// };

		// instance(config)

		// data.append('fpa_file', fs.createReadStream('/C:/Users/Admin/Downloads/fpa august -22 (4).xlsx'))

		console.log('model', model);
	};
	const dueDate = watch('deuDate');
	const startDate = watch('startDate');

	const { errors, isValid, dirtyFields } = formState;

	return (
		<form onSubmit={handleSubmit(handleForm)}>
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
							>
								<div className=" flex flex-wrap w-full justify-center py-32 px-16">
									<div className="flex -mx-4 " style={{ margin: '1.3rem' }}>
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
									<div className="flex items-center justify-center ">
										<div className="mb-8">
											<Typography variant="subtitle1" className="font-semibold mr-8 mx-4 mr-20">
												Add FPA File
											</Typography>
											<Typography
												variant="subtitle1"
												className="flex items-center justify-center text-xs font-semibold mr-8 mx-4"
											>
												(optional)
											</Typography>
										</div>
										<div>
											<input type="file" {...register('file')} />
										</div>
									</div>
								</div>
								<div className="px-16">
									<Button type="submit" variant="contained" color="secondary">
										Generate Bills
									</Button>
								</div>
							</Paper>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</form>
	);
}

export default withReducer('scrumboardApp', reducer)(GBData);
