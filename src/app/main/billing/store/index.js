import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import newUsersSlice from './newUsersSlice';
import billingSlice from './billingSlice';
import billingBlocksSlice from './billingBlocksSlice';

const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	newUsersSlice,
	billingSlice,
	billingBlocksSlice
});

export default scrumboardAppReducers;
