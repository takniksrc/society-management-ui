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

export const getConsumbtionBoard = createAsyncThunk(
	'scrumboardApp/board/getConsumptionBoard',
	async (params, { dispatch }) => {
		const response = await instance.get(`/api/services/${params}`, { params });
		const data = await response.data.service;
		console.log('I am consuption', data);
		return data;
	}
);

// export const saveProduct = createAsyncThunk(
//     'eCommerceApp/product/saveProduct',
//     async (productData, { dispatch, getState }) => {
//         const { product } = getState().eCommerceApp;

//         const response = await axios.post('/api/e-commerce-app/product/save', { ...product, ...productData });
//         const data = await response.data;

//         return data;
//     }
// );

export const updateConsumbtionBoard = createAsyncThunk(
	'scrumboardApp/board/updateConsumbtionBoard',
	async (consumbtionBoardData, { dispatch, getState }) => {
		console.log('consumbtionBoardData', consumbtionBoardData);
		let slabsToEdit = [];
		consumbtionBoardData.servicePricing.forEach((servicePrice, servicePriceIndex) => {
			console.log('servicePrice', servicePrice);
			console.log('customerType', servicePrice.customer_type);

			if (servicePrice.customer_type.name === consumbtionBoardData.tabValue) {
				slabsToEdit = consumbtionBoardData.servicePricing[servicePriceIndex].slabs;
			}
		});

		const body = {
			service_id: consumbtionBoardData.id,
			name: consumbtionBoardData.name,
			description: consumbtionBoardData.description,
			price_slabs: slabsToEdit
		};
		console.log('tabValue', consumbtionBoardData.tabValue);
		console.log('consumbtionBoardData', consumbtionBoardData);

		const response = await instance.post(`/api/services/${consumbtionBoardData.id}/consumptionBased`, { ...body });
		const data = await response.data;
		dispatch(getConsumbtionBoard(consumbtionBoardData.id));
		return data;
	}
);

const consumptionBoardSlice = createSlice({
	name: 'scrumboardApp/consumptionBoard',
	initialState: null,
	reducers: {
		resetBoard: (state, action) => null,
		addLabel: (state, action) => {
			state.labels = [...state.labels, action.payload];
		}
	},
	extraReducers: {
		[getConsumbtionBoard.fulfilled]: (state, action) => action.payload,
		[updateConsumbtionBoard.fulfilled]: (state, action) => action.payload
	}
});

export const { resetBoard, newBoardAllValue, addLabel } = consumptionBoardSlice.actions;
export default consumptionBoardSlice.reducer;
