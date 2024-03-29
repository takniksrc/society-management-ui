import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import BillsMultiSelectMenu from './BillsMultiSelectMenu';
import DailyAmountRecievedTable from './DailyAmountRecievedTable';
import { selectUsers } from '../../store/disconnectedmeterSlice';

function DailyAmountRecievedHead(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(selectUsers);
	const searchText = useSelector(({ disconnectedmeterSlice }) => disconnectedmeterSlice.searchText);
	console.log('I am contacts in meters', contacts);
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
				Header: 'Date',
				accessor: 'date',
				className: 'font-medium',
				sortable: true
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				className: 'font-medium',
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

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
				There are no Reports!
				</Typography>
			</div>
		);
	}

	return (
		<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
			<DailyAmountRecievedTable
				columns={columns}
				data={filteredData}
				// onRowClick={(ev, row) => {
				// 	if (row) {
				// 		dispatch(openEditContactDialog(row.original));
				// 	}
				// }}
			/>
		</motion.div>
	);
}

export default DailyAmountRecievedHead;
