import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';


import { instance } from 'app/services/jwtService/jwtService';
import history from '@history';
import BoardModel from '../model/BoardModel';


export const getBoards = createAsyncThunk('scrumboardApp/ReportsBoxesList/getBoards', async () => {
	const response = await instance.get('/api/services/propertySizeBased/get-services');
	const data = await response.data.services;
	console.log('I am data',data)

	return data;
});
export const getConsumptionBoards = createAsyncThunk('scrumboardApp/ReportsBoxesList/getBoards', async () => {
	const response = await instance.get('/api/services/consumptionBased/get-services');
	const data = await response.data.services;
	console.log('I am data',data)

	return data;
});

export const newBoard = createAsyncThunk('scrumboardApp/ReportsBoxesList/newBoard', async (board, { dispatch }) => {
	const response = await instance.post('/api/scrumboard-app/board/new', { board: board || BoardModel() });
	const data = await response.data;

	history.push({
		pathname: `/billing/boards/${data.id}/${data.handle}`
	});

	return data;
});

const boardsAdapter = createEntityAdapter({});

export const { selectAll: selectBoards, selectById: selectBoardById } = boardsAdapter.getSelectors(
	state => state.scrumboardApp.boards
);

const boardsSlice = createSlice({
	name: 'scrumboardApp/boards',
	initialState: boardsAdapter.getInitialState({}),
	reducers: {
		resetBoards: (state, action) => {}
	},
	extraReducers: {
		[getBoards.fulfilled]: boardsAdapter.setAll
	}
});

export const { resetBoards } = boardsSlice.actions;

export default boardsSlice.reducer;
