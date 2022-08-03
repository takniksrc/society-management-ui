import { combineReducers } from '@reduxjs/toolkit';
import newUserSlice from './newUsersSlice';
import user from './userSlice';

const reducer = combineReducers({
	newUserSlice,
	user
});

export default reducer;
