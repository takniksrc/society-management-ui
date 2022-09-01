import { combineReducers } from '@reduxjs/toolkit';
import newCustomersSlice from './newCustomersSlice';
import customer from './customerSlice';
import customerTypesSlice from './customerTypesSlice';

const reducer = combineReducers({
	newCustomersSlice,
	customer,
	customerTypesSlice
});

export default reducer;
