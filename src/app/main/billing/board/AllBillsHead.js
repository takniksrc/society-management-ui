import { motion } from 'framer-motion';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import AllBills from './AllBills';
import { openEditContactDialog, removeUser, toggleStarredContact, selectUsers } from '../store/newUsersSlice';
import BillsBellowSection from './BillsBellowSection';

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
function AllBillsHead(props) {
	const contacts = useSelector(selectUsers);
	const searchText = useSelector(({ newUsersSlice }) => newUsersSlice.searchText);
	console.log('i am contacts in all',contacts)
	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};
	const classes = useStyles(props);
	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
            <div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 flex-wrap w-full justify-center pt-16 "
				>
					<motion.div variants={item} className="h-auto p-16" key={1}>
					<Paper
							className={clsx(
								classes.board,
								'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
							)}
							role="button"
							component={Link}
						>
							487 Bills Generated
						</Paper>
					</motion.div>
				</motion.div>
			</div>
			</div>
			<BillsBellowSection />
		</motion.div>
	);
}

export default AllBillsHead;
