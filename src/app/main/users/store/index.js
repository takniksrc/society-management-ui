import { combineReducers } from '@reduxjs/toolkit';
import newUsersSlice from './newUsersSlice';
import user from './userSlice';

const reducer = combineReducers({
	newUsersSlice,
	user
});

export default reducer;
