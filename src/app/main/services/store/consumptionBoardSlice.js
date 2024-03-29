/* eslint-disable prettier/prettier */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from 'app/services/jwtService/jwtService';
import FuseUtils from '@fuse/utils';
import history from '@history';
import _ from '@lodash';
import { showMessage } from 'app/store/fuse/messageSlice';
import CardModel from '../model/CardModel';
import ListModel from '../model/ListModel';
import reorder, { reorderQuoteMap } from './reorder';
import { newBoard } from './boardsSlice';

export const getConsumbtionBoard = createAsyncThunk(
	'scrumboardApp/ReportsTemplates/getConsumptionBoard',
	async (params, { dispatch }) => {
		const response = await instance.get(`/api/services/${params}`, { params });
		const data = await response.data.service;
		console.log('I am consuption', data);
		return data;
	}
);

export const updateConsumbtionBoard = createAsyncThunk(
	'scrumboardApp/ReportsTemplates/updateConsumbtionBoard',
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

		try {
			const response = await instance.post(`/api/services/${consumbtionBoardData.id}/consumptionBased`, {
				...body
			});
			console.log('response', response);
			const data = await response.data;

			if (response.status === 201) {
				dispatch(
					showMessage({
						message: response.data.message, //text or html
						autoHideDuration: 6000, //ms
						anchorOrigin: {
							vertical: 'top', //top bottom
							horizontal: 'right' //left center right
						},
						variant: 'success' //success error info warning null
					})
				);
				dispatch(getConsumbtionBoard(consumbtionBoardData.id));

				return data;
			}
		} catch (error) {
			console.log('error:', error.response);

			if (error.response.status === 400) {
				// alert('Alert 400');
				console.log(JSON.parse(error.response.data.error), 'errorParsed');
				JSON.parse(error.response.data.error).map(err => {
					console.log('err', err);
					return dispatch(
						showMessage({
							message: err, //text or html
							autoHideDuration: 6000, //ms
							anchorOrigin: {
								vertical: 'top', //top bottom
								horizontal: 'right' //left center right
							},
							variant: 'error' //success error info warning null
						})
					);
				});
			} else if (error.response.status !== 400) {
				dispatch(
					showMessage({
						message: error.response.data.message, //text or html
						autoHideDuration: 6000, //ms
						anchorOrigin: {
							vertical: 'top', //top bottom
							horizontal: 'right' //left center right
						},
						variant: 'error' //success error info warning null
					})
				);
			}

			// return error.response.data;
		}
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
