import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';

export const submitLogin =
	({ email, password }) =>
	async dispatch => {
		return jwtService
			.signInWithEmailAndPassword(email, password)
			.then(res => {
				console.log('user', res);
				localStorage.setItem('user', JSON.stringify(res.user));
				dispatch(setUserData(res.user)).then(response => console.log('nww', response));

				dispatch(
					showMessage({
						message: res.message,
						autoHideDuration: 6000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'right'
						},
						variant: 'success'
					})
				);

				return dispatch(loginSuccess());
			})
			.catch(error => {
				console.log('I am error', error);
				return dispatch(
					showMessage({
						message: error.message,
						autoHideDuration: 6000,
						anchorOrigin: {
							vertical: 'top',
							horizontal: 'right'
						},
						variant: 'error'
					})
				);
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
