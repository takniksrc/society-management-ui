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

import {
	// eslint-disable-next-line import/named
	removeCustomer,
	openEditContactDialog
} from './store/newCustomersSlice';
import { getCustomerData } from './store/customerSlice';

function AllCustomersHead(props) {
	const dispatch = useDispatch();

	const customersResponse = useSelector(state => state.customerSlice);
	const customersFromServer = customersResponse?.customers;

	const customers = useMemo(
		() =>
			customersFromServer?.map(newCustomer => {
				console.log('newCustomer', newCustomer);
				return {
					id: newCustomer?.id,
					name: newCustomer?.name,
					property_size: newCustomer?.property_size?.name,
					property_size_id: newCustomer?.property_size?.id,

					property_type: newCustomer?.property_type?.name,
					property_type_id: newCustomer?.property_type?.id,

					meter_number: newCustomer?.meter?.meter_number,
					meter_type: newCustomer?.meter?.meter_type,
					reference_number: newCustomer?.meter?.refference_number,
					cnic: newCustomer?.cnic,
					phone_number: newCustomer?.phone_number,
					email: newCustomer?.email,
					customer_type: newCustomer?.customer_type,
					meter_status: newCustomer?.meter?.meter_status,
					meter_phase: newCustomer?.meter?.phase,
					meter_company: newCustomer?.meter?.company,
					company: 'sms',
					sector: newCustomer?.address?.sector_id,
					block: newCustomer?.address?.block_id,
					street_address: newCustomer?.address?.street_address
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
				Header: 'Property Size ID',
				accessor: 'property_size_id',
				sortable: true
			},
			{
				Header: 'property Type',
				accessor: 'property_type',
				sortable: true
			},
			{
				Header: 'property Type ID',
				accessor: 'property_type_id',
				sortable: true
			},
			{
				Header: 'Meter No',
				accessor: 'meter_number',
				sortable: true
			},
			{
				Header: 'Meter Type',
				accessor: 'meter_type',
				sortable: true
			},
			{
				Header: 'Meter Company',
				accessor: 'meter_company',
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
						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								console.log('i am ev', row.original.id);
								dispatch(removeCustomer(row.original.id));
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
