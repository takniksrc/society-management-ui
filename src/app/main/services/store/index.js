import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import consumptionBoard from './consumptionBoardSlice';

const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	consumptionBoard,
});

export default scrumboardAppReducers;
