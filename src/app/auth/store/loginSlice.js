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
				dispatch(setUserData(res.user));
				localStorage.setItem('user', JSON.stringify(res.user));
				dispatch(
					showMessage({
						message: res.message, //text or html
						autoHideDuration: 6000, //ms
						anchorOrigin: {
							vertical: 'top', //top bottom
							horizontal: 'right' //left center right
						},
						variant: 'success' //success error info warning null
					})
				);

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
