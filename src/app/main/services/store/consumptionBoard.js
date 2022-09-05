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

export const getBoard = createAsyncThunk('scrumboardApp/board/getBoard', async (params, { dispatch }) => {
	const response = await instance.get(`/api/services/${params}`, { params });
	const data = await response.data.service;
	console.log('I am consuption', data);
	const formValues = {
		id: data.id,
		description: data.description,
		name: data.name,
		ResidentialStartUpper: '',
		ResidentialEndUpper: '0',
		ResidentialPriceUpper: '0',
		ResidentialStartMiddle: ''
	};

	data.servicePricing.map((sp, i) => {
		sp.slabs.map(slab => {
			console.log('sp slab start', sp.customer_type.name + slab.slab_start);
			console.log('sp slab start', sp.customer_type.name + slab.slab_end);

		});
	});

	// data.servicePricing.map((sp, i) => {
	// 	//looping over customer type

	// 	if (sp.customer_type.name === 'Residential') {
	// 		console.log('sp.customer_type.name', sp.customer_type.name);
	// 		console.log('sp.servicePricing', data.servicePricing[i]?.slabs[i]?.slab_start);

	// 		if (data.servicePricing[i]?.slabs[i]?.slab_start === 1) {
	// 			formValues.ResidentialStartUpper = data.servicePricing[i]?.slabs[i]?.slab_start;
	// 		}
	// 		return true;
	// 	}
	// 	return true;
	// });
	console.log('formValues', formValues);
	return formValues;
});

export const saveBoard = createAsyncThunk(
	'scrumboardApp/board/saveBoard',
	async (boardData, { dispatch, getState }) => {
		const { product } = getState();
		console.log('I am product in save Product', product);

		const response = await axios.post('/api/e-commerce-app/product/save', { ...product, ...boardData });
		const data = await response.data;

		return data;
	}
);

const consumptionBoard = createSlice({
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
					description: ''
				}
			})
		}
	},
	extraReducers: {
		[getBoard.fulfilled]: (state, action) => action.payload,
		[saveBoard.fulfilled]: (state, action) => action.payload
	}
});

export const { resetBoard, newBoardAllValue, addLabel } = consumptionBoard.actions;
export default consumptionBoard.reducer;
