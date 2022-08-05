import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';

export const getUsers = createAsyncThunk('users/manageUsers/getUsers', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().contactsApp.contacts.routeParams;
	const response = await axios.get('/api/contacts-app/contacts', {
		params: routeParams
	});
	const data = await response.data;

	return { data, routeParams };
});

export const addContact = createAsyncThunk(
	'users/manageUsers/addContact',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/add-contact', { contact });
		const data = await response.data;

		dispatch(getUsers());

		return data;
	}
);

export const updateUsers = createAsyncThunk(
	'users/manageUsers/updateUsers',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/update-contact', { contact });
		const data = await response.data;

		dispatch(getUsers());

		return data;
	}
);

export const removeUser = createAsyncThunk(
	'users/manageUsers/removeUser',
	async (contactId, { dispatch, getState }) => {
		await axios.post('/api/contacts-app/remove-contact', { contactId });

		return contactId;
	}
);

export const removeUsers = createAsyncThunk(
	'users/manageUsers/removeUsers',
	async (contactIds, { dispatch, getState }) => {
		await axios.post('/api/contacts-app/remove-contacts', { contactIds });

		return contactIds;
	}
);

export const toggleStarredContact = createAsyncThunk(
	'users/manageUsers/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'users/manageUsers/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'users/manageUsers/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'users/manageUsers/setContactsUnstarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = contactsAdapter.getSelectors(
	// console.log('I am contactsApp',contactsApp)
	// state => ('what we write here')
	state => state.newUsersSlice
);

const newUsersSlice = createSlice({
	name: 'users/manageUsers',
	initialState: contactsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		newUsersSlice: {
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
			state.newUsersSlice = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewContactDialog: (state, action) => {
			state.newUsersSlice = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditContactDialog: (state, action) => {
			state.newUsersSlice = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditContactDialog: (state, action) => {
			state.newUsersSlice = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateUsers.fulfilled]: contactsAdapter.upsertOne,
		[addContact.fulfilled]: contactsAdapter.addOne,
		[removeUsers.fulfilled]: (state, action) => contactsAdapter.removeMany(state, action.payload),
		[removeUser.fulfilled]: (state, action) => contactsAdapter.removeOne(state, action.payload),
		[getUsers.fulfilled]: (state, action) => {
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
} = newUsersSlice.actions;

export default newUsersSlice.reducer;
