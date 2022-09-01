import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import newUsersSlice from '../main/users/store/newUsersSlice';
import newCustomersSlice from '../main/customer/store/newCustomersSlice';
import customerTypesSlice from '../main/customer/store/customerTypesSlice';
import i18n from './i18nSlice';
import customerReduces from '../main/customer/store/index';
import propertyTypesSlice from '../main/customer/store/propertyTypesSlice';
import propertySizesSlice from '../main/customer/store/propertySizesSlice';
import configSlice from '../fuse-configs/store/configSlice';

const createReducer = asyncReducers => (state, action) => {
	const combinedReducer = combineReducers({
		auth,
		fuse,
		i18n,
		configSlice,
		newUsersSlice,
		customerReduces,
		newCustomersSlice,
		customerTypesSlice,
		propertyTypesSlice,
		propertySizesSlice,
	
		...asyncReducers
	});

	/*
	Reset the redux store when user logged out
	 */
	if (action.type === 'auth/user/userLoggedOut') {
		state = undefined;
	}

	return combinedReducer(state, action);
};

export default createReducer;
