import { combineReducers } from '@reduxjs/toolkit';
import newCustomersSlice from './newCustomersSlice';
import customer from './customerSlice';

const reducer = combineReducers({
	newCustomersSlice,
	customer
});

export default reducer;
