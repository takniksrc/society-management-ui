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
import { getConfigurations } from '../../../fuse-configs/store/configSlice';
// import 'Closed' from '../../../../assets/ReportsIcon/monthly-report-status.png';

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
	const configurationsData = useSelector(({ configSlice }) => configSlice);
	console.log('configSlice inside billing Boards : ', configurationsData);
	// const boards = useSelector(selectBoards);
	const boards = [
		{ id: '1', name: 'TIP', uri: 'electricity-bills', status: 'Closed' },
		{ id: '2', name: 'A', uri: 'electricity-bills', status: 'Closed' },
		{ id: '3', name: 'B', uri: 'electricity-bills', status: 'Closed' },
		{ id: '4', name: 'C', uri: 'electricity-bills', status: 'OnGoing' },
		{ id: '5', name: 'D', uri: 'electricity-bills', status: 'Closed' },
		{ id: '6', name: 'E', uri: 'electricity-bills', status: 'Closed' },
		{ id: '7', name: 'F', uri: 'electricity-bills', status: 'Closed' },
		{ id: '8', name: 'G', uri: 'electricity-bills', status: 'Closed' },
		{ id: '9', name: 'H', uri: 'electricity-bills', status: 'Closed' }
	];
	console.log('I am boards', boards);

	const classes = useStyles(props);

	useEffect(() => {
		// dispatch(getBoards());
		dispatch(getConfigurations());

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
						Billing
					</Typography>
				</motion.div>

				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="flex flex-wrap w-full justify-center py-32 px-16"
				>
					{/* {boards.map(board => (
						<motion.div variants={item} className="p-16" key={board.id}>
							<Paper
								to={`/billing/boards/${board.id}/${board.uri}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								component={Link}
							>
								<Typography className="text-16 font-medium text-center pt-16 px-32 font-bold " color="inherit">
									{board.name}
								</Typography>
								<div className="flex mx-16 space-x-7">
									<Typography variant="subtitle1" className="py-16 font-semibold ">
										Status :
									</Typography>
									<Typography className="text-16 font-medium text-center pt-16" color="inherit">
										{board.status}
									</Typography>
								</div>
							</Paper>
						</motion.div>
					))} */}
					{configurationsData?.blocks?.map((board, index) => {
						return board.status === 'Closed' ? (
							<motion.div variants={item} className="p-16" key={board.id}>
								<Paper
									to={`/billing/boards/${board.id}/${board.uri}`}
									className={clsx(
										classes.board,
										'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
									)}
									role="button"
									component={Link}
								>
									<Typography
										className="text-16 font-medium text-center pt-16 px-32 font-bold "
										color="inherit"
									>
										{board.name}
									</Typography>
									<div className="flex mx-16 space-x-7">
										<Typography variant="subtitle1" className="py-16 font-semibold ">
											Status :
										</Typography>
										<Typography className="text-16 font-medium text-center pt-16" color="inherit">
											{board.status}
										</Typography>
									</div>
								</Paper>
							</motion.div>
						) : (
							<motion.div variants={item} className="p-16" key={board.id}>
								<Paper
									to={`/billing/boards/${board.id}/${board.uri}/billing`}
									className={clsx(
										classes.board,
										'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
									)}
									role="button"
									component={Link}
								>
									<Typography
										className="text-16 font-medium text-center pt-16 px-32 font-bold "
										color="inherit"
									>
										{board.name}
									</Typography>
									<div className="flex mx-16 space-x-7">
										<Typography variant="subtitle1" className="py-16 font-semibold ">
											Status :
										</Typography>
										<Typography className="text-16 font-medium text-center pt-16" color="inherit">
											{board.status}
										</Typography>
									</div>
								</Paper>
							</motion.div>
						);
					})}
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
