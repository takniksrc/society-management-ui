import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import newUsersSlice from './newUsersSlice';


const scrumboardAppReducers = combineReducers({
	boards,
	board,
	card,
	newUsersSlice
});

export default scrumboardAppReducers;
