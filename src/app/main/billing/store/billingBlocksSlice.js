import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';

export const getBlocksStatus = createAsyncThunk('contactsApp/user/BillingBlocksSlice', async sectorId => {
	console.log('sectorId', sectorId);
	const response = await instance.get(`/api/sectors/${sectorId}/blocks/get-block-status`);
	console.log('data in getBlocksStatus', response.data);
	return response.data.blocks;
});

const billingBlocksSlice = createSlice({
	name: 'billingBlocksSlice',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getBlocksStatus.fulfilled]: (state, action) => action.payload
	}
});

export default billingBlocksSlice.reducer;
