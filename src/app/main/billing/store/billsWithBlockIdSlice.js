import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from 'app/services/jwtService/jwtService';

export const getBlockBillsData = createAsyncThunk('contactsApp/user/getBlockBillsData', async blockId => {
	console.log('block Id', blockId);
	const response = await instance.get(`/api/bills/get-bills/${blockId}`);
	const data = await response.data.bills;
	console.log('I am data in getBlockBillsData', data);
	return data;
});

const billsWithBlockIdSlice = createSlice({
	name: 'billsWithBlockIdSlice',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getBlockBillsData.fulfilled]: (state, action) => action.payload
	}
});

export default billsWithBlockIdSlice.reducer;
