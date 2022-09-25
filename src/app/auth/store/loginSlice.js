import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';
import { get } from 'lodash';
import { getConfigurations } from '../../fuse-configs/store/configSlice';

export const submitLogin =
	({ email, password }) =>
	async dispatch => {
		return jwtService
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				console.log('user', user);
				dispatch(setUserData(user));
				localStorage.setItem('user', JSON.stringify(user));
				// dispatch(getConfigurations());

				return dispatch(loginSuccess());
			})
			.catch(errors => {
				console.log('I am error');
				return dispatch(loginError(errors));
			});
	};

const initialState = {
	success: false,
	errors: []
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		loginError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
