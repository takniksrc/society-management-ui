import { combineReducers } from '@reduxjs/toolkit';
import newUsersSlice from './newUsersSlice';
import customer from './customerSlice';

const reducer = combineReducers({
	newUsersSlice,
	customer
});

export default reducer;
