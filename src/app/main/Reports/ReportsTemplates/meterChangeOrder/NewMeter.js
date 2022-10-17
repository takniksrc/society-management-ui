import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import BillsMultiSelectMenu from './BillsMultiSelectMenu';
import { APP_URL } from 'app/fuse-configs/constants';
import AllUsers from './AllUsers';
import { selectUsers } from '../../store/disconnectedmeterSlice';

function NewMeter(props) {
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
				Header: 'Refference Number',
				accessor: 'refference_number',
				className: 'font-medium',
				sortable: true
			},
			{
				Header: 'Address',
				accessor: 'street_address',
				className: 'font-medium',
				sortable: true
			},
			{
				Header: 'Meter No',
				accessor: 'meter_number',
				sortable: true
			},
			{
				Header: 'Phase',
				accessor: 'phase',
				sortable: true
			},
			{
				Header: 'Current Reading',
				accessor: 'reading_value',
				sortable: true
			},
			{
				Header: 'Meter Picture',
				accessor: 'meter_snapshot',
				Cell: ({ row }) => {
					const image = `${APP_URL}/${row?.original?.meter_snapshot}`;
					console.log('I am row', `http://localhost:8000/${row?.original?.meter_snapshot}`);
					if (row.original.meter_snapshot === null) {
						return <Typography className='text-red-800'>No Image Found</Typography>;
					}
					return (
						<>
							<img
								// className="mx-8"
								style={{ height: '8rem' }}
								alt="meter_image"
								src={image}
								width="200"
								height="8rem"
							/>
						</>
					);
				},
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
			<AllUsers
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

export default NewMeter;
