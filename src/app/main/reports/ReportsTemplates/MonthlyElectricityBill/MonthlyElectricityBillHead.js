import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

// import BillsMultiSelectMenu from './BillsMultiSelectMenu';
import MonthlyElectricityBillTable from './MonthlyElectricityBillTable';
import { selectUsers } from '../../store/disconnectedmeterSlice';
import { getDownloadFile } from '../../store/downloadFileBoard';

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

function MonthlyElectricityBillHead(props) {
	const dispatch = useDispatch();
	// const contacts = useSelector(selectUsers);
	const classes = useStyles(props);
	// const searchText = useSelector(({ disconnectedmeterSlice }) => disconnectedmeterSlice.searchText);
	// console.log('I am contacts in download', contacts);
	// console.log('I am search text', searchText);
	// const user = useSelector(({ newUsersSlice }) => newUsersSlice.user);
	// console.log('I am user se', user);
	const monthlyReportDownload = [
		{ id: '32gfhaf1', name: 'Download File', url: 'monthly_electricity_bill', icon: 'get_app' }
	];

	// const [filteredData, setFilteredData] = useState(null);
	// console.log('I am filtered', filteredData);

	function handleDownload(url) {
		dispatch(getDownloadFile(url));
	}
	// 	instance({
	// 		url: '/api/reports/monthly_electricity_bill',
	// 		method: 'GET',
	// 		responseType: 'blob'
	// 	})
	// 		.then(response => {
	// 			console.log('I am response in download hh', response);
	// 			const url = window.URL.createObjectURL(new Blob([response?.data]));
	// 			const link = document.createElement('a');
	// 			link.href = url;
	// 			link?.setAttribute('download', 'Fabric Excel Format.xlsx');
	// 			document.body?.appendChild(link);
	// 			link.click();
	// 		})
	// 		.catch(err => console.log('I am errror', err));
	// }
	// }
	// 	}
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
		<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="flex flex-wrap w-full justify-center py-32 px-16"
			>
				{monthlyReportDownload.map(board => (
					<motion.div variants={item} className="w-224 h-224 p-16" key={board.id}>
						<Paper
							// to={`/analysisreport/ReportsBoxesList/${ReportsTemplates.url}`}
							className={clsx(
								classes.board,
								'flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg'
							)}
							role="button"
							component={Link}
							onClick={event => handleDownload(board.url)}
						>
							<Icon className="text-56" color="action">
								get_app
							</Icon>
							<Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
								{board.name}
							</Typography>
						</Paper>
					</motion.div>
				))}
			</motion.div>

			{/* <ArrearsListTable
				columns={columns}
				data={filteredData}
				// onRowClick={(ev, row) => {
				// 	if (row) {
				// 		dispatch(openEditContactDialog(row.original));
				// 	}
				// }}
			/> */}
		</motion.div>
	);
}

export default MonthlyElectricityBillHead;
