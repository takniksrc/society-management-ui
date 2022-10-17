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
import societyChargesIcon from '../../../../assets/ServicesIcon/society-charges-icon.png';
import Aquifer from '../../../../assets/ServicesIcon/aquifer.png';
import Garbage from '../../../../assets/ServicesIcon/garbage.png';
import Cleanliness from '../../../../assets/ServicesIcon/cleanliness.png';
import Cabel from '../../../../assets/ServicesIcon/cabel.png';
import Security from '../../../../assets/ServicesIcon/security.png';
import Water from '../../../../assets/ServicesIcon/water.png';
import { getSocietyChargesServiceBoard } from '../store/societyChargesServiceSlice';

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

function SCData(props) {
	const dispatch = useDispatch();
	const boardsnew = useSelector(selectBoards);

	console.log('I am ReportsBoxesList', boardsnew);

	const classes = useStyles(props);

	useEffect(() => {
		dispatch(getBoards());
		return () => {
			//dispatch(resetBoards());
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
	// function handleOpen(id) {
	// 	dispatch(getSocietyChargesServiceBoard(id));
	// }
	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
					<Typography className="mt-44 sm:mt-88 text-32 sm:text-40 font-bold" color="inherit">
						Services
					</Typography>
				</motion.div>
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid  flex-wrap w-full justify-center py-32 px-16  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 "
				>
					{boardsnew?.map(board => (
						<motion.div variants={item} className="h-224 p-16" key={board.id}>
							<Paper
								to={`/services/boards/society-charges/${board.id}/${board.name}`}
								className={clsx(
									classes.board,
									'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
								)}
								role="button"
								component={Link}
								// onClick={event => handleOpen(ReportsTemplates.id)}
								>
								<Icon className="text-56" color="action">
									<img src={board.name} alt="" />
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

export default withReducer('scrumboardApp', reducer)(SCData);
