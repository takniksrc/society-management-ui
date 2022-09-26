import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';

import consumptionBoard from './consumptionBoardSlice';
import societyChargesServiceSlice from './societyChargesServiceSlice';

const scrumboardAppReducers = combineReducers({
	boards,
	board,

	consumptionBoard,
	societyChargesServiceSlice
});

export default scrumboardAppReducers;
