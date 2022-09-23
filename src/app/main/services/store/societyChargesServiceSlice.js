/* eslint-disable prettier/prettier */
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
import { removeCard, updateCard } from './cardSlice';

export const getSocietyChargesServiceBoard = createAsyncThunk(
	'scrumboardApp/board/getSocietyChargesServiceBoard',
	async (params, { dispatch }) => {
		const response = await instance.get(`/api/services/${params}`, { params });
		const data = await response.data.service;
		console.log('I am consuption', data);
		return data;
	}
);

export const updateSocietyChargesServiceBoard = createAsyncThunk(
	'scrumboardApp/board/updateSocietyChargesServiceBoard',
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
        dispatch(getSocietyChargesServiceBoard(boardData.id))
	}
);

const societyChargesServiceSlice = createSlice({
	name: 'scrumboardApp/societyChargesServiceSlice',
	initialState: null,
	reducers: {
		resetBoard: (state, action) => null,
		addLabel: (state, action) => {
			state.labels = [...state.labels, action.payload];
		}
	},
	extraReducers: {
		[getSocietyChargesServiceBoard.fulfilled]: (state, action) => action.payload,
		[updateSocietyChargesServiceBoard.fulfilled]: (state, action) => action.payload
	}
});

export const { resetBoard, newBoardAllValue, addLabel } = societyChargesServiceSlice.actions;
export default societyChargesServiceSlice.reducer;
