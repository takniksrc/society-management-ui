import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reducer from '../store';
import { selectBoards, newBoard, getBoards, resetBoards, getConsumptionBoards } from '../store/boardsSlice';
import societyChargesIcon from '../../../../assets/ServicesIcon/society-charges-icon.png';
import consumptionChragesIcon from '../../../../assets/ServicesIcon/consumption-based-icon.png';

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

function Boards(props) {
	const dispatch = useDispatch();
	// const boards = useSelector(selectBoards);
	const boards = [
		{ id: '1', name: 'Consumption Based Chrages', uri: 'consumption-based-charges', icon: consumptionChragesIcon }
	];
	const boards2 = [{ id: '2', name: 'Society Charges', uri: 'society-charges', icon: societyChargesIcon }];
	console.log('I am boards', boards);

	const classes = useStyles(props);

	useEffect(() => {
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

	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
					<Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-bold" color="inherit">
						Services
					</Typography>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-2 flex-wrap w-full justify-center py-32 px-16"
				>
					{boards.map(board => (
						<motion.div variants={item} className="h-224 p-16" key={board.id}>
							<Paper
								to={`/services/boards/${board.uri}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								component={Link}
								onClick={() => dispatch(getConsumptionBoards())}
							>
								<Icon className="text-56" color="action">
									<img src={board.icon} alt="" />
								</Icon>
								<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
									{board.name}
								</Typography>
							</Paper>
						</motion.div>
					))}
					{boards2.map(board => (
						<motion.div variants={item} className="h-224 p-16" key={board.id}>
							<Paper
								to={`/services/boards/${board.uri}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								component={Link}
								onClick={() => dispatch(getBoards())}
							>
								<Icon className="text-56" color="action">
									<img src={board.icon} alt="" />
								</Icon>
								<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
									{board.name}
								</Typography>
							</Paper>
						</motion.div>
					))}
				
				</motion.div>
			</div>
		</div>
	);
}

export default withReducer('scrumboardApp', reducer)(Boards);
