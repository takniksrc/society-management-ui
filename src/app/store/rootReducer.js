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
import customerSlice from '../main/customer/store/customerSlice';
import userSlice from '../main/users/store/userSlice';
import disconnectedmeterSlice from '../main/reports/store/disconnectedmeterSlice';

import billingBlocksSlice from 'app/main/billing/store/billingBlocksSlice';
import servicesSlice from 'app/main/services/store/servicesSlice';
import consumptionBoard from 'app/main/services/store/consumptionBoardSlice';

import AllBillsSlice from 'app/main/billing/store/AllBillsSlice';
import billingSlice from 'app/main/billing/store/billingSlice';
import billWithIdSlice from 'app/main/billing/store/billWithIdSlice';

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
		customerSlice,
		userSlice,
		disconnectedmeterSlice,
		billingBlocksSlice,
		servicesSlice,
		consumptionBoard,
		billingSlice,
		AllBillsSlice,
		billWithIdSlice,

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
