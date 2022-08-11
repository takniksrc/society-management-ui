import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';

export const getUsers = createAsyncThunk('users/getUsers', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().contactsApp.contacts.routeParams;
	const response = await axios.get('/api/api/users', {
		params: routeParams
	});
	const data = await response.data;
     console.log('i am dat in ',data)
	return { data, routeParams };
});

export const addUser = createAsyncThunk(
	'users/addUser',
	async (contact, { dispatch, getState }) => {
		const response = await axios.post('/api/api/users', { contact });
		const data = await response.data;
        console.log('I am new updated data',data)
		dispatch(getUsers());

		return data;
	}
);
export const updateUser = createAsyncThunk(
	'users/updateUser',
	async (user, { dispatch, getState }) => {
		const response = await axios.post('/api/api/users/{user}', { user });
	// const response = await axios.post(`/api/users/${user}`);
		const data = await response.data;

		dispatch(getUsers());

		return data;
	}
);

export const removeUser = createAsyncThunk(
	'users/removeUser',
	async (userId, { dispatch, getState }) => {
		console.log('i am clicked')
		await axios.post('/api/api/users/{user}', { userId });

		return userId;
	}
);

export const removeUsers = createAsyncThunk(
	'users/removeUsers',
	async (contactIds, { dispatch, getState }) => {
		await axios.post('/api/api/users/{user}', { contactIds });

		return contactIds;
	}
);

export const toggleStarredContact = createAsyncThunk(
	'users/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'users/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'users/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'users/setContactsUnstarred',
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
	name: 'users',
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
		[updateUser.fulfilled]: contactsAdapter.upsertOne,
		[addUser.fulfilled]: contactsAdapter.addOne,
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
