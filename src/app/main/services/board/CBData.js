import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reducer from '../store';
import { selectBoards, newBoard, getConsumptionBoards, resetBoards } from '../store/boardsSlice';
import { getConsumbtionBoard } from '../store/consumptionBoardSlice';
import societyChargesIcon from '../../../../assets/ServicesIcon/society-charges-icon.png';
import consumptionChragesIcon from '../../../../assets/ServicesIcon/consumption-based-icon.png';

import FuseLoading from '@fuse/core/FuseLoading';

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

function CBData(props) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const boards = useSelector(selectBoards);

	console.log('I am cunsumbtion ReportsTemplates in CBDATA', boards);

	const classes = useStyles(props);

	useEffect(() => {
		dispatch(getConsumptionBoards()).then(() => setLoading(false));
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
	function handleOpen(id) {
		console.log('i am new id', id);
		//dispatch(getConsumbtionBoard(id));
	}
	if (loading) {
		return <FuseLoading />;
	}

	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-2 flex-wrap w-full justify-center py-32 px-16"
				>
					{boards.map(board => (
						<motion.div variants={item} className="h-224 p-16" key={board.id}>
							<Paper
								to={`/services/boards/consumption-based-charges/${board.id}/${board.name}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								component={Link}
								//onClick={event => handleOpen(ReportsTemplates.id)}
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

export default withReducer('scrumboardApp', reducer)(CBData);
