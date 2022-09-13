import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'axiosinstance';

export const getBills = createAsyncThunk('contactsApp/user/BillingBlocksSlice', async sectorId => {
	console.log('sectorId', sectorId);
	const response = await instance.get(`/api/bills/get-bills/${sectorId}`);
	const data = await response.data.bills;
	console.log('data in getBills', data);
	return data;
});

const getBillsSlice = createSlice({
	name: 'BillingBlocksSlice',
	initialState: [],
	reducers: {},
	extraReducers: {
		[getBills.fulfilled]: (state, action) => action.payload
	}
});

export default getBillsSlice.reducer;
