import { combineReducers } from '@reduxjs/toolkit';
import boards from './boardsSlice';

import consumptionBoard from './consumptionBoardSlice';
import societyChargesServiceSlice from './societyChargesServiceSlice';

const scrumboardAppReducers = combineReducers({
	boards,
	societyChargesServiceSlice
});

export default scrumboardAppReducers;
