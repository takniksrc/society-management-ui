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
import { selectBoards, newBoard, getBoards, resetBoards } from '../store/boardsSlice';
import MonthlyIcon from '../../../../assets/ReportsIcon/monthly-report-icon.png';
import DisconnectIcon from '../../../../assets/ReportsIcon/wpf_disconnected.png';
import PermanentDisconnectIcon from '../../../../assets/ReportsIcon/mdi_pipe-disconnected.png';
import ReConnectionIcon from '../../../../assets/ReportsIcon/icon-park-solid_connection-point.png';
import RaiseAndFallIcon from '../../../../assets/ReportsIcon/entypo_bar-graph.png';
import DailyAmountIcon from '../../../../assets/ReportsIcon/pixelarticons_reciept.png';
import ArrearListIcon from '../../../../assets/ReportsIcon/icon-park_table-report.png';
import NewMetersIcon from '../../../../assets/ReportsIcon/ic_baseline-gas-meter.png';
import MeterChangeIcon from '../../../../assets/ReportsIcon/ic_baseline-electric-meter.png';
import FaultyMeterIcon from '../../../../assets/ReportsIcon/ic_baseline-gas-meter-fault.png';

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
	{id: '32gfhaf1', name: 'Monthly Electricity Bill', uri: 'acme-frontend-application',icon: MonthlyIcon},
	{id: '32gfhaf2', name: 'Disconnected Order', uri: 'acme-frontend-application',icon: DisconnectIcon},
	{id: '32gfhaf3', name: 'Permanent Disconnection Order', uri: 'acme-frontend-application',icon: PermanentDisconnectIcon},
	{id: '32gfhaf4', name: 'Re-Connection', uri: 'acme-frontend-application',icon: ReConnectionIcon},
	{id: '32gfhaf5', name: 'Rise and Fall of Units', uri: 'acme-frontend-application',icon: RaiseAndFallIcon},
	{id: '32gfhaf6', name: 'Daily Amount Recieved', uri: 'acme-frontend-application',icon: DailyAmountIcon},
	{id: '32gfhaf7', name: 'Arrear List with Proper Age', uri: 'acme-frontend-application',icon: ArrearListIcon},
	{id: '32gfhaf8', name: 'New Meters added (Month wise)', uri: 'acme-frontend-application',icon: NewMetersIcon},
	{id: '32gfhaf9', name: 'Meter Change Order (Month wise)', uri: 'acme-frontend-application',icon: MeterChangeIcon},
	{id: '32gfhaf10', name: 'Faulty Meter Report', uri: 'acme-frontend-application',icon: FaultyMeterIcon}
]
	console.log('I am boards',boards)

	const classes = useStyles(props);

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

	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
					<Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-bold" color="inherit">
						Analysis Report
					</Typography>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="flex flex-wrap w-full justify-center py-32 px-16"
				>
					{boards.map(board => (
						<motion.div variants={item} className="w-224 h-224 p-16" key={board.id}>
							<Paper
								to={`/scrumboard/boards/${board.id}/${board.uri}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								component={Link}
							>
								<Icon className="text-56" color="action">
								    <img src={board.icon} />
								</Icon>
								<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
									{board.name}
								</Typography>
							</Paper>
						</motion.div>
					))}
					{/* <motion.div variants={item} className="w-224 h-224 p-16">
						<Paper
							className={clsx(
								classes.board,
								classes.newBoard,
								'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg outline-none'
							)}
							onClick={() => dispatch(newBoard())}
							onKeyDown={() => dispatch(newBoard())}
							role="button"
							tabIndex={0}
						>
							<Icon className="text-56" color="secondary">
								add_circle
							</Icon>
							<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
								Add new board
							</Typography>
						</Paper>
					</motion.div> */}
				</motion.div>
			</div>
		</div>
	);
}

export default withReducer('scrumboardApp', reducer)(Boards);
