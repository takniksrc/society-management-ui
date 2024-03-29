/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';
import { getCustomerData } from './customerSlice';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getCustomers = createAsyncThunk('customers/getCustomers', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().newCustomersSlice.routeParams;
	const response = await instance.get('/api/customers', {
		params: routeParams
	});
	const data = await response.data.customers;
	console.log('i am dat in ', data);
	return { data, routeParams };
});

export const addCustomer = createAsyncThunk('customers/addCustomer', async (contact, { dispatch, getState }) => {
	try {
		const response = await instance.post('/api/customers', {
			refference_number: contact.reference_number,
			name: contact.name,
			cnic: contact.cnic,
			phone_number: contact.phone_number,
			current_reading: contact.current_reading,
			email: contact.email,
			customer_type_id: contact.customer_type,
			property_type_id: contact.property_type,
			property_size_id: contact.property_size,
			meter_number: contact.meter_number,
			meter_type: contact.meter_type,
			meter_status: contact.meter_status,
			phase: contact.meter_phase,
			company: contact.company,
			sector_id: contact.sector,
			block_id: contact.block,
			street_address: contact.street_address
		});
		const data = await response.data;
		console.log('I am new updated data', data);

		if (response.status === 201 || response.status === 200) {
			dispatch(
				showMessage({
					message: response.data.message, //text or html
					autoHideDuration: 6000, //ms
					anchorOrigin: {
						vertical: 'top', //top bottom
						horizontal: 'right' //left center right
					},
					variant: 'success' //success error info warning null
				})
			);
			dispatch(closeEditContactDialog());
		}

		dispatch(getCustomerData());
		return data;
	} catch (error) {
		console.log('error:', error.response);
		if (error.response.status !== 400) {
			dispatch(
				showMessage({
					message: error.response.data.message, //text or html
					autoHideDuration: 6000, //ms
					anchorOrigin: {
						vertical: 'top', //top bottom
						horizontal: 'right' //left center right
					},
					variant: 'error' //success error info warning null
				})
			);
		} else {
			if (error.response.status === 400) {
				// alert('Alert 400');
				console.log(JSON.parse(error.response.data.error), 'errorParsed');
				JSON.parse(error.response.data.error).map(err => {
					console.log('err', err);
					return dispatch(
						showMessage({
							message: err, //text or html
							autoHideDuration: 6000, //ms
							anchorOrigin: {
								vertical: 'top', //top bottom
								horizontal: 'right' //left center right
							},
							variant: 'error' //success error info warning null
						})
					);
				});
			}

			dispatch(getCustomerData());
			return error.response.data;
		}
	}
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (contact, { dispatch, getState }) => {
	console.log('i am clicked', contact.id);
	try {
		const response = await instance.post(`/api/customers/${contact.id}`, {
			refference_number: contact.reference_number,
			name: contact.name,
			cnic: contact.cnic,
			phone_number: contact.phone_number,
			current_reading: contact.current_reading,
			email: contact.email,
			customer_type_id: contact.customer_type,
			property_type_id: contact.property_type,
			property_size_id: contact.property_size,
			meter_number: contact.meter_number,
			meter_type: contact.meter_type,
			meter_status: contact.meter_status,
			phase: contact.meter_phase,
			company: contact.company,
			sector_id: contact.sector,
			block_id: contact.block,
			street_address: contact.street_address
		});

		const data = await response.data;
		console.log(data);
		if (response.status === 201 || response.status === 200) {
			dispatch(
				showMessage({
					message: response.data.message, //text or html
					autoHideDuration: 6000, //ms
					anchorOrigin: {
						vertical: 'top', //top bottom
						horizontal: 'right' //left center right
					},
					variant: 'success' //success error info warning null
				})
			);

			dispatch(closeEditContactDialog());
		}
		dispatch(getCustomerData());
		return data;
	} 
	catch (error) {
		console.log('error:', error.response);
		if (error.response.status !== 400) {
			dispatch(
				showMessage({
					message: error.response.data.message, //text or html
					autoHideDuration: 6000, //ms
					anchorOrigin: {
						vertical: 'top', //top bottom
						horizontal: 'right' //left center right
					},
					variant: 'error' //success error info warning null
				})
			);
		} else if (error.response.status !== '400') {
			if (error.response.status === 400) {
				// alert('Alert 400');
				console.log(JSON.parse(error.response.data.error), 'errorParsed');
				JSON.parse(error.response.data.error).map(err => {
					console.log('err', err);
					return dispatch(
						showMessage({
							message: err, //text or html
							autoHideDuration: 6000, //ms
							anchorOrigin: {
								vertical: 'top', //top bottom
								horizontal: 'right' //left center right
							},
							variant: 'error' //success error info warning null
						})
					);
				});
			}
		}

		// dispatch(getCustomerData());
		return error.response.data;
	}
});

export const removeCustomer = createAsyncThunk(
	'customers/removeCustomer',
	async (customerId, { dispatch, getState }) => {
		console.log('i am clicked', customerId);
		try {
			const response = await instance.delete(`/api/customers/${customerId}`);
			if (response.status === 201 || response.status === 200) {
				dispatch(
					showMessage({
						message: response.data.message, //text or html
						autoHideDuration: 6000, //ms
						anchorOrigin: {
							vertical: 'top', //top bottom
							horizontal: 'right' //left center right
						},
						variant: 'success' //success error info warning null
					})
				);
			}

			dispatch(getCustomerData());
			return customerId;
		} catch (error) {
			if (error.response.status !== 400) {
				dispatch(
					showMessage({
						message: error.response.data.message, //text or html
						autoHideDuration: 6000, //ms
						anchorOrigin: {
							vertical: 'top', //top bottom
							horizontal: 'right' //left center right
						},
						variant: 'error' //success error info warning null
					})
				);
			} else if (error.response.status !== '400') {
				if (error.response.status === 400) {
					// alert('Alert 400');
					console.log(JSON.parse(error.response.data.error), 'errorParsed');
					JSON.parse(error.response.data.error).map(err => {
						console.log('err', err);
						return dispatch(
							showMessage({
								message: err, //text or html
								autoHideDuration: 6000, //ms
								anchorOrigin: {
									vertical: 'top', //top bottom
									horizontal: 'right' //left center right
								},
								variant: 'error' //success error info warning null
							})
						);
					});
				}
			}
			return customerId;
		}
	}
);

export const removeUsers = createAsyncThunk('customers/removeUsers', async (contactIds, { dispatch, getState }) => {
	await instance.post('/api/customers/{user}', { contactIds });

	return contactIds;
});

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectCustomers, selectById: selectcustomersById } = contactsAdapter.getSelectors(
	// console.log('I am contactsApp',contactsApp)
	// state => ('what we write here')
	state => state.newCustomersSlice
);

const newCustomersSlice = createSlice({
	name: 'customers',
	initialState: contactsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		newCustomersSlice: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewContactDialog: (state, action) => {
			state.newCustomersSlice = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewContactDialog: (state, action) => {
			state.newCustomersSlice = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditContactDialog: (state, action) => {
			state.newCustomersSlice = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditContactDialog: (state, action) => {
			state.newCustomersSlice = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateCustomer.fulfilled]: contactsAdapter.upsertOne,
		[addCustomer.fulfilled]: contactsAdapter.addOne,
		[removeUsers.fulfilled]: (state, action) => contactsAdapter.removeMany(state, action.payload),
		[removeCustomer.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
		[getCustomers.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			contactsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setContactsSearchText,
	openNewContactDialog,
	closeNewContactDialog,
	openEditContactDialog,
	closeEditContactDialog
} = newCustomersSlice.actions;

export default newCustomersSlice.reducer;
