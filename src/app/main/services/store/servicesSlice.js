import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';

export const getServices = createAsyncThunk('getServices', async (params, { dispatch }) => {
	const response = await instance.get(`/api/services/${params}`, { params });
	const data = await response.data.service;
	console.log('I am boardSliceData', data);
	return data;
});

export const updateServices = createAsyncThunk('updateServices', async (boardData, { dispatch, getState }) => {
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
});

const servicesSlice = createSlice({
	name: 'servicesSlice',
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
		[getServices.fulfilled]: (state, action) => action.payload,
		[updateServices.fulfilled]: (state, action) => action.payload
	}
});
export default servicesSlice.reducer;
