import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import instance from 'instance';
import { instance } from 'app/services/jwtService/jwtService';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { update } from 'lodash';

import { getUserData } from './userSlice';

export const getUsers = createAsyncThunk('users/getUsers', async (routeParams, { getState, dispatch }) => {
	routeParams = routeParams || getState().newUsersSlice.routeParams;
	const response = await instance.get('/api/users', {
		params: routeParams
	});
	const data = await response.data.users;
	console.log('I am data', data);

	return { data, routeParams };
});

export const addUser = createAsyncThunk('users/addUser', async (contact, { dispatch, getState }) => {
	console.log('contact before submit', contact);
	// eslint-disable-next-line prettier/prettier

	const response = await instance.post('/api/users', { email: contact.email, role: contact.role });
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
	} else {
		dispatch(
			showMessage({
				message: response.data.message, //text or html
				autoHideDuration: 6000, //ms
				anchorOrigin: {
					vertical: 'top', //top bottom
					horizontal: 'right' //left center right
				},
				variant: 'error' //success error info warning null
			})
		);
	}
	dispatch(getUsers());
	return data;
});
export const updateUser = createAsyncThunk('users/updateUser', async (user, { dispatch, getState }) => {
	// eslint-disable-next-line prettier/prettier

	const response = await instance.post(
		`/api/users/${user.id}`,
		// eslint-disable-next-line prettier/prettier
		{ email: user.email, role: user.role }
	);
	// const response = await instance.post(`/api/users/${user}`);

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
	} else {
		dispatch(
			showMessage({
				message: response.data.message, //text or html
				autoHideDuration: 6000, //ms
				anchorOrigin: {
					vertical: 'top', //top bottom
					horizontal: 'right' //left center right
				},
				variant: 'error' //success error info warning null
			})
		);
	}
	const data = await response.data;

	dispatch(getUsers());

	return data;
});

export const removeUser = createAsyncThunk('users/removeUser', async (userId, { dispatch, getState }) => {
	const response = await instance.delete(`/api/users/${userId}`);
	
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
	} else {
		dispatch(
			showMessage({
				message: response.data.message, //text or html
				autoHideDuration: 6000, //ms
				anchorOrigin: {
					vertical: 'top', //top bottom
					horizontal: 'right' //left center right
				},
				variant: 'error' //success error info warning null
			})
		);
	}

	return userId;
});

export const removeUsers = createAsyncThunk('users/removeUsers', async (contactIds, { dispatch, getState }) => {
	await instance.post('/api/users/{user}', { contactIds });

	return contactIds;
});

export const toggleStarredContact = createAsyncThunk(
	'users/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'users/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'users/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getUsers());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'users/setContactsUnstarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await instance.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
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
