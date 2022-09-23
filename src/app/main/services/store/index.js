import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import consumptionBoard from './consumptionBoardSlice';
import societyChargesServiceSlice from './societyChargesServiceSlice';

const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	consumptionBoard,
	societyChargesServiceSlice
});

export default scrumboardAppReducers;
