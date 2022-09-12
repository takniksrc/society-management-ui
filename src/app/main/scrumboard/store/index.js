import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import disconnectedmeterSlice from './disconnectedmeterSlice';
import downloadFileBoard from './downloadFileBoard';

const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	disconnectedmeterSlice,
	downloadFileBoard
});

export default scrumboardAppReducers;
