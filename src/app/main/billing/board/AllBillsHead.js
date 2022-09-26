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
import { openEditContactDialog, removeUser, selectUsers } from '../store/newUsersSlice';
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
	const GetBills = useSelector(state => state.scrumboardApp.getBillsSlice);
	console.log('i am contacts in all', GetBills);
	const searchText = useSelector(({ newUsersSlice }) => newUsersSlice.searchText);

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
			<BillsBellowSection />
		</motion.div>
	);
}

export default AllBillsHead;
