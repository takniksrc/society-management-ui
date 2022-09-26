import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from 'axiosinstance';
import FuseUtils from '@fuse/utils';
import history from '@history';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import CardModel from '../model/CardModel';
import ListModel from '../model/ListModel';
import reorder, { reorderQuoteMap } from './reorder';
import { newBoard } from './boardsSlice';

export const getBoard = createAsyncThunk('scrumboardApp/board/getBoard', async (params, { dispatch }) => {
	const response = await instance.get(`/api/services/${params}`, { params });
	const data = await response.data.service;
	console.log('I am boardSliceData', data);
	return data;
});

export const saveBoard = createAsyncThunk(
	'scrumboardApp/board/saveBoard',
	async (boardData, { dispatch, getState }) => {
		const { product } = getState();
		console.log('I am product in save Product', boardData);
		const newData = {
			service_id: boardData.id,
			name: boardData.name,
			description: boardData.description,
			service_prices: boardData.servicePricing
		};

		const response = await instance.post(`/api/services/${boardData.id}/propertySizeBased`, { ...newData });
		const data = await response.data;
		return newData;
	}
);

const boardsSlice = createSlice({
	name: 'scrumboardApp/boards',
	initialState: null,
	reducers: {
		resetBoard: (state, action) => null,
		addLabel: (state, action) => {
			state.labels = [...state.labels, action.payload];
		},
		newBoardAllValue: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: '',
					description: '',
					Residential_Flat_One_Size: '',
					Residential_Plot_10_Marla: ''
				}
			})
		}
	},
	extraReducers: {
		[getBoard.fulfilled]: (state, action) => action.payload,
		[saveBoard.fulfilled]: (state, action) => action.payload
	}
});

export const { resetBoard, newBoardAllValue, addLabel } = boardsSlice.actions;
export default boardsSlice.reducer;
