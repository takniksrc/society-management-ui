import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getBlocksStatus = createAsyncThunk('contactsApp/user/BillingBlocksSlice', async sectorId => {
	console.log('sectorId', sectorId);
	const response = await instance.get(`/api/sectors/${sectorId}/blocks/get-block-status`);
	const data = await response.data.blocks;
	console.log('data in getBlocksStatus', data);
	return data;
});

const billingBlocksSlice = createSlice({
	name: 'BillingBlocksSlice',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getBlocksStatus.fulfilled]: (state, action) => action.payload
	}
});

export default billingBlocksSlice.reducer;
