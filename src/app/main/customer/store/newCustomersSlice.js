import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import instance from 'axiosinstance';
import { getCustomerData } from './customerSlice';

export const getCustomers = createAsyncThunk('customers/getCustomers', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().contactsApp.contacts.routeParams;
	const response = await instance.get('/api/customers', {
		params: routeParams
	});
	const data = await response.data.customers;
	console.log('i am dat in ', data);
	return { data, routeParams };
});

export const addCustomer = createAsyncThunk('customers/addCustomer', async (contact, { dispatch, getState }) => {
	const response = await instance.post('/api/customers', {
	"refference_number": contact.reference_number,
	"name":  contact.name,
	"cnic": contact.cnic,
	"phone_number": contact.phone,
	"email": contact.email,
	"customer_type_id": contact.customer_type,
	"property_type_id": contact.property_type,
	"property_size_id": contact.property_size,
	"meter_number":contact.meter_number,
	"meter_type":contact.meter_type,
	"meter_status": contact.meter_status,
	"phase": contact.meter_phase,
	"company": contact.company,
	"sector_id": contact.sector,
	"block_id": contact.block,
	"street_address": contact.address
});
	const data = await response.data;
	console.log('I am new updated data', data);
	dispatch(getCustomers());

	return data;
});
export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (user, { dispatch, getState }) => {
	const response = await instance.post('/api/customers/{user}', { user });
	// const response = await instance.post(`/api/customers/${user}`);
	const data = await response.data;

	dispatch(getCustomers());

	return data;
});

export const removeUser = createAsyncThunk('customers/removeUser', async (userId, { dispatch, getState }) => {
	console.log('i am clicked');
	await instance.post('/api/customers/{user}', { userId });

	return userId;
});

export const removeUsers = createAsyncThunk('customers/removeUsers', async (contactIds, { dispatch, getState }) => {
	await instance.post('/api/customers/{user}', { contactIds });

	return contactIds;
});

export const toggleStarredContact = createAsyncThunk(
	'customers/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getCustomerData());

		dispatch(getCustomers());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'customers/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getCustomerData());

		dispatch(getCustomers());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'customers/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getCustomerData());

		dispatch(getCustomers());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'customers/setContactsUnstarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
		const data = await response.data;

		dispatch(getCustomerData());

		dispatch(getCustomers());

		return data;
	}
);

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
		[removeUser.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
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
