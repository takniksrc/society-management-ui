import { motion } from 'framer-motion';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import AllCustomers from './AllCustomers';

import { openEditContactDialog, removeUser, toggleStarredContact, selectCustomers } from './store/newCustomersSlice';

function AllCustomersHead(props) {
	const dispatch = useDispatch();
	// const customers = useSelector(selectCustomers);
	const customersFromServer = useSelector(selectCustomers);

	// {
	// 	"id": "a6911a4f-ec77-4384-9f3e-90bd05775681",
	// 	"refference_number": 1000000,
	// 	"name": "Customer 1",
	// 	"customer_type": {
	// 		"id": "c80da619-c1ad-4bcd-8c9e-9bf880658592",
	// 		"name": "Residential",
	// 		"created_at": "2022-09-01T11:16:37.000000Z",
	// 		"updated_at": "2022-09-01T11:16:37.000000Z"
	// 	},
	// 	"property_type": {
	// 		"id": "f49fcd1b-2d9c-4865-87c0-841b0ca5792c",
	// 		"name": "House",
	// 		"created_at": "2022-09-01T11:16:37.000000Z",
	// 		"updated_at": "2022-09-01T11:16:37.000000Z"
	// 	},
	// 	"property_size": {
	// 		"id": "b761a144-d166-4d0c-969c-d2d696148adc",
	// 		"name": "Residential House 7 Marla",
	// 		"created_at": "2022-09-01T11:16:37.000000Z",
	// 		"updated_at": "2022-09-01T11:16:37.000000Z"
	// 	},
	// 	"meter": {
	// 		"id": "525bc8fa-4fb7-4536-ac37-aee268c743a3",
	// 		"customer_name": "Customer 1",
	// 		"refference_number": 1000000,
	// 		"street_address": "A 1",
	// 		"meter_type": "Normal",
	// 		"meter_number": "2000000",
	// 		"meter_status": "Active",
	// 		"phase": "S/Phase",
	// 		"company": "Tranfopower",
	// 		"created_at": "2022-09-01T11:16:37.000000Z",
	// 		"updated_at": "2022-09-01T11:16:37.000000Z"
	// 	},
	// 	"created_at": "2022-09-01T11:16:37.000000Z",
	// 	"updated_at": "2022-09-01T11:16:37.000000Z"
	// }

	const customers = useMemo(
		() =>
			customersFromServer.map(newCustomer => {
				return {
					name: newCustomer?.name,
					property_size: newCustomer?.property_size.name,
					property_type: newCustomer?.property_type.name,
					meter_no: newCustomer?.meter.meter_number,
					meter_type: newCustomer?.meter.meter_type
				};
			}),
		[customersFromServer]
	);

	const searchText = useSelector(({ newCustomersSlice }) => newCustomersSlice.searchText);
	console.log('I am customers', customers);
	console.log('I am search text', searchText);
	// const user = useSelector(({ newCustomersSlice }) => newCustomersSlice.user);
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
				Header: 'Customer Name',
				accessor: 'name',
				className: 'font-medium',
				sortable: true
			},
			{
				Header: 'Property Size',
				accessor: 'property_size',
				sortable: true
			},
			{
				Header: 'property Type',
				accessor: 'property_type',
				sortable: true
			},
			{
				Header: 'Meter No',
				accessor: 'meter_no',
				sortable: true
			},
			{
				Header: 'Meter Type',
				accessor: 'meter_type',
				sortable: true
			},
			// {
			// 	Header: 'Billing Status',
			// 	accessor: 'billing_status',
			// 	sortable: true
			// },
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
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(removeUser(row.original.id));
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</div>
				)
			}
		],
		[dispatch]
	);
	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return customers;
			}
			return FuseUtils.filterArrayByString(customers, _searchText);
		}

		if (customers) {
			setFilteredData(getFilteredArray(customers, searchText));
		}
	}, [customers, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no customers!
				</Typography>
			</div>
		);
	}

	return (
		<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
			<AllCustomers
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditContactDialog(row.original));
					}
				}}
			/>
		</motion.div>
	);
}

export default AllCustomersHead;
